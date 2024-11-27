import React, { useState } from "react";
import "./courses.css";
import logo from "./images/logoUAMFD.svg";
import settingsIcon from './images/settings.svg';
import menuIcon from './images/menu.svg';

function Courses() {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({ name: "", description: "" });
  const [showForm, setShowForm] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const addCourse = () => {
    if (newCourse.name && newCourse.description) {
      const courseToAdd = {
        id: courses.length > 0 ? courses[courses.length - 1].id + 1 : 1,
        name: newCourse.name,
        description: newCourse.description,
      };
      setCourses([...courses, courseToAdd]);
      setNewCourse({ name: "", description: "" });
      setShowForm(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCourse({ ...newCourse, [name]: value });
    };

    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };

  return (
    <div className="courses-page">
    {/* Línea blanca vertical */}
    <div className="white-lineL"></div>
    <div className="white-lineR"></div>

    <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-content">
          <img src={settingsIcon} alt="Configuración" className="settings-icon" />
        </div>
      </div>

    <div className="header">
      <div className="white-lineH"></div>
      {/* Ícono del menú para abrir la sidebar */}
      <img
        src={menuIcon}
        alt="Menú"
        className="menu-icon"
        onClick={toggleSidebar}
      />
      <img src={logo} alt="LogoUAMFD" className="logo" />
    </div>

      {/* Contenido principal */}
      <div className="courses-container">
        <div className="courses-header">
          <h1>Cursos Disponibles</h1>
        </div>

        {showForm && (
          <div className="course-form">
            <h2>Añadir Curso</h2>
            <label>
              <span>Curso:</span>
              <input
                type="text"
                name="name"
                placeholder="Nombre del nuevo curso"
                value={newCourse.name}
                onChange={handleChange}
              />
            </label>
            <label>
              <span>Descripción:</span>
              <textarea
                name="description"
                placeholder="Descripción del nuevo curso"
                value={newCourse.description}
                onChange={handleChange}
              />
            </label>
            <button className="submit-button" onClick={addCourse}>
              Agregar Curso
            </button>
          </div>
        )}

        <button
          className="add-button"
          onClick={() => {
            setShowForm(!showForm);
            if (!showForm) setNewCourse({ name: "", description: "" });
          }}
        >
          +
        </button>

        <div className="courses-list">
          {courses.length === 0 && !showForm && (
            <h2 className="no-courses-message">No hay cursos disponibles</h2>
          )}
          {courses.map((course) => (
            <div key={course.id} className="course-card">
              <h3 className="course-name">{course.name}</h3>
              <p className="course-description">{course.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Courses;
