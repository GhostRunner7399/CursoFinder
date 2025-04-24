package edu.uam.backend.cursos.Curso.model;

public enum DiaSemana {
    LUNES("Lunes"),
    MARTES("Martes"),
    MIERCOLES("Miércoles"),
    JUEVES("Jueves"),
    VIERNES("Viernes"),
    SABADO("Sábado"),
    DOMINGO("Domingo");

    private final String label;

    DiaSemana(String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }
}

