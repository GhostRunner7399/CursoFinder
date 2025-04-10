package edu.uam.backend.cursos.Usuario.controller;

import edu.uam.backend.cursos.Usuario.DataTransferObjects.UsuarioDTO;
import edu.uam.backend.cursos.Usuario.model.Usuario;
import edu.uam.backend.cursos.Usuario.service.UsuarioServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UsuarioController {

    //MARKDOWN-- Los enpoints estan funcionando con .Json en formato Standard.
    @Autowired
    private UsuarioServicio usuarioServicio;

    // Registrar usuario
    @PostMapping("/action/register")
    public Usuario registrarUsuario(@RequestBody UsuarioDTO usuarioDTO) {
        return usuarioServicio.registrarUsuarioDesdeDTO(usuarioDTO);
    }

    // Autenticar usuario
    @PostMapping("/auth")
    public boolean autenticarUsuario(@RequestBody Usuario usuario) {
        return usuarioServicio.autenticarUsuario(usuario.getCif(), usuario.getContraseña());
    }


    // Buscar usuario por CIF
    @GetMapping("/info/{cif}")
    public Optional<Usuario> buscarUsuario(@PathVariable Integer cif) {
        return usuarioServicio.buscarPorCif(cif);
    }

    // Todos los usuarios
    @GetMapping("/all")
    public ResponseEntity<List<Usuario>> obtenerTodosLosUsuarios(){
        List<Usuario> usuarios = usuarioServicio.obtenerTodosLosUsuarios();
        return ResponseEntity.ok(usuarios);
    }

}
