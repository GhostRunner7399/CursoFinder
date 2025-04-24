import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DefaultHeader from "../../../components/def-header/default-header.jsx";
import Sidebar from "../../../components/sidebar/sidebar.jsx";
import Highlight from "../../../components/Highlight/highlight.jsx";
import Footer from '../../../components/Footer/footer.jsx';
import ChatBot from '../../../components/Bot/bot.jsx';
import "./docente-course-detail.css";

function DetalleCursos({ user }) {
  const { id } = useParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [curso, setCurso] = useState(null);
  const [inscrito, setInscrito] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/courses/${id}`);
        const data = await res.json();
        setCurso(data);

        const user = JSON.parse(localStorage.getItem("user"));
        const res2 = await fetch(`http://localhost:8080/api/enrollmentservice/${user.cif}/courses`);
        const myCourses = await res2.json();
        const yaInscrito = myCourses.some(c => c.id === data.id);
        setInscrito(yaInscrito);
      } catch (err) {
        console.error("Error al cargar curso:", err);
      }
    };
    fetchCourse();
  }, [id]);

  const handleInscribirse = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await fetch("http://localhost:8080/api/enrollmentservice/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cif: user.cif, codigocurso: curso.codigocurso })
      });
      if (res.ok) setInscrito(true);
    } catch (err) {
      console.error("Error al inscribirse:", err);
    }
  };

  const handleDesinscribirse = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await fetch(`http://localhost:8080/api/enrollmentservice/usuario/${user.cif}/curso/${curso.codigocurso}`, {
        method: "DELETE"
      });
      if (res.ok) setInscrito(false);
    } catch (err) {
      console.error("Error al desinscribirse:", err);
    }
  };

  if (!curso) return <div>Cargando curso...</div>;

  return (
    <div className="detalle-curso">
      <DefaultHeader />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} user={user} />
      <ChatBot message="¿Te interesa este curso? ¡Estoy aquí para ayudarte!" />

      <div className="section-title">
        <h1><Highlight>Detalles del curso</Highlight></h1>
      </div>

      <div className="detalle-container">
        <div className="detalle-content">
          <h1>{curso.nombre} - {curso.codigocurso}</h1>
          <p className="descripcion"><strong>Descripción:</strong> {curso.descripcion}</p>
          <p className="docente">Brindado por el docente <span className="blue">{curso.docente}</span></p>
          <p className="estado">
            <span className={curso.active ? "activo" : "inactivo"}>{curso.active ? "Activo" : "Inactivo"}</span>
          </p>

          <div className="detalle-box">
            <h3>Requisitos</h3>
            <ul>
              {curso.requisitos.split('.').filter(Boolean).map((r, i) => (
                <li key={i}>{r.trim()}.</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="detalle-sidebar">
          <h3>Características:</h3>
          <p><strong>Horario:</strong> {curso.horario}</p>
          <p><strong>Lugar:</strong> {curso.lugar}</p>
          <p><strong>Intensidad:</strong> {curso.intensidad}</p>
          <p><strong>Certificación:</strong> {curso.certificacion}</p>
          <p><strong>Capacidad:</strong> {curso.capacidad}</p>
          <p><strong>Disponibilidad:</strong> {curso.disponibilidad ?? 0}</p>
          <div className="detalle-precio">
            {inscrito ? (
              <button className="btn-desinscribirse" onClick={handleDesinscribirse}>DESINSCRIBIRSE</button>
            ) : (
              <button className="btn-inscribirse" onClick={handleInscribirse}>INSCRIBIRSE</button>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default DetalleCursos;
