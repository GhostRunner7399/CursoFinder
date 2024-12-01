import React from "react";
import { useNavigate } from "react-router-dom";
import "./admin-courses.css";
import logo from "./images/logoUAMFD.svg";
import settingsIcon from './images/settings.svg';
import menuIcon from './images/menu.svg';
import UserBox from "./components/user-box";


//AGREGAR BOTONES PARA EDITAR O ELIMINAR UN CURSO
function Courses({ courses, user }) {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleCourseClick = (courseId) => {
    navigate(`/curso/${courseId}`);
  };

  return (
    <div className="courses-page">
      <div className="user-box-container">
        <UserBox user={user} />
      </div>
      {/* Líneas blancas verticales */}
      <div className="white-lineL"></div>
      <div className="admin-right-side-rectangle"></div>
      {/* Barra lateral */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-content">
          <img src={settingsIcon} alt="Configuración" className="settings-icon" />
          {/*agregar más elementos a la barra*/}
        </div>
      </div>

      <div className="header-admin-courses">
        <div className="admin-white-lineH"></div>
        {/* Ícono del menú para abrir la sidebar */}
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
              <div
                key={course.id}
                className="course-card"
                onClick={() => handleCourseClick(course.id)}
              >
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
