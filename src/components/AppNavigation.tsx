
import { NavLink, type NavLinkRenderProps } from "react-router";

export function AppNavigation() {
  return (
    <nav className="app-navigation" aria-label="Navegación principal">
      <ul className="app-navigation__list">
        <li>
          <NavLink
            to="/"
            end
            className={({ isActive }: NavLinkRenderProps) =>
              [
                "app-navigation__link",
                isActive ? "app-navigation__link--active" : "",
              ]
                .filter(Boolean)
                .join(" ")
            }
          >
            Inicio
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/tasks"
            className={({ isActive }: NavLinkRenderProps) =>
              [
                "app-navigation__link",
                isActive ? "app-navigation__link--active" : "",
              ]
                .filter(Boolean)
                .join(" ")
            }
          >
            Tareas
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
