package edu.uam.backend.cursos.Curso.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalTime;

@Data
@Entity
@Table(name = "HorarioCurso")
public class HorarioCurso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idHorariocurso;

    @Column
    private String aula;

    @Column
    @Enumerated(EnumType.STRING)
    private DiaSemana diaSemana;

    @Column
    private LocalTime horaInicio;

    @Column
    private LocalTime horaFin;

}
