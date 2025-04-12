# CursoFinder - Avances y Documentación Técnica

Bueno gente, ha sido un largo camino pero oficialmente ya tengo un avance más o menos decente para seguir adelante.  
Por el momento solucioné varias cosas que teníamos mal, como que **el buscar cursos funcionaba por el ID interno de la base de datos** y no por `codigocurso`, como debería ser originalmente.

---

## ✅ Mejoras implementadas

### 🔍 Búsqueda por Código

- Se cambió la lógica de búsqueda de cursos para que funcione con `codigocurso`.
- Ahora se puede hacer:

GET /api/courses/buscar/CS500

En lugar de:

GET /api/courses/1

---

### ⏰ Múltiples horarios por curso

- Los cursos ahora aceptan **más de un horario**, gracias a la nueva relación `@OneToMany` entre `CursoDetalle` y `HorarioCurso`.
- Esto permite que un mismo curso tenga, por ejemplo, clases los lunes y miércoles, o turnos distintos en el mismo día.

---

### 🛡️ Sistema de Roles (en progreso)

- Se comenzó a trabajar en el sistema de roles para distinguir tipos de usuarios (administrador, estudiante, docente, etc).
- Aún no está conectado con la lógica de seguridad, pero la base está preparada para integrarlo pronto con JWT o Spring Security.

---

## ⚠️ Estado actual del sistema

- Aunque ya se puede testear con Postman o Frontend, les **insisto que sigan trabajando sin persistencia**, porque **me faltan cambiar MUCHAS COSAS** (aproximadamente un **80% del código anterior**) para adaptarnos al modelo nuevo.
- El código viejo no está optimizado para trabajar con DTOs ni estructuras desacopladas, así que todo eso lo voy a ir refactorizando por etapas.

---

## 🔧 Qué se puede hacer actualmente

- Crear cursos con varios horarios.
- Buscar cursos por código.
- Usar el método `PATCH` para editar parcialmente un curso (ver `README_PATCH.md`).
- Ver todos los cursos en una sola llamada (`GET /api/courses/all`).
- Todo lo que ya se podia antes de hecho.

---

## Próximos pasos

- Terminar la migración completa al modelo con DTOs.
- Completar los CRUDs de el sistema entero si es posible antes del fin de semana
- Crear la primera parte de graficos y actualizar la estructura de la BD
- Agregar documentación paso a paso para cada clase del backend.
- Preparar ejemplos que el frontend pueda consumir fácilmente sin necesidad de conocer toda la estructura interna.

---

##  Para los del Frontend:

> Ya tienen una estructura base funcional.  
> No es 100% final, pero si quieren testear con algo real, **ya pueden consumir los endpoints principales.**

A partir de hoy a ir dejando más `.md` con documentación para que alguien mas sin experiencia lo pueda usar
sin necesidad de complicarse mucho.  
Así que si no entienden algo, revisen los archivos o me preguntan.  
Suerte en el frontend


