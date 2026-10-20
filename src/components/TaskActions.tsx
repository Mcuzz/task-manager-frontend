
interface TaskActionsProps {
  completedCount: number;
  onClearCompleted: () => void;
}

export function TaskActions({
  completedCount,
  onClearCompleted,
}: TaskActionsProps) {
  function handleClearCompleted() {
    if (completedCount === 0) {
      return;
    }

    const shouldClear = window.confirm(
      `¿Eliminar las ${completedCount} tareas completadas?`,
    );

    if (!shouldClear) {
      return;
    }

    onClearCompleted();
  }

  return (
    <section
      className="panel"
      aria-label="Acciones de tareas"
    >
      <button
        type="button"
        className="button-danger"
        onClick={handleClearCompleted}
        disabled={completedCount === 0}
      >
        Eliminar completadas ({completedCount})
      </button>
    </section>
  );
}
