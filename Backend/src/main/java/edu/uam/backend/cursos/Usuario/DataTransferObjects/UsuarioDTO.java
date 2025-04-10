package edu.uam.backend.cursos.Usuario.DataTransferObjects;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class UsuarioDTO {
    private String primernombre;
    private String segundonombre;
    private String primerapellido;
    private String segundoapellido;
    private Integer cif;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String contraseña;

    private String email;
    private Long idRol;
}
