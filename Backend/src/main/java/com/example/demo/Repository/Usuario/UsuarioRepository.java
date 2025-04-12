package com.example.demo.Repository.Usuario;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    //Buscar usuario por CIF
    Optional<Usuario> findByCif(String cif);

    //Autenticar usuario
    Optional<Usuario> findByCifAndContraseña(String cif, String contraseña);

}
