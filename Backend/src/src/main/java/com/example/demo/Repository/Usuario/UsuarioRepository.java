package com.example.demo.Repository.Usuario;

import com.example.demo.Repository.Usuario.Class.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    //Buscar usuario por CIF
    Optional<Usuario> findByCif(Integer cif);

    //Autenticar usuario
    Optional<Usuario> findByCifAndContraseña(Integer cif, String contraseña);

}
