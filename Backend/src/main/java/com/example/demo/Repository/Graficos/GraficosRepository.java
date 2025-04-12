package com.example.demo.Repository.Graficos;

import com.example.demo.Repository.Cursos.Cursos;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface GraficosRepository extends CrudRepository<Cursos, Long> {

    @Query("SELECT new com.example.demo.Repository.Graficos.GraficoDTO(c.nombre, COUNT(m)) " +
            "FROM Cursos c " +
            "JOIN c.matriculas m " +
            "GROUP BY c.nombre " +
            "ORDER BY COUNT(m) DESC")
    List<GraficoDTO> cursosMasTomados();

    @Query("SELECT new com.example.demo.Repository.Graficos.GraficoDTO(c.docente, COUNT(c)) " +
            "FROM Cursos c " +
            "GROUP BY c.docente " +
            "ORDER BY COUNT(c) DESC")
    List<GraficoDTO> profesoresConMasCursos();
}
