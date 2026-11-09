# Pruebas de API REST - EC3 F2 A10

## Entorno
- Rama: [api-rest-crud-remoto]
- Dirección pública usada por el Frontend: `/api`
- Resultado de `pnpm build`: [vite v8.3.5 building client environment for production...
✓ 41 modules transformed.
computing gzip size...
dist/index.html                   0.47 kB │ gzip:  0.30 kB
dist/assets/index-CY5M_sbj.css   13.74 kB │ gzip:  3.45 kB
dist/assets/index-B0j1zGUm.js   274.27 kB │ gzip: 86.49 kB

✓ built in 532ms]

## Casos ejecutados

| Caso | Método y ruta | Esperado | Obtenido | Resultado |
|---|---|---:|---:|---|
| Listar | GET /api/tasks | 200 | 200 | [Correcto] |
| Crear | POST /api/tasks | 201 | 201 | [Correcto] |
| Actualizar | PATCH /api/tasks/:id | 200 | [200] | [Correcto] |
| Eliminar | DELETE /api/tasks/:id | 204 | [204] | [Correcto] |
| Inexistente | GET /api/tasks/:id | 404 | [404] | [Correcto] |
| API detenida | GET /api/tasks | Error de red | [Pantalla de error al cargar las tasks y opcion de reintentar conexion] | [Correcto] |

