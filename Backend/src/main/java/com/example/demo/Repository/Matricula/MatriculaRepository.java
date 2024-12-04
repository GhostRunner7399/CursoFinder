package com.example.demo.Repository.Matricula;

import com.example.demo.Repository.Cursos.Cursos;
import com.example.demo.Repository.Usuario.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MatriculaRepository extends JpaRepository<Matricula, Long> {
    // Verificar si existe una matrícula entre un usuario y un curso
    boolean existsByUsuarioAndCurso(Usuario usuario, Cursos curso);

    // Buscar todas las matrículas de un usuario
    List<Matricula> findByUsuario(Usuario usuario);

    // Buscar todas las matrículas de un curso
    List<Matricula> findByCurso(Cursos curso);

    // Buscar una matrícula específica por usuario y curso
    Optional<Matricula> findByUsuarioAndCurso(Usuario usuario, Cursos curso);

}
