# Preguntas de cierre - EC3 F2 A10

## 1. ¿Qué diferencia existe entre una falla de red y una respuesta HTTP 404?

Una falla de red ocurre cuando no se logra establecer comunicación con el servidor. Un 404 significa que el servidor respondió, pero el recurso solicitado no existe.

## 2. ¿Por qué debe comprobarse response.ok después de fetch?

Porque `fetch` no considera los errores HTTP como excepciones automáticamente. `response.ok` permite comprobar si la respuesta tiene un estado exitoso.

## 3. ¿Qué responsabilidad tiene http.service.ts?

Centralizar las solicitudes HTTP, el manejo de respuestas y la gestión de errores.

## 4. ¿Qué responsabilidad tiene task.api.service.ts?

Contener las operaciones específicas para comunicarse con la API de tareas, como consultar, crear, actualizar y eliminar.

## 5. ¿Por qué VITE_API_URL no debe contener credenciales?

Porque las variables `VITE_` pueden exponerse en el código del Frontend. Las credenciales deben permanecer en el servidor.

## 6. ¿Qué problema resuelve el proxy de Vite durante el desarrollo?

Permite enviar las solicitudes del Frontend al Backend evitando problemas de CORS durante el desarrollo.

## 7. ¿Por qué el proxy no sustituye la configuración de producción?

Porque el proxy de Vite funciona durante el desarrollo. En producción se necesita configurar correctamente la dirección del Backend o del servidor que atiende la API.

## 8. ¿Qué función cumple AbortController?

Permite cancelar solicitudes HTTP que ya no son necesarias y evitar que respuestas obsoletas actualicen la interfaz.

## 9. ¿Por qué la ruta de detalle consulta la tarea por id?

Porque el identificador permite recuperar una tarea específica, en lugar de consultar y recorrer toda la colección.

## 10. ¿Por qué el formulario se limpia únicamente después de un POST satisfactorio?

Para conservar los datos si ocurre un error y evitar que el usuario tenga que escribirlos nuevamente.

## 11. ¿Qué ventaja ofrece separar la consulta remota de los componentes visuales?

Facilita el mantenimiento, la reutilización y las pruebas, porque la lógica de comunicación con la API no queda mezclada con la presentación.

## 12. ¿Qué cambio fue más difícil y cómo comprobaste que funcionaba?

Aun tengo que meditarlo