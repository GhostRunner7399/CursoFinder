package edu.uam.backend.cursos.Inscripcion.Controller;

import edu.uam.backend.cursos.Curso.model.Cursos;
import edu.uam.backend.cursos.Inscripcion.model.Inscripcion;
import edu.uam.backend.cursos.Inscripcion.DataTransferObjects.InscripcionRequestDTO;
import edu.uam.backend.cursos.Inscripcion.repository.InscripcionRepository;
import edu.uam.backend.cursos.Inscripcion.service.InscripcionServicio;
import edu.uam.backend.cursos.Usuario.model.Usuario;
import edu.uam.backend.cursos.Usuario.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//NOTA MENTAL, PODRIAMOS HACER QUE AL PROCESAR LA INSCRIPCION AL CURSO
// LA PLATAFORMA VERIFIQUE SI EL NUMERO DE REGISTROS ES MENOR A LA CAPACIDAD MAXIMA,
// SI ES ASI DENIEGA LA SOLICITUD Y RETORNA UNA EXEPCION

@RestController
@RequestMapping("/api/enrollmentservice")

public class InscripcionController {
    @Autowired
    InscripcionServicio inscripcionServicio;
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private InscripcionRepository inscripcionRepository;

    //Matricularse en un curso
    @PostMapping("/enroll")
    public ResponseEntity<String> matricularUsuario(@RequestBody InscripcionRequestDTO request) {
        try {
            inscripcionServicio.matricularUsuario(request.getCif(), request.getCodigocurso());
            return ResponseEntity.ok("Usuario matriculado con éxito en el curso.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    //Participantes de un curso
    @GetMapping("/participants/{codigocurso}")
    public ResponseEntity<List<Usuario>> obtenerParticipantes(@PathVariable String codigocurso) {
        try {
            List<Usuario> participantes = inscripcionServicio.obtenerParticipantes(codigocurso);
            return ResponseEntity.ok(participantes);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    //Obterner los cursos de el usuario con el cif
    @GetMapping("/{cif}/courses")
    public ResponseEntity<List<Cursos>> obtenerCursosUsuario(
            @PathVariable Integer cif,
            @RequestParam(required = false) Boolean disponibles,
            @RequestParam(required = false) String nombre
    ) {
        try {
            Usuario usuario = usuarioRepository.findByCif(cif)
                    .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado."));

            List<Cursos> cursos = inscripcionRepository.findByUsuario(usuario).stream()
                    .map(Inscripcion::getCurso)
                    .filter(curso -> nombre == null || curso.getNombre().toLowerCase().contains(nombre.toLowerCase()))
                    .filter(curso -> {
                        if (disponibles == null || !disponibles) return true;
                        int inscritos = inscripcionRepository.countByCurso(curso);
                        return curso.getCursoDetalle().getCapacidadMaxima() > inscritos;
                    })
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
            inscripcionServicio.borrarmatricula(cif, codigocurso);
            return ResponseEntity.ok("Matrícula eliminada con éxito.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    //Dispinobilidad de curos
    @GetMapping("/disponibilidad/{codigocurso}")
    public ResponseEntity<Integer> obtenerCuposDisponibles(@PathVariable String codigocurso) {
        int cupos = inscripcionServicio.obtenerCuposDisponibles(codigocurso);
        return ResponseEntity.ok(cupos);
    }


}

