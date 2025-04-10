package edu.uam.backend.cursos.Curso.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "CursoDetalle")

public class CursoDetalle {

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "curso_detalle_id")
    private List<HorarioCurso> horarios;


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idDetalle;

    @Column( nullable = false)
    private String descripcion;

    @Column(nullable = false)
    private String requisitos;

    @Column(nullable = false)
    private String docente;

    @Column(nullable = false)
    private String lugar;

    @Column(nullable = false)
    private boolean certificacion;

    @Column(nullable = false)
    private int capacidadMaxima;

}