package edu.uam.backend.cursos.Facultad.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import edu.uam.backend.cursos.Curso.model.Cursos;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@Table(name = "Facultad")
public class Facultad {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long idFacultad;

    @Column(nullable = false, unique = true)
    String nombre;

    @Column
    String descripcion;

    @Column(nullable = false)
    private boolean activo = true;

    @Column(nullable = false, updatable = false)
    private LocalDateTime fechaRegistro = LocalDateTime.now();

    @OneToMany(mappedBy = "facultad")
    @JsonIgnore
    private List<Cursos> cursos;


}
