package com.example.demo.Controllers.Cursos;

import com.example.demo.DataTransferObject.Curso.CursoUpdateDTO;
import com.example.demo.Repository.Cursos.Class.Cursos;
import com.example.demo.Services.Cursos.CursoServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/courses")
public class CursoController {

    @Autowired
    private CursoServicio cursoServicio;

    @PostMapping("/create")
    public ResponseEntity<Cursos> crearCurso(@RequestBody Cursos curso) {
        Cursos cursoGuardado = cursoServicio.guardarCurso(curso);
        return ResponseEntity.ok(cursoGuardado);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Cursos>> obtenerTodosLosCursos() {
        return ResponseEntity.ok(cursoServicio.obtenerTodosLosCursos());
    }

    @GetMapping("/{codigocurso}")
    public ResponseEntity<Cursos> obtenerCursoPorCodigo(@PathVariable String codigocurso) {
        Optional<Cursos> curso = cursoServicio.obtenerCursoPorCodigo(codigocurso);
        return curso.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{codigocurso}")
    public ResponseEntity<String> eliminarCurso(@PathVariable String codigocurso) {
        cursoServicio.eliminarCurso(codigocurso);
        return ResponseEntity.ok("Curso con código " + codigocurso + " eliminado correctamente.");
    }

    //Ayudame Diosito este patchmaapping me esta matando y mi ego se niega a usar chatpgt
    @PatchMapping("/update/{codigocurso}")
    public ResponseEntity<Cursos> actualizarParcialCurso(
            @PathVariable String codigocurso,
            @RequestBody CursoUpdateDTO dto) {
        try {
            Cursos actualizado = cursoServicio.actualizarCursoParcialPorCodigo(codigocurso, dto);
            return ResponseEntity.ok(actualizado);
        } catch (RuntimeException e) {
            System.out.println(">>> Error en PATCH: " + e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }

}
