package com.example.demo.Controllers;

import com.example.demo.Repository.Graficos.GraficoDTO;
import com.example.demo.Services.Graficos.GraficosServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/graphs")
public class GraficosController {

    @Autowired
    private GraficosServicio graficosServicio;

    @GetMapping("/cursos-mas-tomados")
    public ResponseEntity<List<GraficoDTO>> obtenerCursosMasTomados() {
        List<GraficoDTO> datos = graficosServicio.obtenerCursosMasTomados();
        return ResponseEntity.ok(datos);
    }

    @GetMapping("/profesores-mas-cursos")
    public ResponseEntity<List<GraficoDTO>> obtenerProfesoresConMasCursos() {
        List<GraficoDTO> datos = graficosServicio.obtenerProfesoresConMasCursos();
        return ResponseEntity.ok(datos);
    }
}
