package edu.uam.backend.cursos.Usuario.model;

public enum Nombrerol {
        ROOT,
        ADMIN,
        DOCENTE,
        ESTUDIANTE;

        public boolean equalsIgnoreCase(String docente) {
                return this.toString().equalsIgnoreCase(docente);
        }

        public String toUpperCase() {
                return this.toString().toUpperCase();
        }
}
