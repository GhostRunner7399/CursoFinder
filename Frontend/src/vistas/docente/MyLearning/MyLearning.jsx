import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyLearning.css";
import DefaultHeader from "../../../components/def-header/default-header.jsx";
import Sidebar from "../../../components/sidebar/sidebar.jsx";
import Highlight from "../../../components/Highlight/highlight.jsx";
import DefCourseImage from "../../../images/def_course_image.svg";
import ChatBot from '../../../components/Bot/bot.jsx';
import Footer from '../../../components/Footer/footer.jsx';
import axios from "axios";

function MyLearning({ user }) {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [courses, setCourses] = useState([]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  /*HAY QUE MODIFICAR LA LOGICA DENTRO DE LOS CAMBIOS DE NELSON, INTEGRO LOS SERVICIOS DIRECTAMENTE EN LAS VISTAS*/
  useEffect(() => {
    const fetchMyCourses = async () => {
      if (!user?.cif) return;
      try {
        const response = await axios.get(`http://localhost:8080/api/enrollmentservice/${user.cif}/courses`);
        setCourses(response.data);
      } catch (error) {
        console.error("Error al cargar cursos inscritos:", error);
      }
    };
    fetchMyCourses();
  }, [user]);

  const handleCourseClick = (courseId) => {
    navigate(`/curso-docente/${course.codigocurso}`);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="my-learning">
      <DefaultHeader />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} user={user} onLogout={handleLogout} />

      <ChatBot message="¿Qué aprenderemos el día de hoy? ¡Estoy aquí para ayudarte!" />

      <div className="section-title">
        <h1><Highlight>Mi Aprendizaje</Highlight></h1>
      </div>

      <div className="courses-grid">
        {courses.length === 0 ? (
          <p className="no-courses-message">No hay cursos inscritos</p>
        ) : (
          courses.map((course) => (
            <div
              key={course.id}
              className="course-container"
              onClick={() => handleCourseClick(course.id)}
            >
              <div className="course-content">
                <img
                  src={DefCourseImage}
                  className="course-image"
                  alt="Imagen de curso"
                />
                <h3 className="course-title">{course.nombre}</h3>
                <p className="course-docente">Docente: {course.docente}</p>
              </div>
            </div>
          ))
        )}
      </div>

      <Footer />
    </div>
  );
}

export default MyLearning;
