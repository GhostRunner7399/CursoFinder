package edu.uam.backend.cursos.Curso.controller;

import edu.uam.backend.cursos.Curso.DataTransferObjects.CursoRequestDTO;
import edu.uam.backend.cursos.Curso.model.CursoDetalle;
import edu.uam.backend.cursos.Curso.service.CursoServicio;
import edu.uam.backend.cursos.Curso.DataTransferObjects.CursoUpdateDTO;
import edu.uam.backend.cursos.Curso.model.Cursos;
import edu.uam.backend.cursos.Facultad.repository.FacultadRepository;
import edu.uam.backend.cursos.Usuario.model.Usuario;
import edu.uam.backend.cursos.Usuario.repository.UsuarioRepository;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/courses")
public class CursoController {

    @Autowired
    private CursoServicio cursoServicio;
    @Autowired
    private FacultadRepository facultadRepository;
    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping("create")
    public ResponseEntity<Cursos> crearCurso(@RequestBody CursoRequestDTO request) {
        Cursos cursoCreado = cursoServicio.crearCursoDesdeDTO(request);
        return ResponseEntity.ok(cursoCreado);
    }

    private static @NotNull CursoDetalle getCursoDetalle(CursoRequestDTO request, Usuario docente) {
        CursoDetalle detalle = new CursoDetalle();
        detalle.setDescripcion(request.getCursoDetalle().getDescripcion());
        detalle.setRequisitos(request.getCursoDetalle().getRequisitos());
        detalle.setLugar(request.getCursoDetalle().getLugar());
        detalle.setCertificacion(request.getCursoDetalle().isCertificacion());
        detalle.setCapacidadMaxima(request.getCursoDetalle().getCapacidadMaxima());
        detalle.setDocente(docente);

        if (request.getCursoDetalle().getHorarios() != null && !request.getCursoDetalle().getHorarios().isEmpty()) {
            detalle.setHorarios(request.getCursoDetalle().getHorarios());
        }
        return detalle;
    }


    @GetMapping("/all")
    public ResponseEntity<Page<Cursos>> obtenerCursosPaginados(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return ResponseEntity.ok(cursoServicio.obtenerCursosPaginados(page, size));
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
