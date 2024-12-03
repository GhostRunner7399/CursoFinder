import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from './images/logoUAMFD.svg';
import "./create-course-detail.css";

const CreateCourseDetail = ({ onAddCourse }) => {
  const [courseData, setCourseData] = useState({
    name: "",
    description: "",
    weeks: "",
    courseHours: "",
    daysOfWeek: "",
    professor: "",
    location: "",
    schedule: "",
    prerequisites: "",
    level: "",
    certification: "",
    certifyingBody: "",
    capacity: "",
    availableSpots: "",
    cost: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation and adding course logic here
    if (onAddCourse) {
      onAddCourse(courseData);
    }
    // Navigate back to course list
    navigate("/courses");
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
            <legend>Descripción Completa del Curso</legend>
            <label>
              Nombre del curso:
              <input
                type="text"
                name="name"
                value={courseData.name}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Descripción:
              <textarea
                name="description"
                value={courseData.description}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Semanas del curso:
              <input
                type="number"
                name="weeks"
                value={courseData.weeks}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Total de horas del curso:
              <input
                type="number"
                name="courseHours"
                value={courseData.courseHours}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Días de la semana:
              <input
                type="text"
                name="daysOfWeek"
                value={courseData.daysOfWeek}
                onChange={handleInputChange}
              />
            </label>
          </fieldset>
          <fieldset>
            <legend>Información Operacional</legend>
            <label>
              Profesor:
              <input
                type="text"
                name="professor"
                value={courseData.professor}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Lugar:
              <input
                type="text"
                name="location"
                value={courseData.location}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Horario:
              <input
                type="text"
                name="schedule"
                value={courseData.schedule}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Requisitos previos:
              <input
                type="text"
                name="prerequisites"
                value={courseData.prerequisites}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Nivel del curso:
              <select
                name="level"
                value={courseData.level}
                onChange={handleInputChange}>
                <option value="beginner">Principiante</option>
                <option value="intermediate">Intermedio</option>
                <option value="advanced">Avanzado</option>
              </select>
            </label>
          </fieldset>
          <fieldset>
            <legend>Certificación y Capacidad</legend>
            <label>
              Certificación ofrecida:
              <input
                type="text"
                name="certification"
                value={courseData.certification}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Entidad Certificadora:
              <input
                type="text"
                name="certifyingBody"
                value={courseData.certifyingBody}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Capacidad máxima:
              <input
                type="number"
                name="capacity"
                value={courseData.capacity}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Cupos disponibles:
              <input
                type="number"
                name="availableSpots"
                value={courseData.availableSpots}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Costo:
              <input
                type="number"
                name="cost"
                value={courseData.cost}
                onChange={handleInputChange}
              />
            </label>
          </fieldset>
          <button type="submit">Crear Curso</button>
        </form>
      </div>
    </div>
  );
};

export default CreateCourseDetail;
