# CursoFinder - Backend

Bueno gente, como sabrán estaba evitando crear el CRUD completo porque hacerlo significaba usar Put y aplicar ese metodo podia sobreescribir el Objeto completamente y borrar datos si no los especificabas correctamente asi que decidi
tryhardearla más de lo normal programando y me toco aprender sobre los DTO cosa que no lo enseñó Cash y estaba complejito.  
Pero me complace anunciarles que despues de 2 horas y varios articulos de stack overflow ya entiendo el tema de los Data Transfer Objects, así que poco a poco voy a ir creando para el resto de clases que lo ameriten.  
Por el momento no los he testeado bien pero no deberíamos tener errores graves.  
Cualquier cosa les adjunto cómo funciona el nuevo método `PATCH`:

---

## 🔄 ¿Cómo usar el método PATCH?

El endpoint `PATCH` permite actualizar parcialmente un curso sin necesidad de enviar todo el objeto completo.

### 🔧 Ruta del endpoint:



PATCH /api/courses/update/{codigocurso}


- Reemplaza `{codigocurso}` con el código del curso que deseas actualizar (por ejemplo: `CS500`).
- El cuerpo debe ser en formato JSON.
- Sólo los campos que incluyas en el JSON serán modificados.
- Lo que no envíes, **no se toca**.

### ✅ Ejemplo de petición válida

```json
{
  "nombre": "Curso avanzado de magia negra",
  "cursoDetalle": {
    "docente": "El Inquisidor Supremo"
  }
}
```
Esto actualizará únicamente el nombre del curso y el nombre del docente.
El resto de los datos se mantiene igual.

### 🔐 Headers necesarios

Asegúrate de incluir este header en tu petición (Postman, Insomnia o desde código):

Content-Type: application/json

### 💬 Respuesta esperada

Si el curso existe y el PATCH se ejecuta correc tamente, el servidor devolverá un objeto JSON con todos los datos actualizados del curso.


 -Daiv