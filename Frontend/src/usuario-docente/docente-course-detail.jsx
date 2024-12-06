import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./docente-course-detail.css";
import logo from "../images/logoUAMFD.svg";
import menuIcon from "../images/menu.svg";
import certificationIcon from "../images/certificationIcon.svg"; 
import Sidebar from "../components/sidebar";

function Detailsdocente({ courses }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const courseId = parseInt(id, 10);

  // Buscar curso
  const course = courses.find((c) => c.id === courseId);

  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (!course) {
    console.log("Curso no encontrado. Cursos disponibles:", courses);
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
      
      <div className="white-lineH-docente"></div>

      {message && <div className="subscription-message-docente">{message}</div>}

      {/* Header */}
      <div className="header-course-detail-docente">
        <img src={menuIcon} alt="Menú" className="menu-icon-docente" onClick={toggleSidebar} />
        <div className="logo-container-docente">
          <img src={logo} alt="Logo UAMFD" className="logo-course-detail-docente" />
          <div className="white-left-rectangle-docente"></div>
        </div>
        {/* Costo en la esquina superior derecha */}
        <div className="course-cost-docente">
          <strong>Costo:</strong> ${course.cost}
        </div>
      </div>

      {/* Detalles del curso */}
      <div className="course-container-docente">
        <h1 className="course-name-docente">{course.name}</h1>
        <p className="description-text">{course.description}</p> {/* Descripción del curso */}

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

        {/* Sección de Certificación */}
        <div className="certification-box-docente">
  <div className="icon-container">
    <img src={certificationIcon} alt="Certificación" className="certification-icon-docente" />
  </div>
  <div className="certification-content">
    <p className="certification-text-docente">{course.certification}</p>
    <p className="certifying-body-text">Cuerpo Certificador: {course.certifyingBody}</p>
  </div>
</div>

        {/* Botón de inscripción */}
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