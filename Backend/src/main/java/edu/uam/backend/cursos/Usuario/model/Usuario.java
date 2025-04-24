package edu.uam.backend.cursos.Usuario.model;

import edu.uam.backend.cursos.Matricula.model.Matricula;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name = "usuarios")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idUsuario;

    @Column(nullable = false)
    private String primernombre;

    private String segundonombre;

    @Column(nullable = false)
    private String primerapellido;

    private String segundoapellido;

    @Column(unique = true, nullable = false)
    private Integer cif;

    @Column(nullable = false)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String contraseña;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private boolean activo = true;  // ← nuevo campo

    @Column(nullable = false)
    private LocalDateTime fechaRegistro = LocalDateTime.now();  // ← nuevo campo

    @Column
    private String telefono;

    @ManyToOne
    @JoinColumn(name = "idRol", nullable = false)
    private CatalogoRoles rol;


    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Matricula> matriculas;
}
