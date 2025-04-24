import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyTeaching.css";
import DefaultHeader from "../../../components/def-header/default-header.jsx";
import Sidebar from "../../../components/sidebar/sidebar.jsx";
import Highlight from "../../../components/Highlight/highlight.jsx";
import DefCourseImage from "../../../images/def_course_image.svg";
import ChatBot from '../../../components/Bot/bot.jsx';
import Footer from '../../../components/Footer/footer.jsx';

function MyTeaching({ user }) {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [courses, setCourses] = useState([]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    // Simulación de cursos brindados por el docente logueado
    const teachingCourses = [
      { id: 101, name: "Curso 1: Introducción a Redes" },
      { id: 102, name: "Curso 2: Estructuras de Datos" },
      { id: 103, name: "Curso 3: Ingeniería de Software" },
      { id: 104, name: "Curso 4: Gestión de Proyectos" },
    ];
    setCourses(teachingCourses);
  }, []);

  const handleCourseClick = (courseId) => {
    navigate(`/detalle-curso/${courseId}`);
  };

  return (
    <div className="my-teaching">
      <DefaultHeader />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} user={user} />
      <ChatBot message="¡Cuando uno enseña, dos aprenden!" />

      <div className="section-title">
        <h1><Highlight>Mi Práctica Docente</Highlight></h1>
      </div>

      <div className="courses-grid">
        {courses.length === 0 ? (
          <p className="no-courses-message">No estás brindando cursos actualmente</p>
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
                <h3 className="course-title">{course.name}</h3>
                <p className="course-docente">Docente: Yo ({user?.name})</p>
              </div>
            </div>
          ))
        )}
      </div>
      <Footer />
    </div>
  );
}

export default MyTeaching;
