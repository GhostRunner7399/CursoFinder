package edu.uam.backend.cursos.Curso.repository;


import edu.uam.backend.cursos.Curso.model.Cursos;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CursosRepository extends JpaRepository<Cursos, Long> {

    List<Cursos> findByNombre(String nombre);

    Optional<Cursos> findByCodigocurso(String codigocurso);


}
