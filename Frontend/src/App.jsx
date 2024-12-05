import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./login.jsx";
import AdminCourses from "./admin-courses.jsx";
import DocenteCourses from "./usuario-docente/docente-courses.jsx";
import CreateCourseDetail from "./create-course-detail.jsx";
import Details from "./show-course-detail.jsx";
import Detailsdocente from "./usuario-docente/docente-course-detail.jsx";
import Sidebar from "./components/sidebar";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [courses, setCourses] = useState([
    {
      id: 1,
      name: "Curso de Java",
      description: "En este curso aprenderás a desarrollar aplicaciones robustas y eficientes utilizando el lenguaje de programación Java. Diseñado para quienes tienen conocimientos básicos en programación, este curso te guiará a través de conceptos clave como la programación orientada a objetos (POO), estructuras de datos, manejo de excepciones, acceso a bases de datos, e introducción al desarrollo de aplicaciones gráficas.",
      weeks: 10,
      courseHours: 40,
      professor: "William Martinez",
      location: "Aula C-204",
      daysOfWeek: "Lunes y Miércoles",
      schedule: "6:00 PM - 8:00 PM",
      prerequisites: "Conocimientos básicos de Java",
      level: "Intermedio",
      certifyingBody: "UAMFD",
      certification: "Certificado en Java",
      capacity: 30,
      availableSpots: 15,
      cost: 150,
    },
  ]);

  const handleLogin = (credentials) => {
    if (credentials.username && credentials.password) {
      setIsAuthenticated(true);
      if (credentials.username === "halley") {
        const adminUser = {
          name: "Halley Isela Castro Calero",
          email: `${credentials.username}@pelu.edu.ni`,
          role: "administrador",
        };
        setUser(adminUser);
        console.log("Usuario autenticado:", adminUser); // Verifica aquí
      } else if (credentials.username === "stacy") {
        const docenteUser = {
          name: "Stacy Nicole Cerda Ruiz",
          email: `${credentials.username}@pelu.edu.ni`,
          role: "docente",
        };
        setUser(docenteUser);
        console.log("Usuario autenticado:", docenteUser); // Verifica aquí
      }
    }
  };

  useEffect(() => {
    if (user) {
      console.log("Usuario actual:", user); // Verifica el usuario aquí
    }
  }, [user]);

  const addCourse = (course) => {
    const newCourse = {
      id: courses.length > 0 ? courses[courses.length - 1].id + 1 : 1,
      ...course,
    };
    setCourses([...courses, newCourse]);
  };

  const ProtectedRoute = ({ role, children }) => {
    if (!isAuthenticated) return <Navigate to="/" />;
    if (role && user.role !== role) return <Navigate to="/courses" />;
    return children;
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      {isAuthenticated && (
        <>
          {console.log("Sidebar abierto:", isSidebarOpen)} {/* Verifica el estado aquí */}
          <Sidebar
            user={user}
            isOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
          />
        </>
      )}
      <div
        style={{
          marginLeft: isSidebarOpen ? "60px" : "0",
          transition: "margin-left 0.5s",
        }}
      >
        <Routes>
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
          <Route
            path="/courses"
            element={
              isAuthenticated ? (
                user.role === "administrador" ? (
                  <AdminCourses courses={courses} user={user} setCourses={setCourses} />
                ) : (
                  <DocenteCourses courses={courses} user={user} setCourses={setCourses} />
                )
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/crear-curso"
            element={
              <ProtectedRoute role="administrador">
                <CreateCourseDetail onAddCourse={addCourse} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/curso/:id"
            element={
              <ProtectedRoute role="administrador">
                <Details courses={courses} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/curso-docente/:id"
            element={
              <ProtectedRoute role="docente">
                <Detailsdocente courses={courses} />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to={isAuthenticated ? "/courses" : "/"} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
