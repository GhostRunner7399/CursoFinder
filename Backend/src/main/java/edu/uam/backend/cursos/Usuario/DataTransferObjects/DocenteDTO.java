package edu.uam.backend.cursos.Usuario.DataTransferObjects;

public class DocenteDTO {
    private Long id;    
    private Integer cif;
    private String primernombre;
    private String segundonombre;
    private String primerapellido;
    private String segundoapellido;
    private String telefono;

    // constructor
    public DocenteDTO(Long id, Integer cif, String primernombre, String segundonombre, String primerapellido, String segundoapellido, String telefono) {
        this.id = id;
        this.cif = cif;
        this.primernombre = primernombre;
        this.segundonombre = segundonombre;
        this.primerapellido = primerapellido;
        this.segundoapellido = segundoapellido;
        this.telefono = telefono;
    }

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Integer getCif() { return cif; }
    public void setCif(Integer cif) { this.cif = cif; }

    public String getPrimernombre() { return primernombre; }
    public void setPrimernombre(String primernombre) { this.primernombre = primernombre; }

    public String getSegundonombre() { return segundonombre; }
    public void setSegundonombre(String segundonombre) { this.segundonombre = segundonombre; }

    public String getPrimerapellido() { return primerapellido; }
    public void setPrimerapellido(String primerapellido) { this.primerapellido = primerapellido; }

    public String getSegundoapellido() { return segundoapellido; }
    public void setSegundoapellido(String segundoapellido) { this.segundoapellido = segundoapellido; }

    public String getTelefono() { return telefono; }
    public void setTelefono(String telefono) { this.telefono = telefono; }
}
