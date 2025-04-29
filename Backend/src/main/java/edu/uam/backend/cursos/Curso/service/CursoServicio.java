package edu.uam.backend.cursos.Curso.service;

import edu.uam.backend.cursos.Curso.DataTransferObjects.CursoDetalleUpdateDTO;
import edu.uam.backend.cursos.Curso.DataTransferObjects.CursoRequestDTO;
import edu.uam.backend.cursos.Curso.DataTransferObjects.CursoResponseDTO;
import edu.uam.backend.cursos.Curso.DataTransferObjects.CursoUpdateDTO;
import edu.uam.backend.cursos.Curso.model.CursoDetalle;
import edu.uam.backend.cursos.Curso.model.Cursos;
import edu.uam.backend.cursos.Curso.repository.CursosRepository;
import edu.uam.backend.cursos.Facultad.model.Facultad;
import edu.uam.backend.cursos.Facultad.repository.FacultadRepository;
import edu.uam.backend.cursos.Usuario.model.Usuario;
import edu.uam.backend.cursos.Usuario.repository.UsuarioRepository;
import jakarta.persistence.criteria.Predicate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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

    public CursoServicio(CursosRepository cursosRepository) {
        this.cursosRepository = cursosRepository;
    }

    public Cursos guardarCurso(Cursos curso) {
        return cursosRepository.save(curso);
    }

    public List<Cursos> obtenerTodosLosCursos() {
        return cursosRepository.findAll();
    }

    public Optional<Cursos> obtenerCursoPorId(Long id) {
        return cursosRepository.findById(id);
    }

    public Optional<Cursos> obtenerCursoPorCodigo(String codigocurso) {
        return cursosRepository.findByCodigocurso(codigocurso);
    }

    public void eliminarCurso(String codigocurso) {
        Optional<Cursos> cursoOptional = cursosRepository.findByCodigocurso(codigocurso);
        if (cursoOptional.isPresent()) {
            cursosRepository.delete(cursoOptional.get());
        } else {
            throw new RuntimeException("El curso con código " + codigocurso + " no fue encontrado.");
        }
    }

    public Page<Cursos> obtenerCursosPaginados(int page, int size) {
        return cursosRepository.findAll(PageRequest.of(page, size));
    }

    public Cursos crearCursoDesdeDTO(CursoRequestDTO request) {
        Facultad facultad = facultadRepository.findById(request.getIdFacultad())
                .orElseThrow(() -> new IllegalArgumentException("Facultad no encontrada"));

        Usuario docente = usuarioRepository.findById(request.getIdDocente())
                .orElseThrow(() -> new IllegalArgumentException("Docente no encontrado"));

        if (!docente.getRol().getNombreRol().equalsIgnoreCase("DOCENTE")) {
            throw new IllegalArgumentException("El usuario seleccionado no tiene rol de DOCENTE.");
        }

        CursoDetalle detalle = new CursoDetalle();
        detalle.setDescripcion(request.getDescripcion());
        detalle.setRequisitos(request.getRequisitos());
        detalle.setLugar(request.getLugar());
        detalle.setCertificacion(request.isCertificacion());
        detalle.setCapacidadMaxima(request.getCapacidadMaxima());
        detalle.setDisponibilidad(request.getCapacidadMaxima());
        detalle.setDocente(docente);

        if (request.getHorarios() != null && !request.getHorarios().isEmpty()) {
            detalle.setHorarios(request.getHorarios());
        }

        Cursos curso = new Cursos();
        curso.setCodigocurso(request.getCodigocurso());
        curso.setNombre(request.getNombre());
        curso.setActive(request.isActive());
        curso.setCursoDetalle(detalle);
        curso.setFacultad(facultad);

        return cursosRepository.save(curso);
    }

    public Cursos actualizarCursoParcialPorCodigo(String codigocurso, CursoUpdateDTO cursoDTO) {
        System.out.println(">>> PATCH invocado para código: " + codigocurso);

        Cursos curso = cursosRepository.findByCodigocurso(codigocurso)
                .orElseThrow(() -> new RuntimeException("Curso no encontrado con código: " + codigocurso));

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

    public List<Cursos> obtenerCursosOrdenados(String ordenarPor, String direccion) {
        List<String> camposPermitidos = List.of("nombre", "codigocurso", "active");

        if (!camposPermitidos.contains(ordenarPor)) {
            throw new IllegalArgumentException("Campo de ordenamiento no permitido: " + ordenarPor);
        }

        Sort sort = direccion.equalsIgnoreCase("desc")
                ? Sort.by(Sort.Order.desc(ordenarPor))
                : Sort.by(Sort.Order.asc(ordenarPor));

        return cursosRepository.findAll(sort);
    }

    public CursoResponseDTO convertirACursoResponseDTO(Cursos curso) {
        CursoResponseDTO dto = new CursoResponseDTO();
    
        dto.setId(curso.getId());
        dto.setNombre(curso.getNombre());
        dto.setCodigocurso(curso.getCodigocurso());
        dto.setActive(curso.isActive());
    
        if (curso.getCursoDetalle() != null) {
            dto.setDescripcion(curso.getCursoDetalle().getDescripcion());
            dto.setRequisitos(curso.getCursoDetalle().getRequisitos());
            dto.setLugar(curso.getCursoDetalle().getLugar());
            dto.setCertificacion(curso.getCursoDetalle().isCertificacion());
            dto.setCapacidadMaxima(curso.getCursoDetalle().getCapacidadMaxima());
            dto.setHorarios(curso.getCursoDetalle().getHorarios());
            dto.setDisponibilidad(curso.getCursoDetalle().getDisponibilidad());
    
            if (curso.getCursoDetalle().getDocente() != null) {
                Usuario docente = curso.getCursoDetalle().getDocente();
                dto.setDocenteId(docente.getCif() != null ? docente.getCif().longValue() : null); // 🔥 Convertido Integer → Long
                dto.setDocenteNombreCompleto(String.format("%s %s %s %s",
                    docente.getPrimernombre(),
                    docente.getSegundonombre() != null ? docente.getSegundonombre() : "",
                    docente.getPrimerapellido(),
                    docente.getSegundoapellido() != null ? docente.getSegundoapellido() : ""
                ).replaceAll("\\s+", " ").trim());
            }
        }
    
        if (curso.getFacultad() != null) {
            dto.setFacultadId(curso.getFacultad().getIdFacultad());
            dto.setFacultadNombre(curso.getFacultad().getNombre());
        }
    
        return dto;
    }
    
    public List<Cursos> getFilteredAndSortedCourses(
            String name,
            String code,
            Boolean active,
            Long facultyId,
            String orderBy,
            String direction) {

        List<String> allowedFields = List.of("nombre", "codigocurso", "active");

        if (!allowedFields.contains(orderBy)) {
            throw new IllegalArgumentException("Campo de ordenamiento no permitido: " + orderBy);
        }

        Sort sort = direction.equalsIgnoreCase("desc")
                ? Sort.by(Sort.Order.desc(orderBy))
                : Sort.by(Sort.Order.asc(orderBy));

        Specification<Cursos> spec = (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (name != null && !name.isEmpty()) {
                predicates.add(cb.like(cb.lower(root.get("nombre")), "%" + name.toLowerCase() + "%"));
            }

            if (code != null && !code.isEmpty()) {
                predicates.add(cb.like(cb.lower(root.get("codigocurso")), "%" + code.toLowerCase() + "%"));
            }

            if (active != null) {
                predicates.add(cb.equal(root.get("active"), active));
            }

            if (facultyId != null) {
                predicates.add(cb.equal(root.get("facultad").get("idfacultad"), facultyId));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };

        return cursosRepository.findAll(spec, sort);
    }

    public List<Cursos> obtenerCursosPorDocente(Integer cif) {
        return cursosRepository.findByCursoDetalleDocenteCif(cif);
    }

    
}
