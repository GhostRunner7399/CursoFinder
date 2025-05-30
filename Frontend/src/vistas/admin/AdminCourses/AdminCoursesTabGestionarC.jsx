import React, { useEffect, useState } from "react";
import "./AdminCoursesTabGestionarC.css";
import { FaChevronDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Modal from "../../../components/Modal/Modal.jsx";

function AdminCoursesTabGestionarC({ courses }) {
  const [faculties, setFaculties] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeStatus, setActiveStatus] = useState("activos");
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [showFacultyDropdown, setShowFacultyDropdown] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [docentes, setDocentes] = useState([]);
  const [cursoSeleccionado, setCursoSeleccionado] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedCourseIds, setSelectedCourseIds] = useState([]);
  const [selectedFacultyIds, setSelectedFacultyIds] = useState([]);
  const [reloadFlag, setReloadFlag] = useState(false);



  const [nuevoCurso, setNuevoCurso] = useState({
    codigocurso: "",
    nombre: "",
    active: true,
    idFacultad: "",   
    idDocente: "",    
    descripcion: "",
    requisitos: "",
    certificacion: false,
    lugar: "",
    capacidadMaxima: 0,
    horarios: []
  });

  const [cursoEditado, setCursoEditado] = useState({
    codigocurso: "",
    nombre: "",
    active: true,
    idFacultad: "",
    idDocente: "",
    descripcion: "",
    requisitos: "",
    certificacion: false,
    lugar: "",
    capacidadMaxima: 0,
    horarios: []
  });

  const [nuevoFacultad, setNuevoFacultad] = useState({
    nombre: "",
    descripcion: ""
  });

  const navigate = useNavigate();

  const handleCourseClick = (course) => {
    navigate(`/curso-docente/${course.codigocurso}`);
  };

  const agregarHorario = () => {
    setNuevoCurso({ ...nuevoCurso, horarios: [...nuevoCurso.horarios, { diaSemana: "", horaInicio: "", horaFin: "", aula: "" }] });
  };

  const eliminarHorario = (index) => {
    const nuevosHorarios = [...nuevoCurso.horarios];
    nuevosHorarios.splice(index, 1);
    setNuevoCurso({ ...nuevoCurso, horarios: nuevosHorarios });
  };

  const handleHorarioChange = (index, field, value) => {
    const nuevosHorarios = [...nuevoCurso.horarios];
    nuevosHorarios[index][field] = value;
    setNuevoCurso({ ...nuevoCurso, horarios: nuevosHorarios });
  };

  const prepararCursoParaEnvio = (curso) => {
    return {
      ...curso,
      docente: { id: curso.idDocente }, // aquí enviamos el objeto docente correcto
      facultad: { idfacultad: curso.idFacultad }, // igual para facultad
      horarios: curso.horarios
    };
  };  

  const handleSubmitCreate = async (e) => {
    e.preventDefault();
    try {
      const cursoParaEnviar = prepararCursoParaEnvio(nuevoCurso); // 🚀
      const res = await fetch("http://localhost:8080/api/courses/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cursoParaEnviar)
      });
      if (res.ok) {
        alert("Curso creado exitosamente");
        closeModal();
        setReloadFlag(prev => !prev);
      } else {
        const error = await res.text();
        alert("Error al crear curso: " + error);
      }
    } catch (error) {
      console.error("Error en crear curso:", error);
    }
  };

  const handleSubmitEditCourse = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        nombre: cursoEditado.nombre,
        active: cursoEditado.active,
        cursoDetalle: {
          descripcion: cursoEditado.descripcion,
          requisitos: cursoEditado.requisitos,
          idDocente: cursoEditado.idDocente,
          lugar: cursoEditado.lugar,
          certificacion: cursoEditado.certificacion,
          capacidadMaxima: cursoEditado.capacidadMaxima,
          horarios: cursoEditado.horarios // 🔥 Agregado
        }
      };
  
      const res = await fetch(`http://localhost:8080/api/courses/update/${cursoEditado.codigocurso}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
  
      if (res.ok) {
        alert("Curso actualizado exitosamente");
        closeModal();
        setReloadFlag(prev => !prev);
      } else {
        const error = await res.text();
        alert("Error al actualizar curso: " + error);
      }
    } catch (error) {
      console.error("Error al actualizar curso:", error);
    }
  };
  

  const handleSubmitCreateFaculty = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/api/faculty/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: nuevoFacultad.nombre,
          descripcion: nuevoFacultad.descripcion,
          activo: true
        })
      });
      if (res.ok) {
        alert("Facultad creada exitosamente");
        closeModal();
        setReloadFlag(prev => !prev);
      } else {
        const error = await res.text();
        alert("Error al crear facultad: " + error);
      }
    } catch (error) {
      console.error("Error en crear facultad:", error);
    }
  };  
  
  useEffect(() => {
    fetch("http://localhost:8080/api/faculty/all")
      .then((res) => res.json())
      .then((data) => setFaculties(data))
      .catch((err) => console.error("Error al cargar facultades:", err));
  
    fetch("http://localhost:8080/api/users/docentes")
      .then((res) => res.json())
      .then((data) => {
        const docentesConNombreCompleto = data.map(doc => {
          const primerNombre = doc.primernombre ?? "";
          const segundoNombre = doc.segundonombre ?? "";
          const primerApellido = doc.primerapellido ?? "";
          const segundoApellido = doc.segundoapellido ?? "";
          return {
            ...doc,
            nombreCompleto: `${primerNombre} ${segundoNombre} ${primerApellido} ${segundoApellido}`.replace(/\s+/g, ' ').trim()
          };
        });
        setDocentes(docentesConNombreCompleto);
      })
      .catch((err) => console.error("Error al cargar docentes:", err));
  }, [reloadFlag]);
  

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

  const toggleCourseSelection = (codigocurso) => {
    if (!codigocurso) return;
    setSelectedCourseIds(prevSelected =>
      prevSelected.includes(codigocurso)
        ? prevSelected.filter(code => code !== codigocurso)
        : [...prevSelected, codigocurso]
    );
  };  

  const toggleFacultySelection = (idfacultad) => {
    if (!idfacultad) return;
    setSelectedFacultyIds(prevSelected =>
      prevSelected.includes(idfacultad)
        ? prevSelected.filter(id => id !== idfacultad)
        : [...prevSelected, idfacultad]
    );
  };  

  const openCreateModal = () => {
    setModalType(activeStatus === "facultades" ? "crearFacultad" : "crearCurso");
    if (activeStatus === "facultades") {
      setNuevoFacultad({ nombre: "", descripcion: "" });
    } else {
      setNuevoCurso({
        codigocurso: "",
        nombre: "",
        active: true,
        idFacultad: "",
        idDocente: "",
        descripcion: "",
        requisitos: "",
        certificacion: false,
        lugar: "",
        capacidadMaxima: 0,
        horarios: []
      });
    }
    setIsModalOpen(true);
  };
  
  const openEditModal = () => {
    if (selectedCourseIds.length === 0) {
      alert("Selecciona un curso para editar.");
      return;
    }
  
    if (selectedCourseIds.length > 1) {
      alert("Solo puedes editar un curso a la vez. Por favor selecciona solo uno.");
      return;
    }
  
    const cursoSeleccionado = filteredCourses.find(course => selectedCourseIds.includes(course.codigocurso));
    if (!cursoSeleccionado) {
      alert("Curso no encontrado.");
      return;
    }
  
    setCursoEditado({
      codigocurso: cursoSeleccionado.codigocurso,
      nombre: cursoSeleccionado.nombre,
      active: cursoSeleccionado.active,
      idFacultad: cursoSeleccionado.facultad?.idFacultad || "",
      idDocente: cursoSeleccionado.cursoDetalle?.docente?.idUsuario || "",
      descripcion: cursoSeleccionado.cursoDetalle?.descripcion || "",
      requisitos: cursoSeleccionado.cursoDetalle?.requisitos || "",
      certificacion: cursoSeleccionado.cursoDetalle?.certificacion || false,
      lugar: cursoSeleccionado.cursoDetalle?.lugar || "",
      capacidadMaxima: cursoSeleccionado.cursoDetalle?.capacidadMaxima || 0,
      horarios: cursoSeleccionado.cursoDetalle?.horarios || []
    });
  
    setModalType("editarCurso");
    setIsModalOpen(true);
  };  

  const openDeleteModal = () => {
    if (activeStatus === "facultades") {
      if (selectedFacultyIds.length === 0) {
        alert("Selecciona al menos una facultad para eliminar.");
        return;
      }
    } else {
      if (selectedCourseIds.length === 0) {
        alert("Selecciona al menos un curso para eliminar.");
        return;
      }
    }
    setModalType(activeStatus === "facultades" ? "eliminarFacultad" : "eliminarCurso");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    try {
      setIsDeleting(true); 
  
      for (const codigocurso of selectedCourseIds) {
        await fetch(`http://localhost:8080/api/courses/${codigocurso}`, {
          method: "DELETE",
        });
      }
      alert("Curso(s) eliminado(s) exitosamente.");
      closeModal();
      setReloadFlag(prev => !prev);
    } catch (error) {
      console.error("Error al eliminar curso(s):", error);
      alert("Hubo un error eliminando los cursos.");
    } finally {
      setIsDeleting(false); 
    }
  };   

  const handleConfirmDeleteFaculty = async () => {
    try {
      setIsDeleting(true); 
    
      for (const idfacultad of selectedFacultyIds) {
        await fetch(`http://localhost:8080/api/faculty/delete/${idfacultad}`, {
          method: "DELETE",
        });
      }
      alert("Facultad(es) eliminada(s) exitosamente.");
      closeModal();
      setReloadFlag(prev => !prev);
    } catch (error) {
      console.error("Error al eliminar facultad(es):", error);
      alert("Hubo un error eliminando las facultades.");
    } finally {
      setIsDeleting(false); 
    }
  };
  

  return (
    <div className="gestionar-cursos-tab">
      <div className="gestionar-cursos-sidebar">
        <div className="estado-filtros">
          <p className={`estado-item ${activeStatus === "activos" ? "active" : ""}`} onClick={() => setActiveStatus("activos")}>Activos</p>
          <p className={`estado-item ${activeStatus === "inactivos" ? "active" : ""}`} onClick={() => setActiveStatus("inactivos")}>Inactivos</p>
          <p className={`estado-item ${activeStatus === "facultades" ? "active" : ""}`} onClick={() => setActiveStatus("facultades")}>Facultades</p>

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
                  <p className="reset-faculty" onClick={handleResetFaculty}>Mostrar todos</p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="botones-acciones">
          <button className="btn-editar" onClick={openEditModal}>Editar {activeStatus === "facultades" ? "Facultad" : "Curso"}</button>
          <button className="btn-eliminar" onClick={openDeleteModal}>Eliminar {activeStatus === "facultades" ? "Facultad" : "Curso"}</button>
          <button className="btn-crear" onClick={openCreateModal}>Crear {activeStatus === "facultades" ? "Facultad" : "Curso"}</button>
        </div>
      </div>

      <div className="gestionar-cursos-main">
        <div className="header-gestionar">
          <h2>{activeStatus === "facultades" ? "Facultades disponibles" : "Cursos"}</h2>
          <input type="text" placeholder="Buscar por nombre" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>

        <div className="cursos-listado">
          {activeStatus === "facultades" ? (
            faculties.length === 0 ? (
              <p className="no-courses-message">No hay facultades disponibles</p>
            ) : (
              faculties.map((faculty) => (
                <div key={faculty.idfacultad || faculty.nombre} className="curso-item">
                  <input
                    type="checkbox"
                    checked={selectedFacultyIds.includes(faculty.idFacultad)}
                    onChange={() => toggleFacultySelection(faculty.idFacultad)}
                  />
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
                <div key={course.idcurso || course.codigocurso || course.nombre} className="curso-item">
                  <input
                    type="checkbox"
                    checked={selectedCourseIds.includes(course.codigocurso)}
                    onChange={() => toggleCourseSelection(course.codigocurso)}
                  />
                  <div className="curso-info">
                    <p><strong>Nombre:</strong> {course.nombre}</p>
                    <p><strong>Docente:</strong> {course.cursoDetalle?.docente ? `${course.cursoDetalle.docente.primernombre} ${course.cursoDetalle.docente.segundonombre} ${course.cursoDetalle.docente.primerapellido} ${course.cursoDetalle.docente.segundoapellido}`.replace(/\s+/g, ' ').trim() : "Sin asignar"}</p>
                    <p><strong>Facultad:</strong> {course.facultad?.nombre || "Sin Facultad"}</p>
                  </div>
                  <button className="btn-ver-detalles" onClick={() => handleCourseClick(course)}>
                    Ver detalles
                  </button>
                </div>
              ))
            )
          )}
        </div>
      </div>

      <Modal key={modalType} isOpen={isModalOpen} onClose={closeModal}>
        {modalType === "crearCurso" && (
          <div className="formulario-curso">
            <h2>Crear Curso</h2>
            <form onSubmit={handleSubmitCreate} className="form-grid">
              {/* Campos principales */}
              <div className="form-group">
                <label>Nombre del Curso</label>
                <input type="text" value={nuevoCurso.nombre} onChange={(e) => setNuevoCurso({ ...nuevoCurso, nombre: e.target.value })} required />
              </div>

              <div className="form-group">
                <label>Código del Curso</label>
                <input type="text" value={nuevoCurso.codigocurso} onChange={(e) => setNuevoCurso({ ...nuevoCurso, codigocurso: e.target.value })} required />
              </div>

              <div className="form-group">
                <label>Descripción</label>
                <textarea value={nuevoCurso.descripcion} onChange={(e) => setNuevoCurso({ ...nuevoCurso, descripcion: e.target.value })} required />
              </div>

              <div className="form-group">
                <label>Requisitos</label>
                <textarea value={nuevoCurso.requisitos} onChange={(e) => setNuevoCurso({ ...nuevoCurso, requisitos: e.target.value })} />
              </div>

              <div className="form-group">
                <label>Lugar</label>
                <input type="text" value={nuevoCurso.lugar} onChange={(e) => setNuevoCurso({ ...nuevoCurso, lugar: e.target.value })} required />
              </div>

              <div className="form-group">
                <label>Capacidad Máxima</label>
                <input type="number" value={nuevoCurso.capacidadMaxima} onChange={(e) => setNuevoCurso({ ...nuevoCurso, capacidadMaxima: parseInt(e.target.value) })} required />
              </div>

              {/* Horarios dinámicos */}
              <div className="form-group horarios">
                <label>Horarios</label>
                <div className="horarios-list">
                  {cursoEditado.horarios.length > 0 ? (
                    cursoEditado.horarios.map((horario, index) => (
                      <div key={index} className="horario-item">
                        <select
                          value={horario.diaSemana}
                          onChange={(e) => {
                            const nuevosHorarios = [...cursoEditado.horarios];
                            nuevosHorarios[index].diaSemana = e.target.value;
                            setCursoEditado({ ...cursoEditado, horarios: nuevosHorarios });
                          }}
                          required
                        >
                          <option value="">Seleccione un día</option>
                          <option value="LUNES">LUNES</option>
                          <option value="MARTES">MARTES</option>
                          <option value="MIERCOLES">MIERCOLES</option>
                          <option value="JUEVES">JUEVES</option>
                          <option value="VIERNES">VIERNES</option>
                          <option value="SABADO">SABADO</option>
                          <option value="DOMINGO">DOMINGO</option>
                        </select>

                        <input
                          type="time"
                          value={horario.horaInicio}
                          onChange={(e) => {
                            const nuevosHorarios = [...cursoEditado.horarios];
                            nuevosHorarios[index].horaInicio = e.target.value;
                            setCursoEditado({ ...cursoEditado, horarios: nuevosHorarios });
                          }}
                          required
                        />

                        <input
                          type="time"
                          value={horario.horaFin}
                          onChange={(e) => {
                            const nuevosHorarios = [...cursoEditado.horarios];
                            nuevosHorarios[index].horaFin = e.target.value;
                            setCursoEditado({ ...cursoEditado, horarios: nuevosHorarios });
                          }}
                          required
                        />

                        <input
                          type="text"
                          placeholder="Aula"
                          value={horario.aula}
                          onChange={(e) => {
                            const nuevosHorarios = [...cursoEditado.horarios];
                            nuevosHorarios[index].aula = e.target.value;
                            setCursoEditado({ ...cursoEditado, horarios: nuevosHorarios });
                          }}
                          required
                        />
                        
                        {/* Botón para eliminar un horario en edición */}
                        <button
                          type="button"
                          className="btn-agregar-horario"
                          onClick={() => {
                            const nuevosHorarios = [...cursoEditado.horarios];
                            nuevosHorarios.splice(index, 1);
                            setCursoEditado({ ...cursoEditado, horarios: nuevosHorarios });
                          }}
                        >
                          X
                        </button>
                      </div>
                    ))
                  ) : (
                    <p style={{ marginTop: "10px" }}>No hay horarios asignados. Agregue uno.</p>
                  )}
                </div>

                {/* Botón para agregar nuevo horario */}
                <button
                  type="button"
                  className="btn-agregar-horario"
                  onClick={() =>
                    setCursoEditado({
                      ...cursoEditado,
                      horarios: [...cursoEditado.horarios, { diaSemana: "", horaInicio: "", horaFin: "", aula: "" }]
                    })
                  }
                >
                  + Agregar Horario
                </button>
              </div>

              {/* Certificacion */}
              <div className="form-group">
                <label>Certificación</label>
                <select
                  value={nuevoCurso.certificacion ? "si" : "no"}
                  onChange={(e) => setNuevoCurso({ ...nuevoCurso, certificacion: e.target.value === "si" })}
                  required
                >
                  <option value="si">Sí</option>
                  <option value="no">No</option>
                </select>
              </div>

              {/* Facultad */}
              <div className="form-group">
                <label>Facultad</label>
                <select
                  value={nuevoCurso.idFacultad}
                  onChange={(e) => setNuevoCurso({ ...nuevoCurso, idFacultad: e.target.value ? Number(e.target.value) : "" })}
                  required
                >
                  <option value="">Seleccione una Facultad</option>
                  {faculties.map((fac) => (
                    <option key={`facultad-${fac.idFacultad}`} value={fac.idFacultad}>
                      {fac.nombre}
                    </option>
                  ))}
                </select>
              </div>




              {/* Docente */}
              <div className="form-group">
                <label>Docente</label>
                <select
                  value={nuevoCurso.idDocente}
                  onChange={(e) => setNuevoCurso({ ...nuevoCurso, idDocente: e.target.value ? Number(e.target.value) : "" })}
                  required
                >
                  <option value="">Seleccione un Docente</option>
                  {docentes.map((doc) => (
                    <option key={`docente-${doc.id}`} value={doc.id}>
                      {doc.nombreCompleto}
                    </option>
                  ))}
                </select>
              </div>


              {/* Estado */}
              <div className="form-group">
                <label>Estado</label>
                <select value={nuevoCurso.active ? "activo" : "inactivo"} onChange={(e) => setNuevoCurso({ ...nuevoCurso, active: e.target.value === "activo" })}>
                  <option value="activo">Activo</option>
                  <option value="inactivo">Inactivo</option>
                </select>
              </div>

              {/* Botones */}
              <div className="form-buttons">
                <button type="button" className="btn-secondary" onClick={closeModal}>Cancelar</button>
                <button type="submit" className="btn-primary">Guardar Curso</button>
              </div>
            </form>
          </div>
        )}

        {modalType === "editarCurso" && (
          <div className="formulario-curso">
            <h2>Editar Curso</h2>
            <form onSubmit={handleSubmitEditCourse} className="form-grid">
              {/* Campos editables del curso */}

              <div className="form-group">
                <label>Código del Curso</label>
                <input
                  type="text"
                  value={cursoEditado.codigocurso}
                  disabled
                  readOnly
                  style={{ backgroundColor: "#e0e0e0" }}
                />
              </div>

              <div className="form-group">
                <label>Nombre del Curso</label>
                <input
                  type="text"
                  value={cursoEditado.nombre}
                  onChange={(e) => setCursoEditado({ ...cursoEditado, nombre: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Descripción</label>
                <textarea
                  value={cursoEditado.descripcion}
                  onChange={(e) => setCursoEditado({ ...cursoEditado, descripcion: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Requisitos</label>
                <textarea
                  value={cursoEditado.requisitos}
                  onChange={(e) => setCursoEditado({ ...cursoEditado, requisitos: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Lugar</label>
                <input
                  type="text"
                  value={cursoEditado.lugar}
                  onChange={(e) => setCursoEditado({ ...cursoEditado, lugar: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Capacidad Máxima</label>
                <input
                  type="number"
                  value={cursoEditado.capacidadMaxima}
                  onChange={(e) => setCursoEditado({ ...cursoEditado, capacidadMaxima: parseInt(e.target.value) })}
                  required
                />
              </div>

              {/* Facultad (Edicion)*/}
              <div className="form-group">
                <label>Facultad</label>
                <select
                  value={cursoEditado.idFacultad}
                  onChange={(e) => setCursoEditado({ ...cursoEditado, idFacultad: Number(e.target.value) })}
                  required
                >
                  <option value="">Seleccione una Facultad</option>
                  {faculties.map((fac) => (
                    <option key={`facultad-${fac.idFacultad}`} value={fac.idFacultad}>
                      {fac.nombre}
                    </option>
                  ))}
                </select>
              </div>

              {/* Horarios dinámicos (Editar) */}
              <div className="form-group horarios">
                <label>Horarios</label>
                <div className="horarios-list">
                  {cursoEditado.horarios.map((horario, index) => (
                    <div key={index} className="horario-item">
                      <select
                        value={horario.diaSemana}
                        onChange={(e) => {
                          const nuevosHorarios = [...cursoEditado.horarios];
                          nuevosHorarios[index].diaSemana = e.target.value;
                          setCursoEditado({ ...cursoEditado, horarios: nuevosHorarios });
                        }}
                        required
                      >
                        <option value="">Seleccione un día</option>
                        <option value="LUNES">LUNES</option>
                        <option value="MARTES">MARTES</option>
                        <option value="MIERCOLES">MIERCOLES</option>
                        <option value="JUEVES">JUEVES</option>
                        <option value="VIERNES">VIERNES</option>
                        <option value="SABADO">SABADO</option>
                        <option value="DOMINGO">DOMINGO</option>
                      </select>
                      <input
                        type="time"
                        value={horario.horaInicio}
                        onChange={(e) => {
                          const nuevosHorarios = [...cursoEditado.horarios];
                          nuevosHorarios[index].horaInicio = e.target.value;
                          setCursoEditado({ ...cursoEditado, horarios: nuevosHorarios });
                        }}
                        required
                      />
                      <input
                        type="time"
                        value={horario.horaFin}
                        onChange={(e) => {
                          const nuevosHorarios = [...cursoEditado.horarios];
                          nuevosHorarios[index].horaFin = e.target.value;
                          setCursoEditado({ ...cursoEditado, horarios: nuevosHorarios });
                        }}
                        required
                      />
                      <input
                        type="text"
                        placeholder="Aula"
                        value={horario.aula}
                        onChange={(e) => {
                          const nuevosHorarios = [...cursoEditado.horarios];
                          nuevosHorarios[index].aula = e.target.value;
                          setCursoEditado({ ...cursoEditado, horarios: nuevosHorarios });
                        }}
                        required
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="form-group">
                <label>Docente</label>
                <select
                  value={cursoEditado.idDocente}
                  onChange={(e) => setCursoEditado({ ...cursoEditado, idDocente: Number(e.target.value) })}
                  required
                >
                  <option value="">Seleccione un Docente</option>
                  {docentes.map((doc) => (
                    <option key={`docente-${doc.id}`} value={doc.id}>
                      {doc.nombreCompleto}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Certificación</label>
                <select
                  value={cursoEditado.certificacion ? "si" : "no"}
                  onChange={(e) => setCursoEditado({ ...cursoEditado, certificacion: e.target.value === "si" })}
                  required
                >
                  <option value="si">Sí</option>
                  <option value="no">No</option>
                </select>
              </div>

              <div className="form-group">
                <label>Estado</label>
                <select
                  value={cursoEditado.active ? "activo" : "inactivo"}
                  onChange={(e) => setCursoEditado({ ...cursoEditado, active: e.target.value === "activo" })}
                >
                  <option value="activo">Activo</option>
                  <option value="inactivo">Inactivo</option>
                </select>
              </div>

              <div className="form-buttons">
                <button type="button" className="btn-secondary" onClick={closeModal}>Cancelar</button>
                <button type="submit" className="btn-primary">Actualizar Curso</button>
              </div>
            </form>
          </div>
        )}


        {modalType === "crearFacultad" && (
          <div className="formulario-curso">
            <h2>Crear Facultad</h2>
            <form onSubmit={handleSubmitCreateFaculty} className="form-grid">
              <div className="form-group">
                <label>Nombre de la Facultad</label>
                <input
                  type="text"
                  value={nuevoFacultad.nombre}
                  onChange={(e) => setNuevoFacultad({ ...nuevoFacultad, nombre: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Descripción</label>
                <textarea
                  value={nuevoFacultad.descripcion}
                  onChange={(e) => setNuevoFacultad({ ...nuevoFacultad, descripcion: e.target.value })}
                />
              </div>

              <div className="form-buttons">
                <button type="button" className="btn-secondary" onClick={closeModal}>Cancelar</button>
                <button type="submit" className="btn-primary">Guardar Facultad</button>
              </div>
            </form>
          </div>
        )}

        {modalType === "eliminarCurso" && (
          <div className="formulario-curso">
            {isDeleting ? (
              <p>Eliminando curso(s)...</p>
            ) : (
              <>
                <h2>Confirmar Eliminación</h2>
                <p>¿Estás seguro que quieres eliminar {selectedCourseIds.length} curso(s)?</p>
                <ul style={{ marginTop: '10px', marginBottom: '20px', listStyleType: 'disc', paddingLeft: '20px' }}>
                  {filteredCourses
                    .filter(course => selectedCourseIds.includes(course.codigocurso))
                    .map(course => (
                      <li key={course.codigocurso}>{course.nombre}</li>
                    ))}
                </ul>
                <div className="form-buttons">
                  <button type="button" className="btn-secondary" onClick={closeModal}>Cancelar</button>
                  <button type="button" className="btn-danger" onClick={handleConfirmDelete}>Eliminar</button>
                </div>
              </>
            )}
          </div>
        )}

        {modalType === "eliminarFacultad" && (
          <div className="formulario-curso">
            {isDeleting ? (
              <p>Eliminando facultad(es)...</p>
            ) : (
              <>
                <h2>Confirmar Eliminación</h2>
                <p>¿Estás seguro que quieres eliminar {selectedFacultyIds.length} facultad(es)?</p>
                <ul style={{ marginTop: '10px', marginBottom: '20px', listStyleType: 'disc', paddingLeft: '20px' }}>
                  {faculties
                    .filter(faculty => selectedFacultyIds.includes(faculty.idFacultad))
                    .map(faculty => (
                      <li key={faculty.idFacultad}>{faculty.nombre}</li>
                    ))}
                </ul>
                <div className="form-buttons">
                  <button type="button" className="btn-secondary" onClick={closeModal}>Cancelar</button>
                  <button type="button" className="btn-danger" onClick={handleConfirmDeleteFaculty}>Eliminar</button>
                </div>
              </>
            )}
          </div>
        )}
      </Modal>

    </div>
  );
}

export default AdminCoursesTabGestionarC;
