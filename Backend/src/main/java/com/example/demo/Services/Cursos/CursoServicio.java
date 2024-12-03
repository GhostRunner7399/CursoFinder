package com.example.demo.Services.Cursos;

import com.example.demo.Repository.Cursos.Cursos;
import com.example.demo.Repository.Cursos.CursosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CursoServicio {

    @Autowired
    private CursosRepository cursosRepository;

    /**
     * Crear o actualizar un curso.
     *
     * @param curso Objeto del curso a guardar.
     * @return Curso guardado o actualizado.
     */
    public Cursos guardarCurso(Cursos curso) {
        return cursosRepository.save(curso);
    }

    /**
     * Obtener todos los cursos disponibles.
     *
     * @return Lista de cursos.
     */
    public List<Cursos> obtenerTodosLosCursos() {
        return cursosRepository.findAll();
    }

    /**
     * Buscar un curso por su ID.
     *
     * @param id Identificador del curso.
     * @return Curso si existe, de lo contrario un Optional vacío.
     */
    public Optional<Cursos> obtenerCursoPorId(Long id) {
        return cursosRepository.findById(id);
    }


    public void eliminarCurso(String codigocurso) {
        // Busca el curso por el código proporcionado
        Optional<Cursos> cursoOptional = cursosRepository.findByCodigocurso(codigocurso);

        if (cursoOptional.isPresent()) {
            // Si el curso existe, se elimina
            cursosRepository.delete(cursoOptional.get());
            System.out.println("Curso con código " + codigocurso + " eliminado correctamente.");
        } else {
            // Maneja el caso en que el curso no existe
            throw new RuntimeException("El curso con código " + codigocurso + " no fue encontrado.");
        }
    }

}
