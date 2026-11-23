import { useCallback, useEffect, useMemo, useState } from "react";

import type { ReactNode } from "react";

import { AuthContext, type AuthContextValue } from "../context/auth-context";

import type {
  AuthStatus,
  AuthUser,
  LoginCredentials,
  RegisterCredentials,
} from "../models/auth.types";

import {
  getAuthenticatedUser,
  loginUser,
  registerUser,
} from "../services/auth.api.service";

import {
  getHttpErrorMessage,
  isAbortError,
  isHttpError,
  setUnauthorizedHandler,
} from "../services/http.service";

import {
  readAccessToken,
  removeAccessToken,
  storeAccessToken,
} from "../services/session.service";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  // Recuperar el token almacenado al iniciar la aplicación.
  const [initialToken] = useState<string | null>(() => readAccessToken());

  const [accessToken, setAccessToken] = useState<string | null>(initialToken);

  const [user, setUser] = useState<AuthUser | null>(null);

  const [status, setStatus] = useState<AuthStatus>(
    initialToken ? "checking" : "anonymous",
  );

  const [sessionMessage, setSessionMessage] = useState("");

  // Finalizar la sesión y limpiar los datos de autenticación.
  const endSession = useCallback((message: string): void => {
    removeAccessToken();
    setAccessToken(null);
    setUser(null);
    setStatus("anonymous");
    setSessionMessage(message);
  }, []);

  // Registrar el manejador global de sesiones no autorizadas.
  useEffect(() => {
    return setUnauthorizedHandler(() => {
      endSession(
        "Tu sesión expiró o ya no es válida. Inicia sesión nuevamente.",
      );
    });
  }, [endSession]);

  // Validar el token contra la API.
  // No se actualiza el estado antes de iniciar la petición.
  const validateSession = useCallback(
    async (token: string, signal?: AbortSignal): Promise<void> => {
      try {
        const response = await getAuthenticatedUser(token, signal);

        // Evitar actualizar el estado si la petición fue cancelada.
        if (signal?.aborted) {
          return;
        }

        setUser(response.data.user);
        setAccessToken(token);
        setStatus("authenticated");
        setSessionMessage("");
      } catch (error) {
        if (signal?.aborted || isAbortError(error)) {
          return;
        }

        // El manejador global procesa las respuestas 401.
        if (isHttpError(error) && error.status === 401) {
          return;
        }

        setUser(null);
        setStatus("error");
        setSessionMessage(getHttpErrorMessage(error));
      }
    },
    [],
  );

  // Restaurar la sesión al montar el proveedor.

  useEffect(() => {
    if (!initialToken) {
      return;
    }

    const controller = new AbortController();

    getAuthenticatedUser(initialToken, controller.signal)
      .then((response) => {
        if (controller.signal.aborted) {
          return;
        }

        setUser(response.data.user);
        setAccessToken(initialToken);
        setStatus("authenticated");
        setSessionMessage("");
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted || isAbortError(error)) {
          return;
        }

        if (isHttpError(error) && error.status === 401) {
          return;
        }

        setUser(null);
        setStatus("error");
        setSessionMessage(getHttpErrorMessage(error));
      });

    return () => {
      controller.abort();
    };
  }, [initialToken]);

  // Iniciar sesión.
  const login = useCallback(
    async (credentials: LoginCredentials): Promise<AuthUser> => {
      const response = await loginUser(credentials);

      const nextToken = response.data.accessToken;

      storeAccessToken(nextToken);

      setAccessToken(nextToken);
      setUser(response.data.user);
      setStatus("authenticated");
      setSessionMessage("");

      return response.data.user;
    },
    [],
  );

  // Registrar un usuario.
  const register = useCallback(
    async (credentials: RegisterCredentials): Promise<AuthUser> => {
      const response = await registerUser(credentials);

      return response.data.user;
    },
    [],
  );

  // Cerrar sesión.
  const logout = useCallback((): void => {
    endSession("Cerraste sesión correctamente.");
  }, [endSession]);

  // Reintentar la validación de una sesión existente.
  const retrySession = useCallback(async (): Promise<void> => {
    if (!accessToken) {
      endSession("Inicia sesión para continuar.");
      return;
    }

    // Estas actualizaciones ocurren por una acción del usuario,
    // no durante la ejecución síncrona de useEffect.
    setStatus("checking");
    setSessionMessage("");

    await validateSession(accessToken);
  }, [accessToken, endSession, validateSession]);

  // Limpiar mensajes de sesión.
  const clearSessionMessage = useCallback((): void => {
    setSessionMessage("");
  }, []);

  // Compartir el estado y las acciones de autenticación.
  const value = useMemo<AuthContextValue>(
    () => ({
      status,
      user,
      accessToken,
      sessionMessage,
      login,
      register,
      logout,
      retrySession,
      clearSessionMessage,
    }),
    [
      status,
      user,
      accessToken,
      sessionMessage,
      login,
      register,
      logout,
      retrySession,
      clearSessionMessage,
    ],
  );

  return <AuthContext value={value}>{children}</AuthContext>;
}
