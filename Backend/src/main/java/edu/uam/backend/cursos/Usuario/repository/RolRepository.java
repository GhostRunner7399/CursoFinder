package edu.uam.backend.cursos.Usuario.repository;

import edu.uam.backend.cursos.Usuario.model.CatalogoRoles;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface RolRepository extends JpaRepository<CatalogoRoles, Long> {

    Optional<CatalogoRoles> findById(Long id);
}
