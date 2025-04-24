package edu.uam.backend.cursos.Curso.DataTransferObjects;

import edu.uam.backend.cursos.Curso.model.CursoDetalle;
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
    private CursoDetalle cursoDetalle;

    private List<HorarioCurso> horarios;

}
