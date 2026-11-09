Preguntas de cierre — EC2 F3 A8
## 1. ¿Por qué las reglas de validación se colocaron en una utilidad?

Para reutilizar las mismas reglas al registrar y editar tareas, evitando duplicar código.

## 2. ¿Qué significa el retorno string | null de validateTaskTitle?

Que devuelve un mensaje de error (string) si el título no es válido, o null si es válido.

## 3. ¿Qué función cumplen aria-invalid, aria-describedby y role="alert"?

aria-invalid indica que un campo tiene errores, aria-describedby lo vincula con su mensaje y role="alert" anuncia el error a tecnologías de asistencia.

## 4. ¿Por qué query, filter y sortBy son estados controlados?

Porque almacenan y controlan los valores de búsqueda, filtro y ordenamiento seleccionados por el usuario.

## 5. ¿Por qué visibleTasks no debe almacenarse como estado independiente?

Porque se calcula a partir de tasks, query, filter y sortBy. Guardarlo por separado podría generar inconsistencias.

## 6. ¿Cómo se normaliza una búsqueda?

Eliminando los espacios externos y convirtiendo el texto a minúsculas para comparar sin distinguir entre mayúsculas y minúsculas.

## 7. ¿Por qué se crea una copia antes de utilizar sort?

Porque sort modifica el arreglo original. La copia permite ordenar los resultados sin alterar el estado principal.

## 8. ¿Qué responsabilidad tiene task-query.service.ts?

Buscar, filtrar y ordenar las tareas según los criterios recibidos, sin modificar la colección original.

## 9. ¿Por qué el resultado de JSON.parse se trata como unknown?

Porque los datos almacenados podrían tener cualquier estructura y deben validarse antes de utilizarlos como tareas.

## 10. ¿Qué comprueba la función isTask?

Que cada elemento tenga identificador, título, estado válido y fechas de creación y actualización correctas.

## 11. ¿Qué ventaja ofrece la inicialización diferida de useState?

Permite recuperar las tareas de localStorage al inicializar el estado, evitando repetir esa lectura en cada renderizado.

## 12. ¿Por qué localStorage se sincroniza mediante useEffect?

Porque permite guardar las tareas después de que cambia el estado principal, manteniendo actualizados los datos persistidos.

## 13. ¿Por qué TaskSummary recibe tasks y TaskList recibe visibleTasks?

Porque el resumen debe considerar todas las tareas, mientras que la lista muestra únicamente las que cumplen los criterios de consulta.

## 14. ¿Qué información se pierde y cuál permanece al recargar?

La búsqueda, el filtro y el ordenamiento vuelven a sus valores iniciales. Las tareas guardadas permanecen en localStorage, incluidos sus títulos y estados.

## 15. ¿Qué dificultad encontraste y cómo la resolviste?

Habia una mala implementacion en el codigo del task-storage.service.ts pero solo se resolvio reacomodando una inconsistencia de llaves. 