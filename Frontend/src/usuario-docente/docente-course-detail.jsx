import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./docente-course-detail.css"; // Ensure this is the correct path to your CSS file
import logo from "../images/logoUAMFD.svg";
import menuIcon from "../images/menu.svg";
import certificationIcon from "../images/certificationIcon.svg";
import Sidebar from "../components/sidebar";

function Detailsdocente({ courses }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const courseId = parseInt(id, 10);
  const course = courses.find((c) => c.id === courseId);

  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (!course) {
    return (
      <div className="course-page-docente">
        <p>Curso no encontrado.</p>
        <button onClick={() => navigate("/courses")}>Volver a Cursos</button>
      </div>
    );
  }

  return (
    <div className="course-page-docente">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="header-course-detail-docente">
        <img src={menuIcon} alt="Menú" className="menu-icon" onClick={toggleSidebar} />
        <div className="white-lineH-docente"></div>
        <div className="docente-course-detail-L-side-rectangle"></div>
        <div className="logo-container-docente">
          <img src={logo} alt="LogoUAMFD" className="logo-course-detail-docente" />
        </div>
        <div className="course-cost-docente">
          <strong>Costo:</strong> ${course.cost}
        </div>
      </div>

      <div className="course-container-docente">
        <div className="course-name-box-docente">
        <h1 className="course-header-docente">{course.name}</h1>
        </div>
        <p className="description-text">{course.description}</p>

        <div className="course-details-container">
          <div className="course-details-left">
            <p><strong>Duración:</strong></p>
            <p className="info-detail">• {course.weeks} semanas</p>

            <p><strong>Días:</strong></p>
            <p className="info-detail">• {course.daysOfWeek}</p>

            <p><strong>Lugar:</strong></p>
            <p className="info-detail">• {course.location}</p>

            <p><strong>Requisitos previos:</strong></p>
            <p className="info-detail">• {course.prerequisites}</p>

            <p><strong>Capacidad:</strong></p>
            <p className="info-detail">• {course.capacity} estudiantes</p>
          </div>
          <div className="course-details-right">
            <p><strong>Total horas:</strong></p>
            <p className="info-detail">• {course.courseHours} horas</p>

            <p><strong>Horario:</strong></p>
            <p className="info-detail">• {course.schedule}</p>

            <p><strong>Profesor:</strong></p>
            <p className="info-detail">• {course.professor}</p>

            <p><strong>Nivel:</strong></p>
            <p className="info-detail">• {course.level}</p>

            <p><strong>Cupos disponibles:</strong></p>
            <p className="info-detail">• {course.availableSpots}</p>
          </div>
        </div>
        
        <div className="certification-box-docente">
          <div className="icon-container">
            <img src={certificationIcon} alt="Certification" className="certification-icon-docente" />
          </div>
          <div className="certification-content">
            <p className="certification-text-docente">{course.certification}</p>
            <p className="certifying-body-text">Cuerpo Certificador: {course.certifyingBody}</p>
          </div>
        </div>

        <div className="enroll-container-docente">
          <button
            onClick={() => {
              setMessage("Se ha inscrito al curso.");
              setTimeout(() => setMessage(""), 5000);
            }}
            className="enroll-btn-docente"
          >
            Inscribirse
          </button>
        </div>
      </div>
    </div>
  );
}

export default Detailsdocente;
