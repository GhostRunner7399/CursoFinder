package edu.uam.backend.cursos.Curso.DataTransferObjects;

import lombok.Data;

@Data
public class CursoDetalleUpdateDTO {

    private String descripcion;
    private String requisitos;
    private Long idDocente;
    private String lugar;
    private Boolean certificacion;
    private Integer capacidadMaxima;

}
