import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./login.jsx";
import Courses from "./admin-courses.jsx";
import CreateCourseDetail from "./create-course-detail.jsx";
import Details from "./show-course-detail.jsx";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);

  const handleLogin = (credentials) => {
    // validate the credentials against an API
    console.log("Credenciales recibidas:", credentials);
    if (credentials.username && credentials.password) { 
      setIsAuthenticated(true);
      // Simulate fetching user data based on the credentials
      setUser({
        name: "Halley Isela Castro Calero", // Simulated
        email: `${credentials.username}@pelu.edu.ni` 
      });
    }
  };

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
        {/* Inicio de Sesión */}
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
        {/*pass info de los credentials al component to retrieve the data connected a las credentials */}
        <Route
          path="/courses"
          element={
            isAuthenticated ? 
            <Courses courses={courses} user={user} setCourses={setCourses} />
            : <Navigate to="/" />}
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

        {/* Ruta de Detalles del Curso */}
        <Route
          path="/curso/:id"
          element={
            isAuthenticated ? (
              <Details courses={courses} />
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
