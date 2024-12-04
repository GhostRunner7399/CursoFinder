import React from "react";
import { useNavigate } from "react-router-dom";
import "./admin-courses.css";
import logo from "./images/logoUAMFD.svg";
import menuIcon from './images/menu.svg';
import UserBox from "./components/user-box";
import trashCan from './images/trash-can.svg';
import Sidebar from "./components/sidebar";

function Courses({ courses, user, setCourses }) {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleCourseClick = (courseId) => {
    navigate(`/curso/${courseId}`);
  };

  const handleDelete = (courseId) => {
    if (window.confirm("¿Está seguro que quiere eliminar este curso?")) {
      setCourses(courses.filter((course) => course.id !== courseId));
    }
  };

  return (
    <div className="courses-page">
      <div className="user-box-container">
        <UserBox user={user} />
      </div>

      <div className="admin-left-side-rectangle"></div>
      <div className="admin-right-side-rectangle"></div>

      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
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

      <div className="courses-container">
        <div className="courses-header">
          <h1>Cursos Disponibles</h1>
        </div>

        <div className="buttons-container">
          {/* agregar un nuevo curso */}
          <button
            className="add-button"
            onClick={() => navigate("/crear-curso")}
          >
            +
          </button>
        </div>

        <div className="courses-list">
          {courses.length === 0 ? (
            <h2 className="no-courses-message">No hay cursos disponibles</h2>
          ) : (
            courses.map((course) => (
              <div key={course.id} className="course-card">
                <h3
                  className="course-name"
                  onClick={() => handleCourseClick(course.id)}
                >
                  {course.name}
                </h3>
                <p className="course-description">{course.description}</p>
                <button className="delete-button" onClick={() => handleDelete(course.id)}>
                  <img src={trashCan} alt="Eliminar" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Courses;
