import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./docente-courses.css"; 
import logo from "../images/logoUAMFD.svg";
import menuIcon from "../images/menu.svg";
import Sidebar from "../components/sidebar";
import UserBox from "../components/user-box";

function CursosDocente({ user, courses, setCourses }) {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  //connect to database, check courses table, retraer info con axios
  useEffect(() => {
    if (!courses || courses.length === 0) {
      const cursoPrueba = {
        id: 1,
        name: "Curso de Java",
        description: "Aprender Java.",
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
      };
      setCourses([cursoPrueba]);
    }
  }, [courses, setCourses]);

  const handleCourseClick = (courseId) => {
    navigate(`/curso-docente/${courseId}`);

  };

  return (
    <div className="courses-page-doc">
      <div className="user-box-container-doc">
        <UserBox user={user} />
      </div>

      <div className="docente-left-side-rectangle"></div>
      <div className="docente-right-side-rectangle"></div>

      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="header-docente-courses">
        <div className="docente-white-lineH"></div>
        <img
          src={menuIcon}
          alt="Menú"
          className="menu-icon-doc"
          onClick={toggleSidebar}
        />
        <img src={logo} alt="LogoUAMFD" className="logo-docente-courses" />
      </div>

      <div className="courses-container-doc">
        <div className="courses-header-doc">
          <h1>Cursos Disponibles</h1>
        </div>

        <div className="courses-list-doc">
          {courses.length === 0 ? (
            <h2 className="no-courses-message-doc">No hay cursos disponibles</h2>
          ) : (
            courses.map((course) => (
              <div
                key={course.id}
                className="course-card-doc"
                onClick={() => handleCourseClick(course.id)}
              >
                <h3 className="course-name-doc">{course.name}</h3>
                <p className="course-description-doc">{course.description}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default CursosDocente;