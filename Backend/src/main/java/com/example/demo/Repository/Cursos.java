package com.example.demo.Repository;


import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "cursos")
public class Cursos {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String codigocurso;

    @Column(unique = true, nullable = false)
    private String nombre;

    @Column( nullable = false)
    private String descripcion;

    @Column(nullable = false)
    private String intensidad;

    @Column(nullable = false)
    private String requisitos;

    @Column(nullable = false)
    private String docente;

    @Column(nullable = false)
    private String horario;

    @Column(nullable = false)
    private String lugar;

    @Column(nullable = false)
    private String certificacion;

    @Column(nullable = false)
    private String capacidadydisponibilidad;

}





