package com.example.demo.Controllers;

import com.example.demo.Repository.Usuario.Usuario;
import com.example.demo.Services.UsuarioServicio;
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
    @PostMapping("/register")
    public Usuario registrarUsuario(@RequestBody Usuario usuario) {
        return usuarioServicio.registrarUsuario(usuario);
    }

    // Autenticar usuario

    @PostMapping("/auth")
    public boolean autenticarUsuario(@RequestBody Usuario usuario) {
        return usuarioServicio.autenticarUsuario(usuario.getCif(), usuario.getContraseña());
    }


    // Buscar usuario por CIF
    @GetMapping("/{cif}")
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
