package edu.uam.backend.cursos.Inscripcion.service;

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
        // Verificar si el usuario y el curso existen
        Usuario usuario = usuarioRepository.findByCif(cif)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado."));
        Cursos curso = cursosRepository.findByCodigocurso(codigocurso)
                .orElseThrow(() -> new IllegalArgumentException("Curso no encontrado."));

        if (inscripcionRepository.existsByUsuarioAndCurso(usuario, curso)) {
            throw new IllegalArgumentException("El usuario ya está inscrito en este curso.");
        }
            Long idrol = usuario.getRol().getIdRol();
            if (idrol != 3 && idrol != 5) {
            throw new IllegalArgumentException("El rol no puede ser aceptado. Falta de privilegios");
            }

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
        // Verificar si el curso existe por su código
        Cursos curso = cursosRepository.findByCodigocurso(codigocurso)
                .orElseThrow(() -> new IllegalArgumentException("Curso no encontrado."));

        // Obtener las matrículas asociadas al curso y devolver los usuarios
        return inscripcionRepository.findByCurso(curso)
                .stream()
                .map(Inscripcion::getUsuario) // Obtener el usuario de cada matrícula
                .toList();

    }
    public void borrarmatricula(Integer cif, String codigocurso) {
        // Verificar si el usuario y el curso existen
        Usuario usuario = usuarioRepository.findByCif(cif)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado."));
        Cursos curso = cursosRepository.findByCodigocurso(codigocurso)
                .orElseThrow(() -> new IllegalArgumentException("Curso no encontrado."));

        // Buscar la matrícula correspondiente
        Inscripcion inscripcion = inscripcionRepository.findByUsuarioAndCurso(usuario, curso)
                .orElseThrow(() -> new IllegalArgumentException("La matrícula no existe."));

        // Eliminar la matrícula
        inscripcionRepository.delete(inscripcion);
    }


    public int obtenerCuposDisponibles(String codigocurso) {
        Cursos curso = cursosRepository.findByCodigocurso(codigocurso)
                .orElseThrow(() -> new IllegalArgumentException("Curso no encontrado."));

        int capacidad = curso.getCursoDetalle().getCapacidadMaxima();
        int inscritos = inscripcionRepository.countByCurso(curso);

        return capacidad - inscritos;
    }

}
