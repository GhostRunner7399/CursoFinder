import React, { useEffect, useState } from "react";
import "./AdminCoursesTabGestionarC.css";
import { FaChevronDown } from "react-icons/fa";

function AdminCoursesTabGestionarC({ courses }) {  // recibe cursos del padre

    const [faculties, setFaculties] = useState([]);  // solo aquí haces fetch
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeStatus, setActiveStatus] = useState("activos");
    const [selectedFaculty, setSelectedFaculty] = useState("");
    const [showFacultyDropdown, setShowFacultyDropdown] = useState(false);
  
    useEffect(() => {
      fetch("http://localhost:8080/api/faculty/all")
        .then((res) => res.json())
        .then((data) => {
          console.log("Facultades:", data);
          setFaculties(data);
        })
        .catch((err) => console.error("Error al cargar facultades:", err));
    }, []);

  useEffect(() => {
    if (!Array.isArray(courses)) {
      setFilteredCourses([]);
      return;
    }

    if (activeStatus === "facultades") {
      setFilteredCourses([]);
      return;
    }

    let filtered = [...courses];

    if (activeStatus === "activos") {
      filtered = filtered.filter((course) => course.active === true);
    } else if (activeStatus === "inactivos") {
      filtered = filtered.filter((course) => course.active === false);
    }

    if (selectedFaculty) {
      filtered = filtered.filter((course) => course.facultad?.nombre === selectedFaculty);
    }

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter((course) =>
        course.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredCourses(filtered);
  }, [courses, activeStatus, selectedFaculty, searchTerm]);

  const handleFacultySelect = (facultyName) => {
    setSelectedFaculty(facultyName);
    setShowFacultyDropdown(false);
  };

  const handleResetFaculty = () => {
    setSelectedFaculty("");
    setShowFacultyDropdown(false);
  };

  return (
    <div className="gestionar-cursos-tab">
      <div className="gestionar-cursos-sidebar">
        <div className="estado-filtros">
          <p className={`estado-item ${activeStatus === "activos" ? "active" : ""}`} onClick={() => setActiveStatus("activos")}>
            Activos
          </p>
          <p className={`estado-item ${activeStatus === "inactivos" ? "active" : ""}`} onClick={() => setActiveStatus("inactivos")}>
            Inactivos
          </p>
          <p className={`estado-item ${activeStatus === "facultades" ? "active" : ""}`} onClick={() => setActiveStatus("facultades")}>
            Facultades
          </p>

          {activeStatus !== "facultades" && (
            <div className="faculty-filter-container">
              <button className="faculty-dropdown" onClick={() => setShowFacultyDropdown(!showFacultyDropdown)}>
                {selectedFaculty || "Filtrar Facultad"} <FaChevronDown />
              </button>
              {showFacultyDropdown && (
                <div className="faculty-options">
                  {faculties.map((faculty) => (
                    <p key={faculty.idfacultad} onClick={() => handleFacultySelect(faculty.nombre)}>
                      {faculty.nombre}
                    </p>
                  ))}
                  <p className="reset-faculty" onClick={handleResetFaculty}>
                    Mostrar todos
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="botones-acciones">
          <button className="btn-editar">Editar {activeStatus === "facultades" ? "Facultad" : "Curso"}</button>
          <button className="btn-eliminar">Eliminar {activeStatus === "facultades" ? "Facultad" : "Curso"}</button>
          <button className="btn-crear">Crear {activeStatus === "facultades" ? "Facultad" : "Curso"}</button>
        </div>
      </div>

      <div className="gestionar-cursos-main">
        <div className="header-gestionar">
          <h2>{activeStatus === "facultades" ? "Facultades disponibles" : "Cursos"}</h2>
          <input
            type="text"
            placeholder="Buscar por nombre"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="cursos-listado">
          {activeStatus === "facultades" ? (
            faculties.length === 0 ? (
              <p className="no-courses-message">No hay facultades disponibles</p>
            ) : (
              faculties.map((faculty) => (
                <div key={faculty.idfacultad} className="curso-item">
                  <input type="checkbox" />
                  <div className="curso-info">
                    <p><strong>Nombre Facultad:</strong> {faculty.nombre}</p>
                  </div>
                </div>
              ))
            )
          ) : (
            filteredCourses.length === 0 ? (
              <p className="no-courses-message">No hay cursos encontrados</p>
            ) : (
              filteredCourses.map((course) => (
                <div key={course.idcurso} className="curso-item">
                  <input type="checkbox" />
                  <div className="curso-info">
                    <p><strong>Nombre:</strong> {course.nombre}</p>
                    <p><strong>Docente:</strong> {course.cursoDetalle?.docente?.primernombre || "Sin asignar"}</p>
                    <p><strong>Facultad:</strong> {course.facultad?.nombre || "Sin Facultad"}</p>
                  </div>
                </div>
              ))
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminCoursesTabGestionarC;
