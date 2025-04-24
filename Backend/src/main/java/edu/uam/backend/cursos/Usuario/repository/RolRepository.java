package edu.uam.backend.cursos.Usuario.repository;

import edu.uam.backend.cursos.Usuario.model.CatalogoRoles;
import edu.uam.backend.cursos.Usuario.model.Nombrerol;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface RolRepository extends JpaRepository<CatalogoRoles, Long> {

    Optional<CatalogoRoles> findById(Long id);


    List<CatalogoRoles> nombreRol(Nombrerol nombreRol);

    boolean existsByNombreRol(Nombrerol nombreRol);


}
