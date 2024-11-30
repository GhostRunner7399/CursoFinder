import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./show-course-detail.css";
import logo from "./images/logoUAMFD.svg";
import settingsIcon from './images/settings.svg';
import menuIcon from './images/menu.svg';

function Details({courses}) {
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
          <button
            className="button-inscribirse" 
            onClick={() => alert(`Usted se ha inscrito en el curso: ${course.name}`)}
          >
            Inscribirse
          </button>
  
          {/* Detalles del curso */}
          <div className="course-display">
          <p><strong>Descripción:</strong> {course.description}</p>
          <p><strong>Duración:</strong> {course.duration}</p>
          <p><strong>Profesor:</strong> {course.professor}</p>
          <p><strong>Lugar:</strong> {course.location}</p>
          <p><strong>Horario:</strong> {course.schedule}</p>
          <p><strong>Requisitos Previos:</strong> {course.prerequisites}</p>
          <p><strong>Nivel:</strong> {course.level}</p>
          <p><strong>Certificación Ofrecida:</strong> {course.certification}</p>
          <p><strong>Capacidad:</strong> {course.capacity}</p>
          <p><strong>Costo:</strong> ${course.cost}</p>
          </div>
        </div>
      </div>
    );
  }
  
  export default Details;