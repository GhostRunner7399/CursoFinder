package com.example.demo.Repository;


import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CursosRepository extends JpaRepository<Cursos, Long> {

    // Buscar cursos por nombre
    List<Cursos> findByNombre(String nombre);


}
