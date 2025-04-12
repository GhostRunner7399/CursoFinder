package com.example.demo.Repository.Usuario;

import com.example.demo.Repository.Cursos.Class.Cursos;
import com.example.demo.Repository.Usuario.Class.CatalogoRoles;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface RolRepository extends JpaRepository<CatalogoRoles, Long> {

    Optional<CatalogoRoles> findById(Long id);
}
