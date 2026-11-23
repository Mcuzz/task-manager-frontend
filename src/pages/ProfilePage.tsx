
import { useAuth } from "../hooks/useAuth";

export function ProfilePage() {
  const { user } = useAuth();

  if (!user) {
    return <p>No hay información del usuario disponible.</p>;
  }

  return (
    <section className="panel">
      <h1>Mi perfil</h1>

      <dl>
        <dt>Nombre</dt>
        <dd>{user.name}</dd>

        <dt>Correo electrónico</dt>
        <dd>{user.email}</dd>

        <dt>Rol</dt>
        <dd>{user.role}</dd>

        <dt>Fecha de creación</dt>
        <dd>{user.createdAt
          ? new Date(user.createdAt).toLocaleString("es-MX")
          : "No disponible"}</dd>

        <dt>Última actualización</dt>
        <dd>{user.updatedAt
          ? new Date(user.updatedAt).toLocaleString("es-MX")
          : "No disponible"}</dd>
      </dl>
    </section>
  );
}
