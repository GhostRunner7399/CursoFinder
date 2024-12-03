import React from "react";
import { useNavigate } from "react-router-dom";
import "./admin-courses.css";
import logo from "./images/logoUAMFD.svg";
import settingsIcon from './images/settings.svg';
import menuIcon from './images/menu.svg';
import UserBox from "./components/user-box";
import trashCan from './images/trash-can.svg';


function Courses({ courses, user }) {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleCourseClick = (courseId) => {
    navigate(`/curso/${courseId}`);
  };

  //If your courses are fetched from a server, you also need to send a request to delete the course from the backend
  //remember to handle the course deletion when pressing the del button
  const handleDelete = (courseId) => {
    if (window.confirm("Esta seguro que quiere eliminar este curso?")) {
      setCourses(courses.filter((course) => course.Id !== Id));
    }
  };

  return (
    <div className="courses-page">
      <div className="user-box-container">
        <UserBox user={user} />
      </div>
      {/* Líneas blancas verticales edteticas*/}
      <div className="admin-white-lineL"></div>
      <div className="admin-right-side-rectangle"></div>
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-content">
          <img src={settingsIcon} alt="Configuración" className="settings-icon" />
          {/*agregar más elementos a la barra*/}
        </div>
      </div>

      <div className="header-admin-courses">
        <div className="admin-white-lineH"></div>
        <img
          src={menuIcon}
          alt="Menú"
          className="menu-icon"
          onClick={toggleSidebar}
        />
        <img src={logo} alt="LogoUAMFD" className="logo-admin-courses" />
      </div>

      {/* display de cursos*/}
      <div className="courses-container">
        <div className="courses-header">
          <h1>Cursos Disponibles</h1>
        </div>

        <div className="buttons-container">
        {/*para agregar un nuevo curso */}
        <button
          className="add-button"
          onClick={() => navigate("/crear-curso")}
        >
          +
        </button>
        <button className="delete-button" onClick={() => handleDelete(course.id)}>
          <img src={trashCan} alt="Delete" />
        </button>
        </div>
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
