package edu.uam.backend.cursos.Usuario.controller;

import edu.uam.backend.cursos.Usuario.model.CatalogoRoles;
import edu.uam.backend.cursos.Usuario.service.RolServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/roles")
public class RolController {

    @Autowired
    private RolServicio rolServicio;

    // Obtener todos los roles
    @GetMapping("/all")
    public ResponseEntity<List<CatalogoRoles>> obtenerTodosLosRoles() {
        return ResponseEntity.ok(rolServicio.obtenerTodosLosRoles());
    }

    // get rol por id
    @GetMapping("/{id}")
    public ResponseEntity<CatalogoRoles> obtenerRolPorId(@PathVariable Long id) {
        Optional<CatalogoRoles> rol = rolServicio.obtenerRolPorId(id);
        return rol.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    //crear nuevo rol
    @PostMapping("/create")
    public ResponseEntity<CatalogoRoles> crearRol(@RequestBody CatalogoRoles rol) {
        return ResponseEntity.ok(rolServicio.crearRol(rol));
    }
    
    //eliminar rol
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> eliminarRol(@PathVariable Long id) {
        rolServicio.eliminarRol(id);
        return ResponseEntity.noContent().build();
    }
}
