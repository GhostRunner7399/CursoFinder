package edu.uam.backend.cursos.Usuario.repository;

import edu.uam.backend.cursos.Usuario.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import edu.uam.backend.cursos.Usuario.repository.UsuarioRepository;

import java.util.Optional;
import java.util.List;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    //buscar por CIF
    Optional<Usuario> findByCif(Integer cif);

    //autenticar 
    Optional<Usuario> findByCifAndContraseña(Integer cif, String contraseña);

    // buscar usuarios que tengan rol 'DOCENTE'
    List<Usuario> findByRol_IdRol(Long idRol);

}
