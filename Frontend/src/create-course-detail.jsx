import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from './images/logoUAMFD.svg';
import "./create-course-detail.css";

const CreateCourseDetail = ({ onAddCourse }) => {
  const [courseData, setCourseData] = useState({
    name: "",
    description: "",
    duration: "",
    professor: "",
    location: "",
    schedule: "",
    prerequisites: "",
    level: "",
    certification: "",
    capacity: "",
    cost: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes realizar validaciones adicionales si es necesario

    if (onAddCourse) {
      onAddCourse(courseData);
    }

    // Redirigir a la página de cursos
    navigate("/courses");
  };

  return (
    <div className="create-course-page">
      {/* Encabezado */}
      <div className="header-create-course-detail">
        <img src={logo} alt="LogoUAMFD" className="logo-create-course-detail" />
      </div>

      {/* Contenedor del formulario */}
      <div className="form-container">
        <h2>Crear Nuevo Curso</h2>
        <form onSubmit={handleSubmit}>
          <label className="label">
            Nombre del curso:
            <input
              type="text"
              name="name"
              value={courseData.name}
              onChange={handleInputChange}
              className="input"
              required
            />
          </label>
          <label className="label">
            Descripción:
            <textarea
              name="description"
              value={courseData.description}
              onChange={handleInputChange}
              required
              className="textarea"
            />
          </label>
          <label className="label">
            Duración:
            <input
              type="text"
              name="duration"
              value={courseData.duration}
              onChange={handleInputChange}
            />
          </label>
          <label className="label">
            Profesor:
            <input
              type="text"
              name="professor"
              value={courseData.professor}
              onChange={handleInputChange}
            />
          </label>
          <label className="label">
            Lugar:
            <input
              type="text"
              name="location"
              value={courseData.location}
              onChange={handleInputChange}
            />
          </label>
          <label className="label">
            Horario:
            <input
              type="text"
              name="schedule"
              value={courseData.schedule}
              onChange={handleInputChange}
            />
          </label>
          <label className="label">
            Requisitos previos:
            <input
              type="text"
              name="prerequisites"
              value={courseData.prerequisites}
              onChange={handleInputChange}
            />
          </label>
          <label className="label">
            Nivel del curso:
            <input
              type="text"
              name="level"
              value={courseData.level}
              onChange={handleInputChange}
            />
          </label>
          <label className="label">
            Certificación ofrecida:
            <input
              type="text"
              name="certification"
              value={courseData.certification}
              onChange={handleInputChange}
            />
          </label>
          <label className="label">
            Capacidad:
            <input
              type="number"
              name="capacity"
              value={courseData.capacity}
              onChange={handleInputChange}
            />
          </label>
          <label className="label">
            Costo:
            <input
              type="number"
              name="cost"
              value={courseData.cost}
              onChange={handleInputChange}
            />
          </label>
          {/* Botón para crear el curso */}
          <button type="submit">Crear Curso</button>
        </form>
      </div>
    </div>
  );
};

export default CreateCourseDetail;
