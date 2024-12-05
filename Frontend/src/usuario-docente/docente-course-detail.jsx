import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./docente-course-detail.css";
import logo from "../images/logoUAMFD.svg";
import menuIcon from "../images/menu.svg";
import Sidebar from "../components/sidebar";

function Detailsdocente({ courses }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const courseId = parseInt(id, 10);

  // Buscar 
  const course = courses.find((c) => c.id === courseId);

  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  
  if (!course) {
    console.log("Curso no encontrado. Cursos disponibles:", courses);
    return (
      <div className="course-page">
        <p>Curso no encontrado.</p>
        <button onClick={() => navigate("/courses")}>Volver a Cursos</button>
      </div>
    );
  }

  return (
    <div className="course-page-doc">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      
      <div className="white-lineH-doc"></div>

      {/* Mensaje  */}
      {message && <div className="subscription-message-doc">{message}</div>}

      {/* Header */}
      <div className="header-course-detail-doc">
        <img src={menuIcon} alt="Menú" className="menu-icon" onClick={toggleSidebar} />
        
        {}
        <div className="logo-container">
          <img src={logo} alt="Logo UAMFD" className="logo-course-detail-doc" />
          <div className="white-lineL"></div>
        
        </div>
      </div>

      {/* Detalles del curso */}
      <div className="course-container-doc">
        <h1 className="course-name-doc">{course.name}</h1> {}
        <div className="course-display-doc">
          <p><strong>Descripción:</strong> {course.description}</p>
          <p><strong>Duración:</strong> {course.weeks} semanas</p>
          <p><strong>Total horas:</strong> {course.courseHours} horas</p>
          <p><strong>Profesor:</strong> {course.professor}</p>
          <p><strong>Lugar:</strong> {course.location}</p>
          <p><strong>Días:</strong> {course.daysOfWeek}</p>
          <p><strong>Horario:</strong> {course.schedule}</p>
          <p><strong>Requisitos previos:</strong> {course.prerequisites}</p>
          <p><strong>Nivel:</strong> {course.level}</p>
          <p><strong>Certificación:</strong> {course.certification}</p>
          <p><strong>Cuerpo Certificador:</strong> {course.certifyingBody}</p>
          <p><strong>Capacidad:</strong> {course.capacity} estudiantes</p>
          <p><strong>Cupos disponibles:</strong> {course.availableSpots}</p>
          <p><strong>Costo:</strong> ${course.cost}</p>
        </div>

        {/* Botón de inscripción */}
        <div className="enroll-container-doc">
          <button
            onClick={() => {
              setMessage("Se ha inscrito al curso.");
              setTimeout(() => setMessage(""), 5000);
            }}
            className="enroll-btn-doc"
          >
            Inscribirse
          </button>
        </div>
      </div>
    </div>
  );
}

export default Detailsdocente;