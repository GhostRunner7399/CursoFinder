import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from '../../images/logoUAMFD.svg';
import "./create-course-detail.css";

const CreateCourseDetail = ({ onAddCourse }) => {
  const [courseData, setCourseData] = useState({
    codigocurso: "",
    nombre: "",
    descripcion: "",
    intensidad: "",
    requisitos: "",
    docente: "",
    horario: "",
    lugar: "",
    certificacion: "",
    capacidad: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!courseData.codigocurso || !courseData.nombre) {
        setError("Los campos 'Código del Curso' y 'Nombre' son obligatorios.");
        return;
      }

      // Inicializar disponibilidad igual a capacidad y Active en true
      const finalCourseData = {
        ...courseData,
        disponibilidad: courseData.capacidad,
        Active: true
      };

      await onAddCourse(finalCourseData);
      navigate("/courses");
    } catch (err) {
      setError("Error al crear el curso. Inténtalo de nuevo.");
      console.error(err);
    }
  };

  return (
    <div className="create-course-page">
      <div className="header-create-course-detail">
        <img src={logo} alt="LogoUAMFD" className="logo-create-course-detail" />
      </div>
      <div className="form-container">
        <h2>Crear Nuevo Curso</h2>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Información del Curso</legend>
            <label>
              Código del Curso:
              <input
                type="text"
                name="codigocurso"
                value={courseData.codigocurso}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Nombre del Curso:
              <input
                type="text"
                name="nombre"
                value={courseData.nombre}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Descripción:
              <textarea
                name="descripcion"
                value={courseData.descripcion}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Intensidad:
              <input
                type="text"
                name="intensidad"
                value={courseData.intensidad}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Requisitos:
              <input
                type="text"
                name="requisitos"
                value={courseData.requisitos}
                onChange={handleInputChange}
                required
              />
            </label>
          </fieldset>
          <fieldset>
            <legend>Información Operacional</legend>
            <label>
              Docente:
              <input
                type="text"
                name="docente"
                value={courseData.docente}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Horario:
              <input
                type="text"
                name="horario"
                value={courseData.horario}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Lugar:
              <input
                type="text"
                name="lugar"
                value={courseData.lugar}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Certificación:
              <input
                type="text"
                name="certificacion"
                value={courseData.certificacion}
                onChange={handleInputChange}
                required
              />
            </label>
          </fieldset>
          <fieldset>
            <legend>Capacidad</legend>
            <label>
              Capacidad:
              <input
                type="number"
                name="capacidad"
                value={courseData.capacidad}
                onChange={handleInputChange}
                required
              />
            </label>
          </fieldset>
          {error && <p className="create-course-error">{error}</p>}
          <button type="submit">Crear Curso</button>
        </form>
      </div>
    </div>
  );
};

export default CreateCourseDetail;
