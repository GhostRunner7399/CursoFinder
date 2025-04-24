package edu.uam.backend.cursos.Inscripcion.model;

import edu.uam.backend.cursos.Curso.model.Cursos;
import edu.uam.backend.cursos.Usuario.model.Usuario;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "matriculas")
public class Inscripcion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;


    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    // Relación con Curso
    @ManyToOne
    @JoinColumn(name = "curso_id", nullable = false)
    private Cursos curso;

    // Fecha de inscripción
    @Column(nullable = false)
    private LocalDateTime fechaInscripcion;

    // Estado de la inscripción
    @Column(nullable = false)
    private boolean activo;

}

