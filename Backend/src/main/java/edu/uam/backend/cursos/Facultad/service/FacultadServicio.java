package edu.uam.backend.cursos.Facultad.service;

import edu.uam.backend.cursos.Facultad.model.Facultad;
import edu.uam.backend.cursos.Facultad.repository.FacultadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FacultadServicio {

    @Autowired
    private FacultadRepository facultadRepository;

    //Encontrar todas las facultades disponibles
    public List<Facultad> findAll() {
        return facultadRepository.findAll();
    }

    //Encontrar facultad por id
    public Facultad findById(Long id) {
        return facultadRepository.findById(id).orElse(null);
    }
    //crear facultad
    public Facultad save(Facultad facultad) {
        if (facultadRepository.existsByNombreIgnoreCase(facultad.getNombre())) {
            throw new IllegalArgumentException("Ya existe una facultad con ese nombre.");
        }
        return facultadRepository.save(facultad);
    }


    public Facultad update(Facultad facultad) {
        return facultadRepository.save(facultad);
    }
    public void delete(Long id) {
        if (!facultadRepository.existsById(id)) {
            throw new IllegalArgumentException("Facultad no encontrada.");
        }
        facultadRepository.deleteById(id);
    }



}
