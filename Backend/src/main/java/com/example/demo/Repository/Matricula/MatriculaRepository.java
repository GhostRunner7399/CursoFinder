package com.example.demo.Repository.Matricula;

import com.example.demo.Repository.Cursos.Cursos;
import com.example.demo.Repository.Usuario.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MatriculaRepository extends JpaRepository<Matricula, Long> {
    boolean existsByUsuarioAndCurso(Usuario usuario, Cursos curso);
    List<Matricula> findByUsuario(Usuario usuario);
    List<Matricula> findByCurso(Cursos curso);

}
