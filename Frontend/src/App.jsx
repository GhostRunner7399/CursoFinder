import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./login.jsx";
import AdminCourses from "./usuario-administrador/admin-courses.jsx";
import DocenteCourses from "./usuario-docente/docente-courses.jsx";
import CreateCourseDetail from "./usuario-administrador/create-course-detail.jsx";
import Details from "./usuario-administrador/show-course-detail.jsx"; 
import Detailsdocente from "./usuario-docente/docente-course-detail.jsx";
import { authenticateUser, fetchUserByCif } from "./services/User-Op.jsx";
import { fetchCourses, createCourse } from "./services/Courses-Op.jsx";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);

  // Al montar el componente, obtener cursos desde el backend
  useEffect(() => {
    const loadCourses = async () => {
      try {
        const cursos = await fetchCourses();
        setCourses(cursos);
      } catch (error) {
        console.error("Error al obtener los cursos:", error);
      }
    };
    loadCourses();
  }, []);

  const handleLogin = async (credentials) => {
    try {
      const success = await authenticateUser(credentials);
      if (success) {
        const cif = credentials.cif;
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
          setIsAuthenticated(true);
          setUser(null);
          return true;
        }
      } else {
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

  const handleAddCourse = async (courseData) => {
    try {
      // Ajustar los datos del curso antes de crearlo
      const finalCourseData = {
        ...courseData,
        disponibilidad: courseData.capacidad,
        Active: true,
      };
      const cursoCreado = await createCourse(finalCourseData);
      setCourses([...courses, cursoCreado]);
    } catch (error) {
      console.error("Error al crear el curso:", error);
    }
  };

  const ProtectedRoute = ({ role, children }) => {
    if (!isAuthenticated) return <Navigate to="/" />;
    if (role && user.role !== role) return <Navigate to="/courses" />;
    return children;
  };

  // Persistencia de sesión con localStorage
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
              <CreateCourseDetail onAddCourse={handleAddCourse} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/curso/:id"
          element={
            <ProtectedRoute role="administrador">
              <Details courses={courses} setCourses={setCourses} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/curso-docente/:id"
          element={
            <ProtectedRoute role="docente">
              <Detailsdocente courses={courses} setCourses={setCourses} />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to={isAuthenticated ? "/courses" : "/"} />} />
      </Routes>
    </Router>
  );
}

export default App;
