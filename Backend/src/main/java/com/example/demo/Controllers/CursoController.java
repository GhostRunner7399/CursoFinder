package com.example.demo.Controllers;

import com.example.demo.Repository.Cursos.Cursos;
import com.example.demo.Services.Cursos.CursoServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
public class CursoController {

    @Autowired
    private CursoServicio cursoServicio;

    // Crear o actualizar curso
    @PostMapping("/create")
    public ResponseEntity<Cursos> crearCurso(@RequestBody Cursos curso) {
        Cursos cursoGuardado = cursoServicio.guardarCurso(curso);
        return ResponseEntity.ok(cursoGuardado);
    }


    // Obtener todos los cursos
    @GetMapping("/all")
    public ResponseEntity<List<Cursos>> obtenerTodosLosCursos() {
        return ResponseEntity.ok(cursoServicio.obtenerTodosLosCursos());
    }

    // Obtener un curso por ID
    @GetMapping("/{id}")
    public ResponseEntity<Cursos> obtenerCursoPorId(@PathVariable Long id) {
        return cursoServicio.obtenerCursoPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Eliminar un curso por ID
    @DeleteMapping("/{codigocurso}")
    public ResponseEntity<String> eliminarCurso(@PathVariable String codigocurso) {
        cursoServicio.eliminarCurso(codigocurso);
        return ResponseEntity.ok("Curso con código " + codigocurso + " eliminado correctamente.");

    }

}