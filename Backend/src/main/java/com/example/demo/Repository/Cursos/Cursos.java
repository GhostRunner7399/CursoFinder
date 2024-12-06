package com.example.demo.Repository.Cursos;


import com.example.demo.Repository.Matricula.Matricula;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

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
    private Integer capacidad;

    @Column
    private Integer disponibilidad;

    @Column(nullable = false)
    private boolean Active;


    @OneToMany(mappedBy = "curso", cascade = CascadeType.ALL, orphanRemoval = true)

    //LOCO NO BORREN ESTO O JODEMOS TODO AJAJJAJAJ
    //Esto evita que el codigo sea redundante, por ende si lo quitan
    //El codigo va a recursar entre si infinitamente creando un .json infinito njds
    @JsonIgnore
    private List<Matricula> matriculas;

}





