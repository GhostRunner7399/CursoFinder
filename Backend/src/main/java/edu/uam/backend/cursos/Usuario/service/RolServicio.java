package edu.uam.backend.cursos.Usuario.service;

import edu.uam.backend.cursos.Usuario.model.CatalogoRoles;
import edu.uam.backend.cursos.Usuario.repository.RolRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RolServicio {

    @Autowired
    private RolRepository rolRepository;

    public List<CatalogoRoles> obtenerTodosLosRoles() {
        return rolRepository.findAll();
    }

    public Optional<CatalogoRoles> obtenerRolPorId(Long id) {
        return rolRepository.findById(id);
    }

    public CatalogoRoles crearRol(CatalogoRoles rol) {
        if (rolRepository.existsByNombreRol(rol.getNombreRol())) {
            throw new IllegalArgumentException("Ya existe un rol con ese nombre.");
        }
        return rolRepository.save(rol);
    }


    public void eliminarRol(long id) {
        CatalogoRoles rol = rolRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Rol no encontrado."));
        rolRepository.delete(rol);

    }
}