package com.example.demo.Repository.Cursos.Class;

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
    private String diaSemana;

    @Column
    private LocalTime horaInicio;

    @Column
    private LocalTime horaFin;

}
