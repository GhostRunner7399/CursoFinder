package com.example.demo.Services.Graficos;

import com.example.demo.Repository.Graficos.GraficoDTO;
import com.example.demo.Repository.Graficos.GraficosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GraficosServicio {

    @Autowired
    private GraficosRepository graficosRepository;

    public List<GraficoDTO> obtenerCursosMasTomados() {
        return graficosRepository.cursosMasTomados();
    }

    public List<GraficoDTO> obtenerProfesoresConMasCursos() {
        return graficosRepository.profesoresConMasCursos();
    }
}
