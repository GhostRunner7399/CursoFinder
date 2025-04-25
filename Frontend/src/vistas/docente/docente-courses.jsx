import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./docente-courses.css";
import DefaultHeader from "../../components/def-header/default-header.jsx";
import GreaterThan from "./../../images/chevronRight.svg";
import DefCourseImage from "./../../images/def_course_image.svg";
import Sidebar from "../../components/sidebar/sidebar.jsx";
import Highlight from "../../components/Highlight/highlight.jsx";
import heroimg from "./../../images/bienvenida.jpg";
import Footer from "../../components/Footer/footer.jsx";

/**
 * Agrupa los cursos por nombre de facultad.
 */
function groupByFaculty(courseArray) {
  if (!Array.isArray(courseArray)) return [];

  const facultiesMap = {};
  courseArray.forEach((course) => {
    const facultyName = course.facultad?.nombre || "Sin Facultad";
    if (!facultiesMap[facultyName]) {
      facultiesMap[facultyName] = [];
    }
    facultiesMap[facultyName].push(course);
  });

  return Object.keys(facultiesMap).map((facultyName) => ({
    faculty: facultyName,
    courses: facultiesMap[facultyName],
  }));
}

function CursosDocente({ user }) {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const scrollContainerRefs = useRef({});

  useEffect(() => {
    fetch("http://localhost:8080/api/courses?active=true")
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch((err) => console.error("Error al obtener cursos activos:", err));
  }, []);

  const handleCourseClick = (course) => {
    navigate(`/curso-docente/${course.codigocurso}`);
  };  

  const scrollRight = (facultyName) => {
    scrollContainerRefs.current[facultyName]?.scrollBy({ left: 300, behavior: "smooth" });
  };

  const scrollLeft = (facultyName) => {
    scrollContainerRefs.current[facultyName]?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const facultyGroups = groupByFaculty(courses);

  return (
    <div className="docente-courses">
      <DefaultHeader />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} user={user} onLogout={handleLogout} />

      <div className="Bienvenida-container">
        <img src={heroimg} className="hero-img" alt="Welcome banner" />
        <div className="bienvenida-text-container">
          <h1>Bienvenido al espacio de Formación Docente</h1>
          <p>Descubre cursos diseñados para potenciar tu aprendizaje y crecimiento profesional</p>
        </div>
      </div>

      <div className="all-courses-container">
        <h1><Highlight>Qué aprender ahora</Highlight></h1>

        {facultyGroups.length === 0 ? (
          <h2 className="no-courses-message">No hay cursos disponibles</h2>
        ) : (
          facultyGroups.map((facultyGroup) => (
            <div key={facultyGroup.faculty} className="faculty-section">
              <h2 className="faculty-title">Facultad de {facultyGroup.faculty}</h2>

              <div className="faculty-courses-wrapper">
                <div
                  className="faculty-courses"
                  ref={(el) => (scrollContainerRefs.current[facultyGroup.faculty] = el)}
                >
                  {facultyGroup.courses.map((course) => (
                    <div
                      key={course.id}
                      className="course-container"
                      onClick={() => handleCourseClick(course)}
                    >
                      <div className="course-content">
                        <img src={DefCourseImage} className="course-image" alt="Imagen de curso" />
                        <h3 className="course-title">{course.nombre}</h3>
                        <p className="course-docente">
                          Docente: {course.cursoDetalle?.docente
                            ? `${course.cursoDetalle.docente.primernombre} ${course.cursoDetalle.docente.primerapellido}`
                            : "Sin asignar"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <img
                  src={GreaterThan}
                  className="slide-arrow-left"
                  alt="Slide left"
                  onClick={() => scrollLeft(facultyGroup.faculty)}
                />
                <img
                  src={GreaterThan}
                  className="slide-arrow-right"
                  alt="Slide right"
                  onClick={() => scrollRight(facultyGroup.faculty)}
                />
              </div>
            </div>
          ))
        )}
      </div>
      <Footer />
    </div>
  );
}

export default CursosDocente;
