# Preguntas de cierre EC3 F3 A11

## 1. ¿Qué diferencia existe entre autenticación y autorización?
La autenticación verifica quién es el usuario, mientras que la autorización determina qué acciones puede realizar según sus permisos.

## 2. ¿Qué información guarda sessionStorage y qué información no debe guardar?
Guarda temporalmente el token de acceso durante la sesión de la pestaña. No debe almacenar contraseñas ni información sensible innecesaria.

## 3. ¿Por qué se consulta /api/auth/me al recargar?
Para comprobar que el token almacenado sigue siendo válido y recuperar los datos del usuario autenticado.

## 4. ¿Por qué el Frontend no debe confiar en decodificar un JWT sin verificarlo?
Porque decodificar un JWT no garantiza su autenticidad ni que siga vigente. El Backend debe verificar su firma y validez.

## 5. ¿Qué responsabilidad tiene AuthProvider?
Administrar el estado de autenticación, recuperar sesiones, iniciar y cerrar sesión, y compartir esta información con la aplicación.

## 6. ¿Qué beneficio ofrece useAuth?
Permite acceder fácilmente al estado y las funciones de autenticación desde distintos componentes sin repetir lógica.

## 7. ¿Qué representa el estado checking?
Indica que la aplicación está verificando si existe una sesión válida antes de permitir el acceso.

## 8. ¿Qué diferencia existe entre 401 y 403?
El código 401 indica que falta una autenticación válida; el 403 significa que el usuario no tiene permisos suficientes.

## 9. ¿Por qué ProtectedRoute no sustituye la seguridad del Backend?
Porque solo controla la navegación en el Frontend. El Backend debe validar cada petición y sus permisos.

## 10. ¿Por qué ocultar Eliminar a user no constituye autorización?
Porque ocultar un botón no impide enviar una petición directamente a la API. El Backend debe restringir esa operación.

## 11. ¿Por qué un cambio de rol exige iniciar sesión de nuevo?
Porque el JWT puede conservar el rol anterior. Iniciar sesión nuevamente permite obtener un token con los permisos actualizados.

## 12. ¿Qué ocurre realmente al seleccionar Cerrar sesión?
Se elimina el token almacenado y se limpia el estado de autenticación del Frontend. Esto no necesariamente invalida el JWT en el servidor.

## 13. ¿Qué riesgo conserva sessionStorage ante XSS?
Un script malicioso ejecutado en la aplicación podría acceder al token y utilizarlo para suplantar la sesión.

## 14. ¿Por qué las tareas todavía no pertenecen a un usuario específico?
Porque actualmente las tareas no están vinculadas mediante un identificador de propietario. La autenticación controla el acceso, pero no establece propiedad individual.

## 15. ¿Qué dificultad encontraste al integrar la sesión y cómo la resolviste?
Encontré errores de ESLint al actualizar estados dentro de `useEffect`. Los corregí separando la validación asíncrona de las actualizaciones síncronas y utilizando `AbortController` para cancelar peticiones.