package edu.uam.backend.cursos.Usuario.DataTransferObjects;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import lombok.Data;

@Data
public class UsuarioRequestDTO {
    private String primernombre;
    private String segundonombre;
    private String primerapellido;
    private String segundoapellido;
    private String telefono;
    private Integer cif;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String contraseña;

    @Column(nullable = false)
    private String email;

    private Long idRol;
}