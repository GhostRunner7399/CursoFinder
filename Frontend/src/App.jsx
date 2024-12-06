import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./login.jsx";
import AdminCourses from "./admin-courses.jsx";
import DocenteCourses from "./usuario-docente/docente-courses.jsx";
import CreateCourseDetail from "./create-course-detail.jsx";
import Details from "./show-course-detail.jsx";
import Detailsdocente from "./usuario-docente/docente-course-detail.jsx";
import { authenticateUser, fetchUserByCif } from "./services/User-Op.jsx";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([
    //CONECTAR con la API
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

  // Maneja el login real con el backend
  const handleLogin = async (credentials) => {
    try {
      // Autenticar usuario
      const success = await authenticateUser(credentials);
      if (success) {
        const cif = credentials.cif;
        // Obtener información del usuario autenticado
        const userInfo = await fetchUserByCif(cif);
        if (userInfo) {
          setIsAuthenticated(true);
          setUser({
            name: userInfo.nombre,
            email: userInfo.email,
            cif: userInfo.cif,
            role: userInfo.adminrole ? "administrador" : "docente",
          });
          return true;
        } else {
          // Autenticación exitosa pero no se encontró el usuario
          setIsAuthenticated(true);
          setUser(null);
          return true;
        }
      } else {
        // Autenticación fallida
        setIsAuthenticated(false);
        setUser(null);
        return false;
      }
    } catch (error) {
      console.error("Error durante el login:", error);
      setIsAuthenticated(false);
      setUser(null);
      return false;
    }
  };

  // reemplar con una llamada a la API)
  const addCourse = (course) => {
    const newCourse = {
      id: courses.length > 0 ? courses[courses.length - 1].id + 1 : 1, // Generar un ID único
      ...course,
    };
    setCourses([...courses, newCourse]);
  };

  // Componente para proteger rutas
  const ProtectedRoute = ({ role, children }) => {
    if (!isAuthenticated) return <Navigate to="/" />;
    if (role && user.role !== role) return <Navigate to="/courses" />;
    return children;
  };

  // persistencia de la session usando localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedAuth = localStorage.getItem("isAuthenticated");
    if (storedAuth && storedUser) {
      setIsAuthenticated(JSON.parse(storedAuth));
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
    localStorage.setItem("user", JSON.stringify(user));
  }, [isAuthenticated, user]);

  return (
    <Router>
      <Routes>
        {/* Ruta de login */}
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

        {/* Ruta para listar cursos */}
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

        {/* Ruta para crear un curso */}
        <Route
          path="/crear-curso"
          element={
            <ProtectedRoute role="administrador">
              <CreateCourseDetail onAddCourse={addCourse} />
            </ProtectedRoute>
          }
        />

        {/* Ruta para detalles de cursos del administrador */}
        <Route
          path="/curso/:id"
          element={
            <ProtectedRoute role="administrador">
              <Details courses={courses} setCourses={setCourses} />
            </ProtectedRoute>
          }
        />

        {/* Ruta para detalles de cursos del docente */}
        <Route
          path="/curso-docente/:id"
          element={
            <ProtectedRoute role="docente">
              <Detailsdocente courses={courses} setCourses={setCourses} />
            </ProtectedRoute>
          }
        />

        {/* Ruta por defecto */}
        <Route path="*" element={<Navigate to={isAuthenticated ? "/courses" : "/"} />} />
      </Routes>
    </Router>
  );
}

export default App;
