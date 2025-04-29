import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./login.jsx";
import AdminCourses from "./vistas/admin/AdminCourses/AdminCourses.jsx";
import DocenteCourses from "./vistas/docente/docente-courses.jsx";
import Detailsdocente from "./vistas/docente/detalleCurso/DetalleCursos.jsx";
import MyLearning from "./vistas/docente/MyLearning/MyLearning.jsx";
import MyTeaching from "./vistas/docente/MyTeaching/MyTeaching.jsx";
import Configuration from "./components/Settings/Settings.jsx";
import Profile from "./components/Profile/Profile.jsx";
import { authenticateUser, fetchUserByCif } from "./services/User-Op.jsx";
import { fetchCourses, createCourse } from "./services/Courses-Op.jsx";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);

  // Al montar el componente, obtener cursos desde el backend
  //HERE WHERE YOU FETCH THE COURSES FROM THE DB
  /*
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
  */

  const handleLogin = async (credentials) => {
    try {
      const success = await authenticateUser(credentials);
      if (success) {
        const cif = credentials.cif;
        const userInfo = await fetchUserByCif(cif);
  
        console.log("Usuario recibido completo:", JSON.stringify(userInfo, null, 2));
  
        if (userInfo && userInfo.idRol) {
          const role = userInfo.idRol === 1 ? "administrador" : "docente";
  
          const userObj = {
            name: userInfo.nombreCompleto,
            email: userInfo.email,
            cif: userInfo.cif,
            role: role
          };
  
          setIsAuthenticated(true);
          setUser(userObj);
          return true;
        } else {
          console.warn("Usuario sin rol válido:", userInfo);
          setIsAuthenticated(false);
          setUser(null);
          return false;
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



        <Route path="/curso-docente/:codigocurso" element={
          <ProtectedRoute>
            <Detailsdocente user={user} />
          </ProtectedRoute>
        } />


        <Route
          path="/curso-docente/:codigocurso"
          element={
            <ProtectedRoute>
              <Detailsdocente user={user} />
            </ProtectedRoute>
          }
        />


        <Route
          path="/aprendizaje-docente"
          element={
            <ProtectedRoute>
              <MyLearning user={user} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/practica-docente"
          element={
            <ProtectedRoute>
              <MyTeaching user={user} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Configuration user={user} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/perfil"
          element={
            <ProtectedRoute>
              <Profile user={user} />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to={isAuthenticated ? "/courses" : "/"} />} />
      </Routes>
    </Router>
  );
}

export default App;