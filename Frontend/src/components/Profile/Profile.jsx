import React, { useState, useEffect } from "react";
import DefaultHeader from "../def-header/default-header.jsx";
import Sidebar from "../sidebar/sidebar.jsx";
import Highlight from "../Highlight/highlight.jsx";
import ChatBot from "../Bot/bot.jsx";
import Footer from "../Footer/footer.jsx";
import "./Profile.css";

function Profile() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("mi-perfil");
  const [user, setUser] = useState(null);
  const [activeCourses, setActiveCourses] = useState([]);
  const [currentDate, setCurrentDate] = useState("");

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);

    const today = new Date();
    const formatted = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
    setCurrentDate(formatted);

    // Fetch active courses for MyLearning tab
    if (storedUser?.cif) {
      fetch(`http://localhost:8080/api/enrollmentservice/${storedUser.cif}/courses`)
        .then((res) => res.json())
        .then((data) => setActiveCourses(data))
        .catch((err) => console.error("Error al obtener cursos:", err));
    }
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case "mi-perfil":
        return (
          <div className="perfil-publico">
            <h2>PERFIL PÚBLICO</h2>
            <p className="sub">Añade información sobre ti</p>
            <div className="profile-info">
              <p><strong>Nombre:</strong> {user?.name}</p>
              <p><strong>Correo:</strong> {user?.email}</p>
              <p><strong>CIF:</strong> {user?.cif}</p>
              <p><strong>Rol:</strong> {user?.role}</p>
            </div>
          </div>
        );
      case "fotografia":
        return (
          <div className="perfil-publico">
            <h2>FOTOGRAFÍA</h2>
            <p className="sub">Añade una foto tuya al perfil</p>
            <div className="photo-box">#</div>
          </div>
        );
      case "cursos":
        return (
          <div className="perfil-publico">
            <h2>CURSOS ASIGNADOS</h2>
            <p className="sub">Consulta los cursos asignados como docente o estudiante</p>
            <div className="profile-info">
              <h4>Cursos Activos:</h4>
              {activeCourses.length > 0 ? (
                activeCourses.map((curso) => (
                  <p key={curso.id}>• {curso.nombre}</p>
                ))
              ) : (
                <p>No hay cursos activos</p>
              )}
              <h4>Cursos Impartidos:</h4>
              <p>Por el momento no disponible "Falta gestion administrativa para cuando asignar un curso"</p>
              <h4>Cursos Finalizados:</h4>
              <p>Por el momento no disponible "Falta gestion administrativa para cuando finalizar un curso </p>
            </div>
          </div>
        );
      case "resumen":
        return (
          <div className="perfil-publico">
            <h2>RESUMEN ACTIVIDAD</h2>
            <p className="sub">Resumen de participación, progreso, interacciones y más</p>
            <div className="profile-info">
              <p><strong>Última conexión:</strong> {currentDate}</p>
              <p><strong>Cursos finalizados:</strong> 0</p>
              <p><strong>Certificados obtenidos:</strong> 0</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="profile-page">
      <DefaultHeader />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} user={user} />

      <div className="section-title">
        <h1><Highlight>Perfil</Highlight></h1>
        <p></p>
      </div>

      <div className="profile-container">
        <div className="profile-left shadow-box">
          <div className="profile-pic-circle">#</div>
          <p className="username">{user?.name || "Usuario"}</p>
          <div className="profile-tabs">
            <button className={`tab ${activeTab === "mi-perfil" ? "active" : ""}`} onClick={() => setActiveTab("mi-perfil")}>Mi perfil</button>
            <button className={`tab ${activeTab === "fotografia" ? "active" : ""}`} onClick={() => setActiveTab("fotografia")}>Fotografía</button>
            <button className={`tab ${activeTab === "cursos" ? "active" : ""}`} onClick={() => setActiveTab("cursos")}>Cursos</button>
            <button className={`tab ${activeTab === "resumen" ? "active" : ""}`} onClick={() => setActiveTab("resumen")}>Resumen de actividad</button>
          </div>
        </div>

        <div className="profile-right shadow-box">
          {renderTabContent()}
        </div>
      </div>

      <ChatBot message="Consultar y mantener actualizada tu información profesional." />
      <Footer />
    </div>
  );
}

export default Profile;
