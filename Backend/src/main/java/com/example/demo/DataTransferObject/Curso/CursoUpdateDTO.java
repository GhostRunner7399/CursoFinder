package com.example.demo.DataTransferObject.Curso;

import lombok.Data;

@Data
public class CursoUpdateDTO {

    private String nombre;
    private Boolean active;
    private CursoDetalleUpdateDTO cursoDetalle;

}
