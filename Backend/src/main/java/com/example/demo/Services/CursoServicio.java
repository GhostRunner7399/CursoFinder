package com.example.demo.Services;

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

    /**
     * Eliminar un curso por su ID.
     *
     * @param id Identificador del curso a eliminar.
     */
    public void eliminarCurso(Long id) {
        if (cursosRepository.existsById(id)) {
            cursosRepository.deleteById(id);
        } else {
            throw new IllegalArgumentException("El curso con el ID especificado no existe.");
        }
    }
}
