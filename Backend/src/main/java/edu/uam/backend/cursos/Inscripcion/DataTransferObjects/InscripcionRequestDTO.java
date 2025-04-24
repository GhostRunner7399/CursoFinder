package edu.uam.backend.cursos.Inscripcion.DataTransferObjects;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class InscripcionRequestDTO {
    private Integer cif;
    private String codigocurso;
}
