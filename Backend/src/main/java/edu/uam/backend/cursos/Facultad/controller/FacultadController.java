package edu.uam.backend.cursos.Facultad.controller;


import edu.uam.backend.cursos.Facultad.model.Facultad;
import edu.uam.backend.cursos.Facultad.service.FacultadServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/faculty")

public class FacultadController {


    @Autowired
    private FacultadServicio facultadServicio;


    @PostMapping("/create")
    public ResponseEntity<Facultad> CrearFacultad(@RequestBody Facultad facultad) {
        Facultad facultadguardada = facultadServicio.save(facultad);
        return ResponseEntity.ok(facultadguardada);
    }

    @GetMapping("/{idfacultad}")
    public ResponseEntity<Facultad> ObtenerFacultadPorID(@PathVariable long idfacultad) {
        Facultad facultadbuscar = facultadServicio.findById(idfacultad);
        return ResponseEntity.ok(facultadbuscar);
    }


    @DeleteMapping("/delete/{idfacultad}")
    public ResponseEntity<String> eliminarFacultad(@PathVariable long idfacultad) {
        try {
            facultadServicio.delete(idfacultad);
            return ResponseEntity.ok("Facultad eliminada correctamente.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    @GetMapping("/all")
    public ResponseEntity<List<Facultad>> AllFacultad() {
        List<Facultad> facultads = facultadServicio.findAll();
        return ResponseEntity.ok(facultads);
    }

    /*
    @PatchMapping("/Update")
    public ResponseEntity<Facultad> ActualizarFacultad(@RequestBody Facultad facultad) {

    }
     */
}
