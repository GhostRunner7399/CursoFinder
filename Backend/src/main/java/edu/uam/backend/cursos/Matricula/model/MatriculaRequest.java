package edu.uam.backend.cursos.Matricula.model;

import jakarta.annotation.Nullable;
import lombok.Getter;
import lombok.Setter;
import org.antlr.v4.runtime.misc.NotNull;

@Setter
@Getter
public class MatriculaRequest {
    private Integer cif;
    private String codigocurso;
}
