package com.example.demo.Repository;

import jakarta.persistence.*;
import lombok.Data;

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

    private String contraseña;

    //comentario
    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private boolean adminrole;
}
