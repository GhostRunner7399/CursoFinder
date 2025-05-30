package edu.uam.backend.cursos.Inscripcion.service;

import edu.uam.backend.cursos.Curso.model.CursoDetalle;
import edu.uam.backend.cursos.Curso.model.Cursos;
import edu.uam.backend.cursos.Curso.repository.CursosRepository;
import edu.uam.backend.cursos.Inscripcion.model.Inscripcion;
import edu.uam.backend.cursos.Inscripcion.repository.InscripcionRepository;
import edu.uam.backend.cursos.Usuario.model.Usuario;
import edu.uam.backend.cursos.Usuario.repository.UsuarioRepository;
import edu.uam.backend.cursos.Usuario.service.UsuarioServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class InscripcionServicio {

    @Autowired
    InscripcionRepository inscripcionRepository;

    @Autowired
    UsuarioRepository usuarioRepository;

    @Autowired
    CursosRepository cursosRepository;
    private UsuarioServicio usuarioServicio;

    public Inscripcion matricularUsuario(Integer cif, String codigocurso) {
        // verificar existencia usuario y curso 
        Usuario usuario = usuarioRepository.findByCif(cif)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado."));
        Cursos curso = cursosRepository.findByCodigocurso(codigocurso)
                .orElseThrow(() -> new IllegalArgumentException("Curso no encontrado."));
    
        // validar que no se inscriba a su propio curso
        if (curso.getCursoDetalle() != null && curso.getCursoDetalle().getDocente() != null) {
            if (curso.getCursoDetalle().getDocente().getCif().equals(usuario.getCif())) {
                throw new IllegalArgumentException("No puedes inscribirte en tu propio curso.");
            }
        }
    
        // Verificar si ya está inscrito
        if (inscripcionRepository.existsByUsuarioAndCurso(usuario, curso)) {
            throw new IllegalArgumentException("Ya estás inscrito en este curso.");
        }

        CursoDetalle detalle = curso.getCursoDetalle();
        if (detalle.getDisponibilidad() <= 0) {
            throw new IllegalArgumentException("No hay cupos disponibles en este curso.");
        }
    
        detalle.setDisponibilidad(detalle.getDisponibilidad() - 1);
        Inscripcion inscripcion = new Inscripcion();
        inscripcion.setUsuario(usuario);
        inscripcion.setCurso(curso);
        inscripcion.setFechaInscripcion(LocalDateTime.now());
        inscripcion.setActivo(true);
        return inscripcionRepository.save(inscripcion);
    }
    
    public List<Cursos> obtenerCursosUsuario(Integer cif){
        Usuario usuario = usuarioRepository.findByCif(cif)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado."));

        return inscripcionRepository.findByUsuario(usuario)
                .stream()
                .map(Inscripcion::getCurso)
                .toList();
    }

    public List<Usuario> obtenerParticipantes(String codigocurso) {
        Cursos curso = cursosRepository.findByCodigocurso(codigocurso)
                .orElseThrow(() -> new IllegalArgumentException("Curso no encontrado."));

        return inscripcionRepository.findByCurso(curso)
                .stream()
                .map(Inscripcion::getUsuario) 
                .toList();

    }
    public void borrarmatricula(Integer cif, String codigocurso) {
        // verificacion de existencias
        Usuario usuario = usuarioRepository.findByCif(cif)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado."));
        Cursos curso = cursosRepository.findByCodigocurso(codigocurso)
                .orElseThrow(() -> new IllegalArgumentException("Curso no encontrado."));

        //buscar la matrícula 
        Inscripcion inscripcion = inscripcionRepository.findByUsuarioAndCurso(usuario, curso)
                .orElseThrow(() -> new IllegalArgumentException("La matrícula no existe."));

        //recuperar detalle y aumentar disponibilidad en +1
        CursoDetalle detalle = curso.getCursoDetalle();
        if (detalle != null) {
                detalle.setDisponibilidad(detalle.getDisponibilidad() + 1);
        }

        cursosRepository.save(curso); 

        //eliminar 
        inscripcionRepository.delete(inscripcion);
    }


    public int obtenerCuposDisponibles(String codigocurso) {
        Cursos curso = cursosRepository.findByCodigocurso(codigocurso)
                .orElseThrow(() -> new IllegalArgumentException("Curso no encontrado."));

        Integer capacidad = curso.getCursoDetalle().getCapacidadMaxima();
        Integer inscritos = inscripcionRepository.countByCurso(curso);

        return capacidad - inscritos;
    }

}
