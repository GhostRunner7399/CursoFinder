package edu.uam.backend.cursos.Usuario.DataTransferObjects;

import lombok.Data;

@Data
public class UsuarioUpdateDTO {
    private String primernombre;
    private String segundonombre;
    private String primerapellido;
    private String segundoapellido;
    private String email;
    private String telefono;
}
