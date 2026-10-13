# Preguntas de cierre - EC2 F1 A6
## 1. ¿Qué función cumple la interfaz Task?
Typea al elemento de tarea para que este tenga una estructura con atributos fijos. 
## 2. ¿Qué diferencia existe entre Task y TaskStatus?
Task es el elemento que puede llegar a tener varios estados dependiendo de su tipado, y el TaskStatus es uno de los atributos de este tipado que define si esta pendiente o completada.
## 3. ¿Qué significa declarar un arreglo como Task[]?
Significa que ese Task[] pasara a una lista de Task, no solo un elemento individual. 
## 4. ¿Qué hace el método map?
Recorre un arreglo aplicandole una funcion a cada uno de los elementos y retornando un arreglo transformado. 
## 5. ¿Qué resultado produce map dentro de TaskList?
Retorna la TaskList con sus estados y id actualizados. 
## 6. ¿Para qué utiliza React la propiedad key?
Para identificar a un elemento dentro de una lista y a traves de los renderizados. 
## 7. ¿Por qué se utiliza task.id y no el índice?
Porque `task.id` es un identificador único y estable para cada tarea.

## 8. ¿Cómo se envía una tarea de TaskList a TaskItem?
Mediante la propiedad `task`, utilizando `<TaskItem key={task.id} task={task} />`.

## 9. ¿Cómo se comunican App, TaskSummary y TaskList?
`App` envía la colección mediante props a `TaskSummary` y `TaskList`, que la utilizan para calcular y mostrar la información.

## 10. ¿Qué es el renderizado condicional?
Es mostrar diferentes elementos en la interfaz según se cumpla una condición.

## 11. ¿Por qué el resumen se calcula a partir de la colección?
Para mantener las cantidades actualizadas automáticamente y evitar datos inconsistentes.

## 12. ¿Qué dificultad encontraste durante la refactorización y cómo la resolviste?
La principal dificultad fue adaptar los componentes para recibir objetos `Task`. Se resolvió definiendo la interfaz y pasando las tareas mediante props.