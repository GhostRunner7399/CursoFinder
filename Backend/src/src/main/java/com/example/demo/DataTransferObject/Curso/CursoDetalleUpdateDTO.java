package com.example.demo.DataTransferObject.Curso;

import lombok.Data;

@Data
public class CursoDetalleUpdateDTO {

    private String descripcion;
    private String requisitos;
    private String docente;
    private String lugar;
    private Boolean certificacion;
    private Integer capacidadMaxima;

}
