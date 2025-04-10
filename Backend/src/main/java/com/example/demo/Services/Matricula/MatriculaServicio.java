package com.example.demo.Services.Matricula;

import com.example.demo.Repository.Cursos.Class.Cursos;
import com.example.demo.Repository.Cursos.CursosRepository;
import com.example.demo.Repository.Matricula.Class.Matricula;
import com.example.demo.Repository.Matricula.MatriculaRepository;
import com.example.demo.Repository.Usuario.Class.Usuario;
import com.example.demo.Repository.Usuario.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class MatriculaServicio {

    @Autowired
    MatriculaRepository matriculaRepository;

    @Autowired
    UsuarioRepository usuarioRepository;

    @Autowired
    CursosRepository cursosRepository;

    public Matricula matricularUsuario(Integer cif, String codigocurso) {
        // Verificar si el usuario y el curso existen
        Usuario usuario = usuarioRepository.findByCif(cif)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado."));
        Cursos curso = cursosRepository.findByCodigocurso(codigocurso)
                .orElseThrow(() -> new IllegalArgumentException("Curso no encontrado."));

        if (matriculaRepository.existsByUsuarioAndCurso(usuario, curso)) {
            throw new IllegalArgumentException("El usuario ya está inscrito en este curso.");
        }

            Matricula matricula = new Matricula();
            matricula.setUsuario(usuario);
            matricula.setCurso(curso);
            matricula.setFechaInscripcion(LocalDateTime.now());
            matricula.setActivo(true);
            return matriculaRepository.save(matricula);

    }
    public List<Cursos> obtenerCursosUsuario(Integer cif){
        Usuario usuario = usuarioRepository.findByCif(cif)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado."));

        return matriculaRepository.findByUsuario(usuario)
                .stream()
                .map(Matricula::getCurso)
                .toList();
    }

    public List<Usuario> obtenerParticipantes(String codigocurso) {
        // Verificar si el curso existe por su código
        Cursos curso = cursosRepository.findByCodigocurso(codigocurso)
                .orElseThrow(() -> new IllegalArgumentException("Curso no encontrado."));

        // Obtener las matrículas asociadas al curso y devolver los usuarios
        return matriculaRepository.findByCurso(curso)
                .stream()
                .map(Matricula::getUsuario) // Obtener el usuario de cada matrícula
                .toList();

    }
    public void borrarmatricula(Integer cif, String codigocurso) {
        // Verificar si el usuario y el curso existen
        Usuario usuario = usuarioRepository.findByCif(cif)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado."));
        Cursos curso = cursosRepository.findByCodigocurso(codigocurso)
                .orElseThrow(() -> new IllegalArgumentException("Curso no encontrado."));

        // Buscar la matrícula correspondiente
        Matricula matricula = matriculaRepository.findByUsuarioAndCurso(usuario, curso)
                .orElseThrow(() -> new IllegalArgumentException("La matrícula no existe."));

        // Eliminar la matrícula
        matriculaRepository.delete(matricula);
    }


}
