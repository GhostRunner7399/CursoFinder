package edu.uam.backend.cursos.Curso.model;

import edu.uam.backend.cursos.Usuario.model.Usuario;
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

    @ManyToOne
    @JoinColumn(name = "id_docente", nullable = false)
    private Usuario docente;


    @Column(nullable = false)
    private String lugar;

    @Column(nullable = false)
    private boolean certificacion;

    @Column(nullable = false)
    private Integer capacidadMaxima;

    @Column
    private Integer disponibilidad;

}