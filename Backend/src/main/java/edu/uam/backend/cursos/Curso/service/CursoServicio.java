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
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;


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
        
            Usuario docente = usuarioRepository.findById(request.getIdDocente())
                    .orElseThrow(() -> new IllegalArgumentException("Docente no encontrado"));
        
        
            CursoDetalle detalle = new CursoDetalle();
            detalle.setDescripcion(request.getDescripcion());
            detalle.setRequisitos(request.getRequisitos());
            detalle.setLugar(request.getLugar());
            detalle.setCertificacion(request.isCertificacion());
            detalle.setCapacidadMaxima(request.getCapacidadMaxima());
            detalle.setDocente(docente);
        
            // Mapear lista de horarios (si estás usando HorarioCurso como objeto)
            if (request.getHorarios() != null && !request.getHorarios().isEmpty()) {
                detalle.setHorarios(request.getHorarios()); // ← Asegúrate que sean objetos HorarioCurso
            }
        
            Cursos curso = new Cursos();
            curso.setCodigocurso(request.getCodigocurso());
            curso.setNombre(request.getNombre());
            curso.setActive(request.isActive());
            curso.setCursoDetalle(detalle);
            curso.setFacultad(facultad);
        
            return cursosRepository.save(curso);
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

    /**
     * Retorna una lista ordenada y filtrada de los cursos basado en los parametros
     *
     * @param name      aqui filtras por el nombre del curso
     * @param code      filtra por codigo de curso, opcionalmente quiero meter un case insensitive
     * @param active    Filtra por estado activo
     * @param facultyId Filtra por id facultad
     * @param orderBy   Campo para sortear es decir, definir la query
     * @param direction DIreccion (asc, desc en SQL)
     * @return           RETORNA. PUNTO FINAL. CAPSISHI, TODO, ESO HACE EL CODIGO ESTUPIDO CEROTE MIERDA
     * DIOS MIO ESTOY QUEDANDO LOCO AJAJAJ
     */
    public List<Cursos> getFilteredAndSortedCourses(
            String name,
            String code,
            Boolean active,
            Long facultyId,
            String orderBy,
            String direction) {

        List<String> allowedFields = List.of("nombre", "codigocurso", "active");

        if (!allowedFields.contains(orderBy)) {
            throw new IllegalArgumentException("Invalid sorting field: " + orderBy);
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
                predicates.add(cb.equal(root.get("facultad").get("id"), facultyId));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };

        return cursosRepository.findAll(spec, sort);
    }
}


