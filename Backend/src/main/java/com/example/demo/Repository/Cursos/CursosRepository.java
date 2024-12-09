package com.example.demo.Repository.Cursos;


import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CursosRepository extends JpaRepository<Cursos, Long> {

    // Buscar cursos por nombre
    List<Cursos> findByNombre(String nombre);

    Optional<Cursos> findByCodigocurso(String codigocurso);


}