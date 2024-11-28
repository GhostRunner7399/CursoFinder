package com.example.demo.Repository.Matricula;

import com.example.demo.Repository.Cursos.Cursos;
import com.example.demo.Repository.Usuario.Usuario;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "matriculas")
public class Matricula {

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

