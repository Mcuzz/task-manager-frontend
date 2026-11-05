# Preguntas de cierre - EC3 F1 A9

## 1. ¿Qué es una aplicación de página única?
Es una aplicación web que actualiza su contenido sin recargar completamente la página o sin tener mas modulos o pages adicionales, como en la anterior version en la que solo usabamos el App.tas para reenderizar todo.

## 2. ¿Qué responsabilidad tiene BrowserRouter?
Gestiona la navegación mediante la URL y el historial del navegador.

## 3. ¿Cuál es la diferencia entre Routes y Route?
`Routes` agrupa las rutas y `Route` define cada ruta individual.

## 4. ¿Qué es una ruta índice?
Es la ruta predeterminada que se muestra dentro de un layout cuando coincide su ruta padre.

## 5. ¿Qué beneficio ofrece un layout?
Permite reutilizar elementos comunes, como encabezados, menús y estructuras de página.

## 6. ¿Qué función cumple Outlet?
Indica dónde se renderiza el contenido de las rutas hijas.

## 7. ¿Qué diferencia existe entre Link y NavLink?
`Link` permite navegar; `NavLink` también identifica cuándo una ruta está activa.

## 8. ¿Por qué no se utilizan enlaces a para navegar internamente?
Porque provocan recargas completas y se pierde la ventaja de la navegación SPA.

## 9. ¿Qué representa :taskId?
Es un parámetro dinámico que identifica una tarea específica en la URL.

## 10. ¿Cómo se recupera un parámetro dinámico?
Mediante el hook `useParams()` de React Router.

## 11. ¿Cuándo debe utilizarse useNavigate?
Cuando se necesita navegar mediante código, por ejemplo, después de eliminar una tarea.

## 12. ¿Qué función cumple la ruta *?
Captura las rutas que no coinciden con ninguna ruta definida y permite mostrar una página 404.

## 13. ¿Por qué el estado continúa administrado por App?
Porque centraliza los datos y permite compartirlos entre diferentes componentes y rutas.

## 14. ¿Por qué localStorage permanece en esta actividad?
Porque permite conservar las tareas aunque se recargue o cierre el navegador.

## 15. ¿Qué dificultad encontraste y cómo la resolviste?
Tuve dificultades con el manejo de parámetros dinámicos y la validación de tipos en TypeScript. Lo resolví revisando las rutas, utilizando `useParams()` y validando que los datos existieran antes de utilizarlos.