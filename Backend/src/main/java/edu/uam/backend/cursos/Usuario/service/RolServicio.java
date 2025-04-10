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
    private RolRepository RolRepository;

    public List<CatalogoRoles> obtenerTodosLosRoles() {
        return RolRepository.findAll();
    }

    public Optional<CatalogoRoles> obtenerRolPorId(Long id) {
        return RolRepository.findById(id);
    }

    public CatalogoRoles crearRol(CatalogoRoles rol) {
        return RolRepository.save(rol);
    }

    public void eliminarRol(long id) {
        Optional<CatalogoRoles> rolesOptional = RolRepository.findById(id);
        if (rolesOptional.isPresent()) {
            RolRepository.delete(rolesOptional.get());
        } else {
            throw new RuntimeException("El rol con código " + id + " no fue encontrado.");
        }
    }
}
