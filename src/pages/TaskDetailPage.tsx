
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { useAuth } from "../hooks/useAuth";
import type { Task } from "../models/task.interface";
import {
  getHttpErrorMessage,
  isAbortError,
  isHttpError,
} from "../services/http.service";
import { deleteTask, getTaskById } from "../services/task.api.service";
import { formatTaskDate } from "../utils/date";
import { NotFoundPage } from "./NotFoundPage";

type DetailStatus = "loading" | "success" | "not-found" | "error";

interface DetailState {
  task: Task | null;
  status: DetailStatus;
  errorMessage: string;
}

function TaskDetailContent({
  taskId,
  accessToken,
  canDelete,
}: {
  taskId: string;
  accessToken: string;
  canDelete: boolean;
}) {
  const navigate = useNavigate();

  const [state, setState] = useState<DetailState>({
    task: null,
    status: "loading",
    errorMessage: "",
  });

  const [reloadKey, setReloadKey] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    // La petición se ejecuta de forma asíncrona.
    async function loadTask(): Promise<void> {
      try {
        const response = await getTaskById(
          taskId,
          accessToken,
          controller.signal,
        );

        if (controller.signal.aborted) return;

        setState({
          task: response.data,
          status: "success",
          errorMessage: "",
        });
      } catch (error) {
        if (controller.signal.aborted || isAbortError(error)) {
          return;
        }

        if (isHttpError(error) && error.status === 404) {
          setState({
            task: null,
            status: "not-found",
            errorMessage: "",
          });
          return;
        }

        setState({
          task: null,
          status: "error",
          errorMessage: getHttpErrorMessage(error),
        });
      }
    }

    void loadTask();

    return () => controller.abort();
  }, [taskId, accessToken, reloadKey]);

  async function handleDelete(): Promise<void> {
    if (!state.task || !canDelete) return;

    const shouldDelete = window.confirm(
      `¿Eliminar la tarea "${state.task.title}"?`,
    );

    if (!shouldDelete) return;

    setIsDeleting(true);

    try {
      await deleteTask(state.task.id, accessToken);
      navigate("/tasks", { replace: true });
    } catch (error) {
      setState((current) => ({
        ...current,
        status: "error",
        errorMessage: getHttpErrorMessage(error),
      }));
      setIsDeleting(false);
    }
  }

  const { task, status, errorMessage } = state;

  if (status === "loading") {
    return <p role="status">Consultando tarea...</p>;
  }

  if (status === "not-found") {
    return (
      <NotFoundPage
        title="Tarea no encontrada"
        message="La tarea no existe o fue eliminada."
      />
    );
  }

  if (status === "error" || !task) {
    return (
      <section className="panel" role="alert">
        <h2>No fue posible consultar la tarea</h2>
        <p>{errorMessage}</p>
        <button
          type="button"
          onClick={() => {
            setState({
              task: null,
              status: "loading",
              errorMessage: "",
            });
            setReloadKey((current) => current + 1);
          }}
        >
          Reintentar
        </button>
      </section>
    );
  }

  return (
    <article
      className="panel task-detail"
      aria-labelledby="task-detail-title"
    >
      <p className="section-heading__eyebrow">
        Detalle protegido
      </p>

      <h2 id="task-detail-title">{task.title}</h2>

      <dl className="task-detail__grid">
        <div>
          <dt>Identificador</dt>
          <dd>{task.id}</dd>
        </div>

        <div>
          <dt>Estado</dt>
          <dd>
            {task.status === "completed"
              ? "Completada"
              : "Pendiente"}
          </dd>
        </div>

        <div>
          <dt>Fecha de creación</dt>
          <dd>
            <time dateTime={task.createdAt}>
              {formatTaskDate(task.createdAt)}
            </time>
          </dd>
        </div>

        <div>
          <dt>Última actualización</dt>
          <dd>
            <time dateTime={task.updatedAt}>
              {formatTaskDate(task.updatedAt)}
            </time>
          </dd>
        </div>
      </dl>

      {!canDelete && (
        <p className="permission-note">
          La eliminación requiere el rol admin.
        </p>
      )}

      <div className="task-detail__actions">
        <Link
          className="button-link button-link--secondary"
          to="/tasks"
        >
          Volver a tareas
        </Link>

        {canDelete && (
          <button
            type="button"
            className="button-danger"
            disabled={isDeleting}
            onClick={() => void handleDelete()}
          >
            {isDeleting ? "Eliminando..." : "Eliminar tarea"}
          </button>
        )}
      </div>
    </article>
  );
}

export function TaskDetailPage() {
  const { taskId } = useParams<{ taskId: string }>();
  const { accessToken, user } = useAuth();

  if (!taskId) {
    return (
      <NotFoundPage
        title="Tarea no encontrada"
        message="La tarea no existe o fue eliminada."
      />
    );
  }

  if (!accessToken) {
    return (
      <section className="panel" role="alert">
        <h2>No fue posible consultar la tarea</h2>
        <p>La sesión no está disponible.</p>
      </section>
    );
  }

  return (
    <TaskDetailContent
      key={`${taskId}:${accessToken}`}
      taskId={taskId}
      accessToken={accessToken}
      canDelete={user?.role === "admin"}
    />
  );
}
