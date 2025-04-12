package com.example.demo.Controllers;
import com.example.demo.Repository.Usuario.Usuario;
import com.example.demo.Services.Usuario.UsuarioServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UsuarioController {

    @Autowired
    private UsuarioServicio usuarioServicio;

    // Registrar usuario
    @PostMapping("/action/register")
    public ResponseEntity<Usuario> registrarUsuario(@RequestBody Usuario usuario) {
        // Puedes agregar validaciones aquí
        Usuario usuarioRegistrado = usuarioServicio.registrarUsuario(usuario);
        return ResponseEntity.ok(usuarioRegistrado);
    }

    // Autenticar usuario
    @PostMapping("/auth")
    public ResponseEntity<Boolean> autenticarUsuario(@RequestBody Usuario usuario) {
        boolean esAutenticado = usuarioServicio.autenticarUsuario(usuario.getCif(), usuario.getContraseña());
        return ResponseEntity.ok(esAutenticado);
    }

    // Buscar usuario por CIF
    @GetMapping("/info/{cif}")
    public ResponseEntity<Usuario> buscarUsuario(@PathVariable String cif) {
        Optional<Usuario> usuarioOpt = usuarioServicio.buscarPorCif(cif);
        if (usuarioOpt.isPresent()) {
            Usuario usuario = usuarioOpt.get();
            // Excluir la contraseña en la respuesta por seguridad
            usuario.setContraseña(null);
            return ResponseEntity.ok(usuario);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Obtener todos los usuarios
    @GetMapping("/all")
    public ResponseEntity<List<Usuario>> obtenerTodosLosUsuarios(){
        List<Usuario> usuarios = usuarioServicio.obtenerTodosLosUsuarios();
        return ResponseEntity.ok(usuarios);
    }
}
