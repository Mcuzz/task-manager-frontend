## 1. ¿Qué diferencia existe entre una variable local y el estado de React?
Que el useState de react hace una nueva renderizacion mientras mantiene su valor entre los renderizados. La variable local si se reinicia a su valor inicial cada vez que se reenderiza.

## 2. ¿Qué valores devuelve useState?
Regresa el valor actual del estado y una func para actualizarlo

## 3. ¿Por qué useState se declara en el nivel superior del componente?
Para mantener el orden de los hooks y que react gestione bien el estado. 

## 4. ¿Qué significa que un campo sea controlado?
Que su valor depende del estado de react y se actualiza con "onChange". 

## 5. ¿Por qué handleSubmit utiliza preventDefault?
Para que el form no recargue la pagina al enviarse. 

## 6. ¿Cómo comunica TaskForm una nueva tarea a App?
Con la funcion onAddTask que se toma como prop enviando el titulo al componente padre.

## 7. ¿Por qué App funciona como fuente de verdad?
Porque almacena la coleccion principal de tareas y comparte los mismos datos con los componentes que los necesitan. 

## 8. ¿Cómo se implementa Create sin utilizar push?
Creando un nuevo arreglo con spread que incluye la nueva task y las anteriores. 

## 9. ¿Cómo permite map actualizar una sola tarea?
Recorre el arreglo identificando a la tarea con el id y crea una nueva con los cambios. 

## 10. ¿Cómo utiliza filter la operación Delete?
Crea un nuevo arreglo de tareas excluyendo a la tarea que tiene el id seleccionado. 

## 11. ¿Por qué se emplea una función actualizadora en setTasks?
Porque calcula el nuevo estado a partir del estado anterior mas reciente.

## 12. ¿Qué información conserva TaskItem como estado local?
conserva si esta editando la tarea y el titulo temporal que escribe el usuario antes de guardar o cancelar. 

## 13. ¿Por qué los cambios desaparecen al recargar la página?
Porque las tasks se almacenan en los estados de react, por lo que al recargar se reinician al reenderizado original. 

## 14. ¿Qué dificultad encontraste y cómo la resolviste?
Los nombres de algunas de mis importaciones estaban mal escritos o con palabras distintas, por lo que tuve que cambiarlos. 