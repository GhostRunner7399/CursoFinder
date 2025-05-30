package edu.uam.backend.cursos.Usuario.controller;

import edu.uam.backend.cursos.Usuario.DataTransferObjects.DocenteDTO;
import edu.uam.backend.cursos.Usuario.DataTransferObjects.UsuarioDTO;
import edu.uam.backend.cursos.Usuario.DataTransferObjects.UsuarioResponseDTO;
import edu.uam.backend.cursos.Usuario.DataTransferObjects.UsuarioUpdateDTO;
import edu.uam.backend.cursos.Usuario.model.Usuario;
import edu.uam.backend.cursos.Usuario.repository.UsuarioRepository;
import edu.uam.backend.cursos.Usuario.service.UsuarioServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
public class UsuarioController {

    @Autowired
    private UsuarioServicio usuarioServicio;

    @Autowired
    private UsuarioRepository usuarioRepository;


    // Registrar 
    @PostMapping("/action/register")
    public Usuario registrarUsuario(@RequestBody UsuarioDTO usuarioDTO) {
        return usuarioServicio.registrarUsuarioDesdeDTO(usuarioDTO);
    }

    // Autenticar
    @PostMapping("/auth")
    public boolean autenticarUsuario(@RequestBody Usuario usuario) {
        return usuarioServicio.autenticarUsuario(usuario.getCif(), usuario.getContraseña());
    }

    //info por cif
    @GetMapping("/info/{cif}")
    public ResponseEntity<UsuarioResponseDTO> buscarUsuario(@PathVariable Integer cif) {
        return usuarioServicio.buscarPorCif(cif)
                .map(UsuarioResponseDTO::new)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }


    //todos los usuarios
    @GetMapping("/all")
    public ResponseEntity<Page<UsuarioResponseDTO>> obtenerUsuariosPaginados(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Page<Usuario> usuariosPage = usuarioServicio.obtenerUsuariosPaginados(page, size);
        Page<UsuarioResponseDTO> dtoPage = usuariosPage.map(UsuarioResponseDTO::new);
        return ResponseEntity.ok(dtoPage);
    }

    @GetMapping("/docentes")
    public ResponseEntity<List<DocenteDTO>> listarDocentes() {
        List<Usuario> docentes = usuarioRepository.findByRol_IdRol(2L);

        List<DocenteDTO> docentesDTO = docentes.stream()
                .filter(doc -> doc.getIdUsuario() != null) // Solo devolver docentes con ID no nulo
                .map(doc -> new DocenteDTO(
                        doc.getIdUsuario(),
                        doc.getCif(),
                        doc.getPrimernombre(),
                        doc.getSegundonombre(),
                        doc.getPrimerapellido(),
                        doc.getSegundoapellido(),
                        doc.getTelefono()
                ))
                .toList();

        return ResponseEntity.ok(docentesDTO);
    }


    @PatchMapping("/{cif}/estado")
    public ResponseEntity<String> cambiarEstadoUsuario(@PathVariable Integer cif, @RequestParam boolean activo) {
        try {
            usuarioServicio.cambiarEstado(cif, activo);
            String mensaje = activo ? "Usuario activado correctamente." : "Usuario desactivado correctamente.";
            return ResponseEntity.ok(mensaje);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PatchMapping("/{cif}")
    public ResponseEntity<String> actualizarUsuario(@PathVariable Integer cif,
                                                    @RequestBody UsuarioUpdateDTO dto) {
        try {
            usuarioServicio.actualizarParcialmente(cif, dto);
            return ResponseEntity.ok("Usuario actualizado exitosamente.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


}
