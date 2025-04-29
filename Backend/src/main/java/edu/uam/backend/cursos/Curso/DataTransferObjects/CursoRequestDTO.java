package edu.uam.backend.cursos.Curso.DataTransferObjects;

import edu.uam.backend.cursos.Curso.model.HorarioCurso;
import lombok.Data;

import java.util.List;

@Data
public class CursoRequestDTO {
    private String codigocurso;
    private String nombre;
    private boolean active;
    private Long idFacultad;
    private Long idDocente;

    // Datos del CursoDetalle directamente incluidos
    private String descripcion;
    private String requisitos;
    private boolean certificacion;
    private String lugar;
    private int capacidadMaxima;
    private int disponibilidad;

    private List<HorarioCurso> horarios;
}
