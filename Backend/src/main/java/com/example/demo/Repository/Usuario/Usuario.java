package com.example.demo.Repository.Usuario;

import com.example.demo.Repository.Matricula.Matricula;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "usuarios")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;

    @Column(unique = true, nullable = false)
    private Integer cif;

    @Column(nullable = false)
    private String contraseña;


    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private boolean adminrole;

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Matricula> matriculas;

}
