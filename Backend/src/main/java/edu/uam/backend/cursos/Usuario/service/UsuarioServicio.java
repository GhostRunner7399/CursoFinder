package edu.uam.backend.cursos.Usuario.service;

import edu.uam.backend.cursos.Usuario.DataTransferObjects.UsuarioDTO;
import edu.uam.backend.cursos.Usuario.DataTransferObjects.UsuarioUpdateDTO;
import edu.uam.backend.cursos.Usuario.model.CatalogoRoles;
import edu.uam.backend.cursos.Usuario.model.Usuario;
import edu.uam.backend.cursos.Usuario.repository.RolRepository;
import edu.uam.backend.cursos.Usuario.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
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

    public void cambiarEstado(Integer cif, boolean nuevoEstado) {
        Usuario usuario = usuarioRepository.findByCif(cif)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado con CIF: " + cif));

        usuario.setActivo(nuevoEstado);
        usuarioRepository.save(usuario);
    }

    public void actualizarParcialmente(Integer cif, UsuarioUpdateDTO dto) {
        Usuario usuario = usuarioRepository.findByCif(cif)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado."));

        if (dto.getPrimernombre() != null) usuario.setPrimernombre(dto.getPrimernombre());
        if (dto.getSegundonombre() != null) usuario.setSegundonombre(dto.getSegundonombre());
        if (dto.getPrimerapellido() != null) usuario.setPrimerapellido(dto.getPrimerapellido());
        if (dto.getSegundoapellido() != null) usuario.setSegundoapellido(dto.getSegundoapellido());
        if (dto.getEmail() != null) usuario.setEmail(dto.getEmail());
        if (dto.getTelefono() != null) usuario.setTelefono(dto.getTelefono());

        usuarioRepository.save(usuario);
    }


    public Page<Usuario> obtenerUsuariosPaginados(int page, int size) {
        return usuarioRepository.findAll(PageRequest.of(page, size));
    }

}
