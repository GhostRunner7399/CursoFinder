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
    const fetchTeachingCourses = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/courses?active=true`);
        const allCourses = await response.json();
        const myCourses = allCourses.filter(course => 
          course.cursoDetalle?.docente?.cif === user.cif
        );
        setCourses(myCourses);
      } catch (error) {
        console.error("Error al cargar cursos impartidos:", error);
      }
    };

    if (user?.cif) {
      fetchTeachingCourses();
    }
  }, [user]);

  const handleCourseClick = (course) => {
    navigate(`/curso-docente/${course.codigocurso}`);
  };  

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="my-teaching">
      <DefaultHeader />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} user={user} onLogout={handleLogout} />
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
              onClick={() => handleCourseClick(course)}
            >
              <div className="course-content">
                <img
                  src={DefCourseImage}
                  className="course-image"
                  alt="Imagen de curso"
                />
                <h3 className="course-title">{course.nombre}</h3>
                <p className="course-docente">Docente: Tú mismo ({user?.name})</p>
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
