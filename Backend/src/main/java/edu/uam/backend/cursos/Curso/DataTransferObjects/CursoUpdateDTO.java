package edu.uam.backend.cursos.Curso.DataTransferObjects;

import lombok.Data;

@Data
public class CursoUpdateDTO {

    private String nombre;
    private Boolean active;
    private CursoDetalleUpdateDTO cursoDetalle;

}
