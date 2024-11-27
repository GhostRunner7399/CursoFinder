import React, { useState } from "react";
import "./courses.css";
import logo from "./images/logoUAM.svg"; 

function Courses() {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({ name: "", description: "" });
  const [showForm, setShowForm] = useState(false); 

  const addCourse = () => {
    if (newCourse.name && newCourse.description) {
      const courseToAdd = {
        id: courses.length + 1,
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

  return (
    <div className="courses-container">
      <div className="header">
        <img src={logo} alt="Logo" className="logo" />
        <h1>Cursos Disponibles</h1>
      </div>
      {/* Formulario para agregar curso */}
      {showForm && (
        <div className="course-form">
          <h2>Añadir Curso</h2>
          <label>
            Curso:
            <input
              type="text"
              name="name"
              placeholder="Nombre del nuevo curso"
              value={newCourse.name}
              onChange={handleChange}
            />
          </label>
          <label>
            Descripción:
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
      {/* Botón para agregar curso */}
      <button className="add-button" onClick={() => setShowForm(!showForm)}>
        +
      </button>
      {/* Mostrar cursos existentes */}
      <div className="courses-list">
        {courses.length === 0 ? (
          <h2>No hay cursos disponibles</h2>
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
  );
}

export default Courses;