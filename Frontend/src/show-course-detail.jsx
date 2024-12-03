import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./show-course-detail.css";
import logo from "./images/logoUAMFD.svg";
import settingsIcon from './images/settings.svg';
import menuIcon from './images/menu.svg';
import editButton from './images/edit.svg';
import trashCan from './images/trash-can.svg';

function Details({ courses }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const courseId = parseInt(id, 10);
  const course = courses.find((c) => c.id === courseId);

  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Si no se encuentra el curso or smth like that
  if (!course) {
    return (
      <div className="course-page">
        <p>Curso no encontrado.</p>
        <button onClick={() => navigate("/courses")}>Volver a Cursos</button>
      </div>
    );
  }
  return (
    <div className="course-page">
      {/* Líneas blancas verticales */}
      <div className="white-lineL"></div>
      <div className="white-lineR"></div>

      {/* Barra lateral */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-content">
          <img src={settingsIcon} alt="Configuración" className="settings-icon" />
          {/* Puedes agregar más elementos a la barra lateral aquí */}
        </div>
      </div>

      {/* header que retrae el nombre del curso seleccionado*/}
      <div className="header-course-detail">
        <div className="white-lineH"></div>
        {/* Ícono del menú para abrir la barra lateral */}
        <img
          src={menuIcon}
          alt="Menú"
          className="menu-icon"
          onClick={toggleSidebar}
        />
        <img src={logo} alt="LogoUAMFD" className="logo-course-detail" />
      </div>

      {/* Contenido principal */}
      <div className="course-container">
        <div className="course-header">
          <h1>{course.name}</h1>
        </div>

        <button className="edit-button" onClick={() => {/* Add action for editing */}}>
          <img src={editButton} alt="Edit" />
        </button>

        {/* Detalles del curso */}
        <div className="course-display">
          <div className="course-detail-section">
            <div className="course-detail-heading">1. Descripción Completa del Curso</div>
            <div className="course-detail-item"><strong>Descripción:</strong> {course.description}</div>
            <div className="course-detail-item"><strong>Duración en semanas:</strong> {course.weeks}</div>
            <div className="course-detail-item"><strong>Total horas del curso:</strong> {course.courseHours}</div>
          </div>
          <div className="course-detail-section">
            <div className="course-detail-heading">2. Logística y Operación</div>
            <div className="course-detail-item"><strong>Profesor:</strong> {course.professor}</div>
            <div className="course-detail-item"><strong>Lugar:</strong> {course.location}</div>
            <div className="course-detail-item"><strong>El curso se impartirá los días:</strong> {course.daysOfWeek}</div>
            <div className="course-detail-item"><strong>Horario:</strong> {course.schedule}</div>
          </div>
          <div className="course-detail-section">
            <div className="course-detail-heading">3. Requisitos</div>
            <div className="course-detail-item"><strong>Requisitos Previos:</strong> {course.prerequisites}</div>
            <div className="course-detail-item"><strong>Nivel:</strong> {course.level}</div>
          </div>
          <div className="course-detail-section">
            <div className="course-detail-heading">4. Certificación</div>
            <div className="course-detail-item"><strong>Cuerpo Certificador:</strong> {course.certifyingBody}</div>
            <div className="course-detail-item"><strong>Certificación:</strong> {course.certification}</div>
          </div>
          <div className="course-detail-section">
            <div className="course-detail-heading">5. Capacidad y Financiamiento</div>
            <div className="course-detail-item"><strong>Capacidad:</strong> {course.capacity}</div>
            <div className="course-detail-item"><strong>Cupos Disponibles:</strong> {course.availableSpots}</div>
            <div className="course-detail-item"><strong>Costo:</strong> ${course.cost}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;