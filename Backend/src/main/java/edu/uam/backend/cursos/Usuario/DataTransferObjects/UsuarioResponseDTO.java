package edu.uam.backend.cursos.Usuario.DataTransferObjects;

import edu.uam.backend.cursos.Usuario.model.Usuario;
import lombok.Data;

@Data
public class UsuarioResponseDTO {
    private String nombreCompleto;
    private String email;
    private Integer cif;
    private Long idRol; // ← Nuevo campo

    public UsuarioResponseDTO(Usuario u) {
        this.nombreCompleto = u.getPrimernombre() + " " +
                (u.getSegundonombre() != null ? u.getSegundonombre() + " " : "") +
                u.getPrimerapellido() +
                (u.getSegundoapellido() != null ? " " + u.getSegundoapellido() : "");
        this.email = u.getEmail();
        this.cif = u.getCif();
        this.idRol = u.getRol().getIdRol(); // ← Aquí tomamos el rol del usuario
    }
}
