package edu.uam.backend.cursos.Inscripcion.repository;

import edu.uam.backend.cursos.Curso.model.Cursos;
import edu.uam.backend.cursos.Inscripcion.model.Inscripcion;
import edu.uam.backend.cursos.Usuario.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface InscripcionRepository extends JpaRepository<Inscripcion, Long> {
    // Verificar si existe una matrícula entre un usuario y un curso
    boolean existsByUsuarioAndCurso(Usuario usuario, Cursos curso);

    // Buscar todas las matrículas de un usuario usando un DTO
    List<Inscripcion> findByUsuario(Usuario usuario);

    // Buscar todas las matrículas de un curso
    List<Inscripcion> findByCurso(Cursos curso);

    // Buscar una matrícula específica por usuario y curso
    Optional<Inscripcion> findByUsuarioAndCurso(Usuario usuario, Cursos curso);

    int countByCurso(Cursos curso);

}
