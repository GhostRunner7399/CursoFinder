package edu.uam.backend.cursos.Curso.DataTransferObjects;

import edu.uam.backend.cursos.Curso.model.HorarioCurso;
import java.util.List;
import lombok.Data;

@Data
public class CursoResponseDTO {
    private Long id;
    private String nombre;
    private String codigocurso;
    private boolean active;

    private String descripcion;
    private String requisitos;
    private boolean certificacion;
    private String lugar;
    private Integer capacidadMaxima;
    private Integer disponibilidad;

    private String docenteNombreCompleto;
    private Long docenteId;

    private String facultadNombre;
    private Long facultadId;
    private List<HorarioCurso> horarios;


}
