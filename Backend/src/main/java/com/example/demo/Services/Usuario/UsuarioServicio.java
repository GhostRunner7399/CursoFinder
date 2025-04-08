package com.example.demo.Services.Usuario;

import com.example.demo.DataTransferObject.Usuario.UsuarioDTO;
import com.example.demo.Repository.Usuario.Class.CatalogoRoles;
import com.example.demo.Repository.Usuario.Class.Usuario;
import com.example.demo.Repository.Usuario.RolRepository;
import com.example.demo.Repository.Usuario.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioServicio {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private RolRepository rolRepository;

    // Registrar usuario desde entidad directa
    public Usuario registrarUsuario(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    // Buscar usuario por CIF
    public Optional<Usuario> buscarPorCif(Integer cif) {
        return usuarioRepository.findByCif(cif);
    }

    // Autenticación simple
    public boolean autenticarUsuario(Integer cif, String contraseña) {
        return usuarioRepository.findByCifAndContraseña(cif, contraseña).isPresent();
    }

    // Obtener todos los usuarios
    public List<Usuario> obtenerTodosLosUsuarios() {
        return usuarioRepository.findAll();
    }

    // Registrar usuario desde DTO
    public Usuario registrarUsuarioDesdeDTO(UsuarioDTO dto) {
        Usuario usuario = new Usuario();
        usuario.setPrimernombre(dto.getPrimernombre());
        usuario.setSegundonombre(dto.getSegundonombre());
        usuario.setPrimerapellido(dto.getPrimerapellido());
        usuario.setSegundoapellido(dto.getSegundoapellido());
        usuario.setCif(dto.getCif());
        usuario.setContraseña(dto.getContraseña());
        usuario.setEmail(dto.getEmail());

        CatalogoRoles rol = rolRepository.findById(dto.getIdRol())
                .orElseThrow(() -> new RuntimeException("Rol con ID " + dto.getIdRol() + " no encontrado"));
        usuario.setRol(rol);

        return usuarioRepository.save(usuario);
    }
}
