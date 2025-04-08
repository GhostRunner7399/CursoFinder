package com.example.demo.DataTransferObject.Usuario;

import lombok.Data;

@Data
public class UsuarioDTO {
    private String primernombre;
    private String segundonombre;
    private String primerapellido;
    private String segundoapellido;
    private Integer cif;
    private String contraseña;
    private String email;
    private Long idRol;
}
