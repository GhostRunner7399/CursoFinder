package edu.uam.backend.cursos.Facultad.repository;

import edu.uam.backend.cursos.Facultad.model.Facultad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FacultadRepository extends JpaRepository<Facultad, Long> {


    boolean existsByNombreIgnoreCase(String nombre);


}
