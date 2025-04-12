package com.example.demo.Repository.Usuario.Class;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "CatalogoRoles")
public class CatalogoRoles {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idRol;

    @Column(nullable = false)
    private String nombreRol;

    @Column
    private String descripcion;

}
