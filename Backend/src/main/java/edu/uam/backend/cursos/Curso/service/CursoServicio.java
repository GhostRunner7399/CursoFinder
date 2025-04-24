package edu.uam.backend.cursos.Curso.service;

import edu.uam.backend.cursos.Curso.DataTransferObjects.CursoDetalleUpdateDTO;
import edu.uam.backend.cursos.Curso.DataTransferObjects.CursoRequestDTO;
import edu.uam.backend.cursos.Curso.DataTransferObjects.CursoUpdateDTO;
import edu.uam.backend.cursos.Curso.repository.CursosRepository;
import edu.uam.backend.cursos.Curso.model.CursoDetalle;
import edu.uam.backend.cursos.Curso.model.Cursos;
import edu.uam.backend.cursos.Facultad.model.Facultad;
import edu.uam.backend.cursos.Facultad.repository.FacultadRepository;
import edu.uam.backend.cursos.Usuario.model.Usuario;
import edu.uam.backend.cursos.Usuario.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CursoServicio {

    @Autowired
    private CursosRepository cursosRepository;
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private FacultadRepository facultadRepository;


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

    public Cursos actualizarCursoParcialPorCodigo(String codigocurso, CursoUpdateDTO cursoDTO) {
        System.out.println(">>> PATCH invocado para código: " + codigocurso);

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
            if (datos.getLugar() != null) detalle.setLugar(datos.getLugar());
            if (datos.getCapacidadMaxima() != null) detalle.setCapacidadMaxima(datos.getCapacidadMaxima());
            if (datos.getCertificacion() != null) detalle.setCertificacion(datos.getCertificacion());

            if (datos.getIdDocente() != null) {
                Usuario docente = usuarioRepository.findById(datos.getIdDocente())
                        .orElseThrow(() -> new IllegalArgumentException("Docente no encontrado"));

                if (!docente.getRol().getNombreRol().equalsIgnoreCase("DOCENTE")) {
                    throw new IllegalArgumentException("El usuario no tiene rol de DOCENTE.");
                }

                detalle.setDocente(docente);
            }
        }

        Cursos actualizado = cursosRepository.save(curso);
        System.out.println(">>> Curso actualizado: " + actualizado.getNombre());

        return actualizado;
    }


    public Optional<Cursos> obtenerCursoPorCodigo(String codigocurso) {
        return cursosRepository.findByCodigocurso(codigocurso);
    }


        public CursoServicio(CursosRepository cursosRepository) {
            this.cursosRepository = cursosRepository;
        }

        public Page<Cursos> obtenerCursosPaginados(int page, int size) {
            return cursosRepository.findAll(PageRequest.of(page, size));
        }


    public Cursos crearCursoDesdeDTO(CursoRequestDTO request) {
        Facultad facultad = facultadRepository.findById(request.getIdFacultad())
                .orElseThrow(() -> new IllegalArgumentException("Facultad no encontrada"));

        Usuario docente = usuarioRepository.findById(request.getCursoDetalle().getDocente().getIdUsuario())
                .orElseThrow(() -> new IllegalArgumentException("Docente no encontrado"));

        String rol = docente.getRol().getNombreRol().toUpperCase();
        if (!rol.equals("DOCENTE")) {
            throw new IllegalArgumentException("El usuario con rol '" + rol + "' no puede impartir cursos.");
        }

        CursoDetalle detalle = new CursoDetalle();
        detalle.setDescripcion(request.getCursoDetalle().getDescripcion());
        detalle.setRequisitos(request.getCursoDetalle().getRequisitos());
        detalle.setLugar(request.getCursoDetalle().getLugar());
        detalle.setCertificacion(request.getCursoDetalle().isCertificacion());
        detalle.setCapacidadMaxima(request.getCursoDetalle().getCapacidadMaxima());
        detalle.setHorarios(request.getCursoDetalle().getHorarios());
        detalle.setDocente(docente);

        Cursos curso = new Cursos();
        curso.setCodigocurso(request.getCodigocurso());
        curso.setNombre(request.getNombre());
        curso.setActive(request.isActive());
        curso.setCursoDetalle(detalle);
        curso.setFacultad(facultad);

        return cursosRepository.save(curso);
    }

}
