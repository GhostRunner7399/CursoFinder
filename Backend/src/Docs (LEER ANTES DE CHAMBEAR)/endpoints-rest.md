# Endpoints REST

Documentación de los endpoints organizados por módulo.

---

## Módulo: Curso

### `POST /api/courses/create`
- Descripción: Crea un nuevo curso con su detalle y horarios.
- Cuerpo esperado: Objeto tipo `Cursos`.

### `GET /api/courses/all`
- Descripción: Lista todos los cursos registrados.

### `GET /api/courses/{codigocurso}`
- Descripción: Recupera un curso específico por su código.

### `DELETE /api/courses/{codigocurso}`
- Descripción: Elimina un curso por su código.

### `PATCH /api/courses/update/{codigocurso}`
- Descripción: Actualización parcial de un curso.
- Cuerpo esperado: Objeto `CursoUpdateDTO`.

---

## Módulo: Usuario

### `POST /api/usuario/crear`
- Descripción: Crea un nuevo usuario.

### `GET /api/usuario/lista`
- Descripción: Devuelve una lista de usuarios registrados.

### `GET /api/usuario/{id}`
- Descripción: Obtiene un usuario por su ID.

---

## Módulo: Rol

### `POST /api/roles`
- Descripción: Crea un nuevo rol.

### `GET /api/roles`
- Descripción: Lista todos los roles existentes.