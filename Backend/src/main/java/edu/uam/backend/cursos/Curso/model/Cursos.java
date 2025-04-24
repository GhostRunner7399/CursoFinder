package edu.uam.backend.cursos.Curso.model;


import edu.uam.backend.cursos.Facultad.model.Facultad;
import edu.uam.backend.cursos.Matricula.model.Matricula;
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


    //Relacion entre las tablas de cursos y detalleCursos
    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn (name = "detalle_curso_id", nullable = false)
    private CursoDetalle cursoDetalle;


    @Column(nullable = false)
    private String codigocurso;

    @Column(unique = true, nullable = false)
    private String nombre;

    @Column(nullable = false)
    private boolean active;


    @OneToMany(mappedBy = "curso", cascade = CascadeType.ALL, orphanRemoval = true)

    //LOCO NO BORREN ESTO O JODEMOS TODO AJAJJAJAJ
    //Esto evita que el codigo sea redundante, por ende si lo quitan
    //El codigo va a recursar entre si infinitamente creando un .json infinito njds
    @JsonIgnore
    private List<Matricula> matriculas;


    @ManyToOne
    @JoinColumn(name = "idFacultad", nullable = false)
    private Facultad facultad;


}




