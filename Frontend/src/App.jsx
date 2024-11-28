import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./login.jsx";
import Courses from "./admin-courses.jsx";
import CreateCourseDetail from "./create-course-detail.jsx";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [courses, setCourses] = useState([]);

  // Función para manejar el inicio de sesión
  const handleLogin = (credentials) => {
    // Aquí puedes agregar la lógica de autenticación real (por ejemplo, llamar a una API)
    // Por ahora, simularemos una autenticación exitosa
    console.log("Credenciales recibidas:", credentials);
    setIsAuthenticated(true);
  };

  // Función para agregar un nuevo curso
  const addCourse = (course) => {
    const courseToAdd = {
      id: courses.length > 0 ? courses[courses.length - 1].id + 1 : 1,
      ...course,
    };
    setCourses([...courses, courseToAdd]);
  };

  return (
    <Router>
      <Routes>
        {/* Ruta de Inicio de Sesión */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/courses" />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />

        {/* Ruta de Cursos Disponibles */}
        <Route
          path="/courses"
          element={
            isAuthenticated ? (
              <Courses courses={courses} />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* Ruta de Creación de Cursos */}
        <Route
          path="/crear-curso"
          element={
            isAuthenticated ? (
              <CreateCourseDetail onAddCourse={addCourse} />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* Ruta por Defecto (404) */}
        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? "/courses" : "/"} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
