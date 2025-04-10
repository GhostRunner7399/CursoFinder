package com.example.demo.Controllers.Matricula;

import com.example.demo.Repository.Cursos.Class.Cursos;
import com.example.demo.Repository.Matricula.Class.Matricula;
import com.example.demo.Repository.Matricula.MatriculaRepository;
import com.example.demo.Repository.Matricula.Class.MatriculaRequest;
import com.example.demo.Repository.Usuario.Class.Usuario;
import com.example.demo.Repository.Usuario.UsuarioRepository;
import com.example.demo.Services.Matricula.MatriculaServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//NOTA MENTAL, PODRIAMOS HACER QUE AL PROCESAR LA INSCRIPCION AL CURSO
// LA PLATAFORMA VERIFIQUE SI EL NUMERO DE REGISTROS ES MENOR A LA CAPACIDAD MAXIMA,
// SI ES ASI DENIEGA LA SOLICITUD Y RETORNA UNA EXEPCION
//IMMAFUCKINGENIUS (AUNQUE PERDERIAMOS LA CAPACIDAD DE MOSTRAR CUANTOS QUEDAN)

@RestController
@RequestMapping("/api/enrollmentservice")

public class MatriculaController {
    @Autowired
    MatriculaServicio matriculaServicio;
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private MatriculaRepository matriculaRepository;

    //Matricularse en un curso
    @PostMapping("/enroll")
    public ResponseEntity<String> matricularUsuario(@RequestBody MatriculaRequest request) {
        try {
            matriculaServicio.matricularUsuario(request.getCif(), request.getCodigocurso());
            return ResponseEntity.ok("Usuario matriculado con éxito en el curso.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    //Participantes de un curso
    @GetMapping("/participants/{codigocurso}")
    public ResponseEntity<List<Usuario>> obtenerParticipantes(@PathVariable String codigocurso) {
        try {
            List<Usuario> participantes = matriculaServicio.obtenerParticipantes(codigocurso);
            return ResponseEntity.ok(participantes);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    //Obterner los cursos de el usuario con el cif
    @GetMapping("/{cif}/courses")
    public ResponseEntity<List<Cursos>> obtenerCursosUsuario(@PathVariable Integer cif) {
        try {
            Usuario usuario = usuarioRepository.findByCif(cif)
                    .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado."));
            List<Cursos> cursos = matriculaRepository.findByUsuario(usuario).stream()
                    .map(Matricula::getCurso)
                    .toList();
            return ResponseEntity.ok(cursos);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    //ELiminar la matricula de un usuario
    @DeleteMapping("/usuario/{cif}/curso/{codigocurso}")
    public ResponseEntity<String> borrarMatricula(@PathVariable Integer cif, @PathVariable String codigocurso) {
        try {
            matriculaServicio.borrarmatricula(cif, codigocurso);
            return ResponseEntity.ok("Matrícula eliminada con éxito.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}

