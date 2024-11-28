import React from "react";
import { useNavigate } from "react-router-dom";
import "./admin-courses.css";
import logo from "./images/logoUAMFD.svg";
import settingsIcon from './images/settings.svg';
import menuIcon from './images/menu.svg';

function Courses({ courses }) {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  // Función para alternar la barra lateral
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="courses-page">
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

      {/* Encabezado */}
      <div className="header-admin-courses">
        <div className="white-lineH"></div>
        {/* Ícono del menú para abrir la barra lateral */}
        <img
          src={menuIcon}
          alt="Menú"
          className="menu-icon"
          onClick={toggleSidebar}
        />
        <img src={logo} alt="LogoUAMFD" className="logo-admin-courses" />
      </div>

      {/* Contenido principal */}
      <div className="courses-container">
        <div className="courses-header">
          <h1>Cursos Disponibles</h1>
        </div>

        {/* Botón para agregar un nuevo curso */}
        <button
          className="add-button"
          onClick={() => navigate("/crear-curso")}
        >
          +
        </button>

        {/* Lista de cursos */}
        <div className="courses-list">
          {courses.length === 0 ? (
            <h2 className="no-courses-message">No hay cursos disponibles</h2>
          ) : (
            courses.map((course) => (
              <div key={course.id} className="course-card">
                <h3 className="course-name">{course.name}</h3>
                <p className="course-description">{course.description}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Courses;
