package edu.uam.backend.cursos.Matricula.repository;

import edu.uam.backend.cursos.Curso.model.Cursos;
import edu.uam.backend.cursos.Matricula.model.Matricula;
import edu.uam.backend.cursos.Usuario.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MatriculaRepository extends JpaRepository<Matricula, Long> {
    // Verificar si existe una matrícula entre un usuario y un curso
    boolean existsByUsuarioAndCurso(Usuario usuario, Cursos curso);

    // Buscar todas las matrículas de un usuario usando un DTO
    List<Matricula> findByUsuario(Usuario usuario);

    // Buscar todas las matrículas de un curso
    List<Matricula> findByCurso(Cursos curso);

    // Buscar una matrícula específica por usuario y curso
    Optional<Matricula> findByUsuarioAndCurso(Usuario usuario, Cursos curso);

    int countByCurso(Cursos curso);

}
