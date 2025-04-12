package com.example.demo.Services.Cursos;

import com.example.demo.DataTransferObject.Curso.CursoDetalleUpdateDTO;
import com.example.demo.Repository.Cursos.Class.CursoDetalle;
import com.example.demo.Repository.Cursos.Class.Cursos;
import com.example.demo.Repository.Cursos.CursosRepository;
import com.example.demo.DataTransferObject.Curso.CursoUpdateDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CursoServicio {

    @Autowired
    private CursosRepository cursosRepository;

    public Cursos guardarCurso(Cursos curso) {
        return cursosRepository.save(curso);
    }

    public List<Cursos> obtenerTodosLosCursos() {
        return cursosRepository.findAll();
    }

    public Optional<Cursos> obtenerCursoPorId(Long id) {
        return cursosRepository.findById(id);
    }

    public void eliminarCurso(String codigocurso) {
        Optional<Cursos> cursoOptional = cursosRepository.findByCodigocurso(codigocurso);
        if (cursoOptional.isPresent()) {
            cursosRepository.delete(cursoOptional.get());
        } else {
            throw new RuntimeException("El curso con código " + codigocurso + " no fue encontrado.");
        }
    }

    public Cursos actualizarCursoPorCodigo(String codigocurso, Cursos curso) {
        Optional<Cursos> cursoOptional = cursosRepository.findByCodigocurso(codigocurso);
        if (!cursoOptional.isPresent()) {
            throw new RuntimeException("Curso no encontrado con código: " + codigocurso);
        }

        Cursos cursoExistente = cursoOptional.get();
        cursoExistente.setNombre(curso.getNombre());
        cursoExistente.setActive(curso.isActive());

        if (curso.getCursoDetalle() != null) {
            CursoDetalle detalleNuevo = curso.getCursoDetalle();
            CursoDetalle detalleExistente = cursoExistente.getCursoDetalle();

            detalleExistente.setDescripcion(detalleNuevo.getDescripcion());
            detalleExistente.setRequisitos(detalleNuevo.getRequisitos());
            detalleExistente.setDocente(detalleNuevo.getDocente());
            detalleExistente.setLugar(detalleNuevo.getLugar());
            detalleExistente.setCertificacion(detalleNuevo.isCertificacion());
            detalleExistente.setCapacidadMaxima(detalleNuevo.getCapacidadMaxima());

            detalleExistente.getHorarios().clear();
            detalleExistente.getHorarios().addAll(detalleNuevo.getHorarios());
        }

        return cursosRepository.save(cursoExistente);
    }

    public Cursos actualizarCursoParcialPorCodigo(String codigocurso, CursoUpdateDTO cursoDTO) {
        System.out.println(">>> PATCH invocado para código: " + codigocurso); // ← CONFIRMAMOS

        Optional<Cursos> cursoOptional = cursosRepository.findByCodigocurso(codigocurso);
        if (!cursoOptional.isPresent()) {
            System.out.println(">>> Curso no encontrado");
            throw new RuntimeException("Curso no encontrado con código: " + codigocurso);
        }

        Cursos curso = cursoOptional.get();

        if (cursoDTO.getNombre() != null) curso.setNombre(cursoDTO.getNombre());
        if (cursoDTO.getActive() != null) curso.setActive(cursoDTO.getActive());

        if (cursoDTO.getCursoDetalle() != null) {
            CursoDetalle detalle = curso.getCursoDetalle();
            CursoDetalleUpdateDTO datos = cursoDTO.getCursoDetalle();

            if (datos.getDescripcion() != null) detalle.setDescripcion(datos.getDescripcion());
            if (datos.getRequisitos() != null) detalle.setRequisitos(datos.getRequisitos());
            if (datos.getDocente() != null) detalle.setDocente(datos.getDocente());
            if (datos.getLugar() != null) detalle.setLugar(datos.getLugar());
            if (datos.getCapacidadMaxima() != null) detalle.setCapacidadMaxima(datos.getCapacidadMaxima());
            if (datos.getCertificacion() != null) detalle.setCertificacion(datos.getCertificacion());
        }

        Cursos actualizado = cursosRepository.save(curso);
        System.out.println(">>> Curso actualizado: " + actualizado.getNombre());

        return actualizado;
    }

    public Optional<Cursos> obtenerCursoPorCodigo(String codigocurso) {
        return cursosRepository.findByCodigocurso(codigocurso);
    }

}
