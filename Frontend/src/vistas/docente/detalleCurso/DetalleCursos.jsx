import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DefaultHeader from "../../../components/def-header/default-header.jsx";
import Sidebar from "../../../components/sidebar/sidebar.jsx";
import Highlight from "../../../components/Highlight/highlight.jsx";
import Footer from "../../../components/Footer/footer.jsx";
import ChatBot from "../../../components/Bot/bot.jsx";
import "./DetalleCursos.css";

function DetalleCursos({ user }) {
  const { codigocurso } = useParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [curso, setCurso] = useState(null);
  const [inscrito, setInscrito] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/courses/${codigocurso}`);
        const data = await res.json();
        setCurso(data);

        const user = JSON.parse(localStorage.getItem("user"));
        const res2 = await fetch(`http://localhost:8080/api/enrollmentservice/${user.cif}/courses`);
        const myCourses = await res2.json();
        const yaInscrito = myCourses.some(c => c.codigocurso === data.codigocurso);
        setInscrito(yaInscrito);
      } catch (err) {
        console.error("Error al cargar curso:", err);
      }
    };
    fetchCourse();
  }, [codigocurso]);

  const handleInscribirse = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user?.cif || !curso?.codigocurso) return;

      const body = { cif: user.cif, codigocurso: curso.codigocurso };
      const res = await fetch("http://localhost:8080/api/enrollmentservice/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      if (res.ok) {
        setInscrito(true);
        window.dispatchEvent(new Event('cursoActualizado'));
      } else {
        const errorText = await res.text();
        alert(`Error: ${errorText}`);
      }
    } catch (err) {
      console.error("Error al intentar inscribirse:", err);
    }
  };

  const handleDesinscribirse = async () => {
    try {
      setIsProcessing(true);
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await fetch(`http://localhost:8080/api/enrollmentservice/usuario/${user.cif}/curso/${curso.codigocurso}`, {
        method: "DELETE"
      });
      if (res.ok) {
        setInscrito(false);
        window.dispatchEvent(new Event('cursoActualizado'));
      }
    } catch (err) {
      console.error("Error al desinscribirse:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!curso) return <div>Cargando curso...</div>;

  const isDocenteDelCurso = user?.cif === curso.docenteId;

  return (
    <div className="detalle-curso">
      <DefaultHeader />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} user={user} onLogout={handleLogout} />
      <ChatBot message="¿Te interesa este curso? ¡Estoy aquí para ayudarte!" />

      <div className="section-title">
        <h1><Highlight>Detalles del curso</Highlight></h1>
      </div>

      <div className="detalle-container">
        <div className="detalle-content">
          <h1>{curso.nombre} - {curso.codigocurso}</h1>
          <p className="descripcion"><strong>Descripción:</strong> {curso.descripcion || "Sin descripción"}</p>
          <p className="docente">
            Brindado por el docente <span className="blue">{curso.docenteNombreCompleto || "Sin asignar"}</span>
          </p>
          <p className="estado">
            <span className={curso.active ? "activo" : "inactivo"}>{curso.active ? "Activo" : "Inactivo"}</span>
          </p>

          <div className="detalle-box">
            <h3>Requisitos</h3>
            <ul>
              {curso.requisitos?.split('.')?.filter(Boolean).map((r, i) => (
                <li key={i}>{r.trim()}.</li>
              )) || <li>No hay requisitos.</li>}
            </ul>
          </div>
        </div>

        <div className="detalle-sidebar">
          <h3>Características:</h3>
          <p><strong>Horario:</strong> {curso.horarios?.length > 0
            ? curso.horarios.map(h => `${h.diaSemana} de ${h.horaInicio} a ${h.horaFin} en ${h.aula}`).join(", ")
            : "No definido"}</p>
          <p><strong>Lugar:</strong> {curso.lugar}</p>
          <p><strong>Certificación:</strong> {curso.certificacion ? "Sí" : "No"}</p>
          <p><strong>Capacidad:</strong> {curso.capacidadMaxima}</p>
          <p><strong>Disponibilidad:</strong> {curso.disponibilidad}</p> {/* <== Aquí corregido! */}
          <p><strong>Facultad:</strong> {curso.facultadNombre || "Sin asignar"}</p>

          {isDocenteDelCurso ? (
            <p className="mensaje-docente-curso">Eres el docente de este curso. No puedes inscribirte.</p>
          ) : (
            <div className="detalle-precio">
              {inscrito ? (
                <button className="btn-desinscribirse" onClick={handleDesinscribirse} disabled={isProcessing}>
                  {isProcessing ? "Procesando..." : "DESINSCRIBIRSE"}
                </button>
              ) : (
                <button className="btn-inscribirse" onClick={handleInscribirse} disabled={isProcessing}>
                  {isProcessing ? "Procesando..." : "INSCRIBIRSE"}
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default DetalleCursos;
