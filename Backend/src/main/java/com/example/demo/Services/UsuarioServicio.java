package com.example.demo.Services;

import com.example.demo.Repository.Cursos;
import com.example.demo.Repository.Usuario;
import com.example.demo.Repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioServicio {

    @Autowired
    private UsuarioRepository usuarioRepository;

    //Registrar usuario
    public Usuario registrarUsuario(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    //Buscar usuario
    public Optional<Usuario> buscarPorCif(Integer cif) {
        return usuarioRepository.findByCif(cif);
    }


    //Autenticar usuario
    public boolean autenticarUsuario(Integer cif, String contraseña) {
        return usuarioRepository.findByCifAndContraseña( cif, contraseña).isPresent();
    }

    public List<Usuario> obtenerTodosLosUsuarios() {
        return usuarioRepository.findAll();
    }


}