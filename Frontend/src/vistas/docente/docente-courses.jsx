import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./docente-courses.css"; 
import DefaultHeader from "../../components/def-header/default-header.jsx"; 
import GreaterThan from "./../../images/chevronRight.svg";
import DefCourseImage from "./../../images/def_course_image.svg";
import Sidebar from "../../components/sidebar/sidebar.jsx";
import Highlight from "../../components/Highlight/highlight.jsx";
import heroimg from "./../../images/bienvenida.jpg";
import Footer from '../../components/Footer/footer.jsx';
/**
 * Helper function to group courses by faculty.
 */
function groupByFaculty(courseArray) {
  if (!Array.isArray(courseArray)) return [];

  const facultiesMap = {};
  courseArray.forEach((course) => {
    const facultyName = course.faculty || "Sin Facultad";
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

function CursosDocente({ user, courses, setCourses }) {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // For testing: if courses is empty, set sample courses here
  useEffect(() => {
    if (!courses || (Array.isArray(courses) && courses.length === 0)) {
      const sampleCourses = [
        { id: 1, name: "Curso de Matemáticas", instructor: "Profesor A", faculty: "Ingeniería", id_facultad: 1 },
        { id: 2, name: "Curso de Química", instructor: "Profesor B", faculty: "Ciencias", id_facultad: 2 },
        { id: 3, name: "Curso de Historia", instructor: "Profesor C", faculty: "Humanidades", id_facultad: 3 },
        { id: 4, name: "Curso de Derecho", instructor: "Profesor D", faculty: "Filosofía", id_facultad: 4 },
        { id: 5, name: "Curso de áticas", instructor: "Profesor A", faculty: "Ingeniería", id_facultad: 1 },
        { id: 6, name: "Curso de ca", instructor: "Profesor B", faculty: "Ciencias", id_facultad: 2 },
        { id: 7, name: "Curso de ria", instructor: "Profesor C", faculty: "Humanidades", id_facultad: 3 },
        { id: 8, name: "Curso de ho", instructor: "Profesor D", faculty: "Filosofía", id_facultad: 4 },
        { id: 9, name: "Curso de áticas", instructor: "Profesor A", faculty: "Ingeniería", id_facultad: 1 },
        { id: 10, name: "Curso deica", instructor: "Profesor B", faculty: "Ciencias", id_facultad: 2 },
        { id: 11, name: "Curso deoria", instructor: "Profesor C", faculty: "Humanidades", id_facultad: 3 },
        { id: 12, name: "Curso decho", instructor: "Profesor D", faculty: "Filosofía", id_facultad: 4 },
        { id: 13, name: "Curso demáticas", instructor: "Profesor A", faculty: "Ingeniería", id_facultad: 1 },
        { id: 15, name: "Curso deica", instructor: "Profesor B", faculty: "Ciencias", id_facultad: 2 },
        { id: 16, name: "Curso deoria", instructor: "Profesor C", faculty: "Humanidades", id_facultad: 3 },
        { id: 17, name: "Curso decho", instructor: "Profesor D", faculty: "Filosofía", id_facultad: 4 },
        { id: 18, name: "Curso demáticas", instructor: "Profesor A", faculty: "Ingeniería", id_facultad: 1 },
        { id: 19, name: "Curso deica", instructor: "Profesor B", faculty: "Ciencias", id_facultad: 2 },
        { id: 20, name: "Curso deoria", instructor: "Profesor C", faculty: "Humanidades", id_facultad: 3 },
        { id: 21, name: "Curso decho", instructor: "Profesor D", faculty: "Filosofía", id_facultad: 4 },
        { id: 22, name: "Curso demáticas", instructor: "Profesor A", faculty: "Ingeniería", id_facultad: 1 },
        { id: 23, name: "Curso deica", instructor: "Profesor B", faculty: "Ciencias", id_facultad: 2 },
        { id: 24, name: "Curso deoria", instructor: "Profesor C", faculty: "Humanidades", id_facultad: 3 },
        { id: 25, name: "Curso decho", instructor: "Profesor D", faculty: "Filosofía", id_facultad: 4 },
        { id: 26, name: "Curso demáticas", instructor: "Profesor A", faculty: "Ingeniería", id_facultad: 1 },
        { id: 27, name: "Curso deica", instructor: "Profesor B", faculty: "Ciencias", id_facultad: 2 },
        { id: 28, name: "Curso deoria", instructor: "Profesor C", faculty: "Humanidades", id_facultad: 3 },
        { id: 29, name: "Curso decho", instructor: "Profesor D", faculty: "Filosofía", id_facultad: 4 },
        { id: 30, name: "Curso demáticas", instructor: "Profesor A", faculty: "Ingeniería", id_facultad: 1 },
        { id: 31, name: "Curso deica", instructor: "Profesor B", faculty: "Ciencias", id_facultad: 2 },
        { id: 32, name: "Curso deoria", instructor: "Profesor C", faculty: "Humanidades", id_facultad: 3 },
        { id: 33, name: "Curso decho", instructor: "Profesor D", faculty: "Filosofía", id_facultad: 4 },
        { id: 34, name: "Curso demáticas", instructor: "Profesor A", faculty: "Ingeniería", id_facultad: 1 },
        { id: 35, name: "Curso deica", instructor: "Profesor B", faculty: "Ciencias", id_facultad: 2 },
        { id: 36, name: "Curso deoria", instructor: "Profesor C", faculty: "Humanidades", id_facultad: 3 },
        { id: 37, name: "Curso decho", instructor: "Profesor D", faculty: "Filosofía", id_facultad: 4 },
        { id: 38, name: "Curso demáticas", instructor: "Profesor A", faculty: "Ingeniería", id_facultad: 1 },
        { id: 39, name: "Curso deica", instructor: "Profesor B", faculty: "Ciencias", id_facultad: 2 },
        { id: 40, name: "Curso deoria", instructor: "Profesor C", faculty: "Humanidades", id_facultad: 3 },
        { id: 41, name: "Curso decho", instructor: "Profesor D", faculty: "Filosofía", id_facultad: 4 }
      ];
      setCourses(sampleCourses);
    }
  }, [courses, setCourses]);

  const handleCourseClick = (courseId) => {
    navigate(`/curso-docente/${courseId}`);
  };

  const facultyGroups = groupByFaculty(courses);

  // Refs for scrolling the courses container
  const scrollContainerRefs = useRef({});

  const scrollRight = (facultyName) => {
    if (scrollContainerRefs.current[facultyName]) {
      scrollContainerRefs.current[facultyName].scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const scrollLeft = (facultyName) => {
    if (scrollContainerRefs.current[facultyName]) {
      scrollContainerRefs.current[facultyName].scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  return (
    <div className="docente-courses">
      <DefaultHeader />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} user={user} />

      <div className="Bienvenida-container">
          <img 
            src={heroimg} 
            className="hero-img" 
            alt="Welcome banner"
          />
          <div className="bienvenida-text-container">
            <h1>Bienvenido al espacio de Formación Docente</h1>
            <p>Descubre cursos diseñados para potenciar tu aprendizaje y crecimiento profesional</p>
          </div>
        </div>

      <div className="all-courses-container">


        <h1><Highlight>Qué aprender ahora</Highlight></h1>

        {(!Array.isArray(courses) || courses.length === 0) ? (
          <h2 className="no-courses-message">No hay cursos disponibles</h2>
        ) : (
          facultyGroups.map((facultyGroup) => (
            <div key={facultyGroup.faculty} className="faculty-section">
              <h2 className="faculty-title" >
                Facultad de {facultyGroup.faculty}
              </h2>
              
              {/* Wrapper that limits the visible area */}
              <div className="faculty-courses-wrapper">
                {/* The scrollable container */}
                <div
                  className="faculty-courses"
                  ref={(el) => (scrollContainerRefs.current[facultyGroup.faculty] = el)}
                >
                  {facultyGroup.courses.map((course) => (
                    <div
                      key={course.id}
                      className="course-container"
                      onClick={() => handleCourseClick(course.id)}
                    >
                      <div className= "course-content">
                          <img
                            src={DefCourseImage}
                            className="course-image"
                            alt="Imagen de curso"
                          />
                          <h3 className="course-title">{course.name}</h3>
                          <p className="course-docente">
                            Docente: {course.instructor}</p>
                        </div>
                    </div>
                  ))}
                </div>
                {/* Slide arrows */}
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
