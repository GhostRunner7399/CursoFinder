package com.example.demo.Repository.Usuario.Class;

import com.example.demo.Repository.Matricula.Class.Matricula;
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
    private Long idUsusario;

    @Column(nullable = false)
    private String primernombre;

    private String segundonombre;

    @Column(nullable = false)
    private String primerapellido;

    private String segundoapellido;

    @Column(unique = true, nullable = false)
    private Integer cif;

    @Column(nullable = false)
    private String contraseña;

    @Column(nullable = false)
    private String email;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "idRol", nullable = false)
    private CatalogoRoles rol;

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Matricula> matriculas;
}
