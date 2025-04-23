package edu.uam.backend.cursos.Usuario.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "CatalogoRoles")
public class CatalogoRoles {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idRol;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, unique = true)
    private Nombrerol nombreRol;

    @Column
    private String descripcion;

}
