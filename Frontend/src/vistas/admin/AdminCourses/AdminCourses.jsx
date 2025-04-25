import React, { useState } from "react";
import DefaultHeader from "../../../components/def-header/default-header.jsx";
import Sidebar from "../../../components/sidebar/sidebar.jsx";
import Highlight from "../../../components/Highlight/highlight.jsx";
import Footer from "../../../components/Footer/footer.jsx";
import heroimg from "../../../images/bienvenida.jpg";
import "./AdminCourses.css";

function AdminCourses({ user }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("cursos");

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const renderTabContent = () => {
    switch (activeTab) {
      case "cursos":
        return <div className="admin-tab-content">Contenido de Cursos</div>;
      case "estadisticas":
        return <div className="admin-tab-content">Contenido de Estadísticas</div>;
      case "gestionar-cursos":
        return <div className="admin-tab-content">Contenido para Gestionar Cursos</div>;
      case "gestionar-usuarios":
        return <div className="admin-tab-content">Contenido para Gestionar Usuarios</div>;
      default:
        return null;
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="admin-page">
      <DefaultHeader />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} user={user} onLogout={handleLogout} />


      <div className="Bienvenida-container">
        <img src={heroimg} className="hero-img" alt="Welcome banner" />
        <div className="bienvenida-text-container">
            <h1>Bienvenido al espacio de Formación Docente</h1>
            <p>Descubre cursos diseñados para potenciar tu aprendizaje y crecimiento profesional</p>
        </div>
      </div>

      <div className="section-title">
        <h1><Highlight>Administra y gestiona</Highlight></h1>
      </div>

      <div className="admin-tabs-horizontal">
        <button className={`admin-tab ${activeTab === "cursos" ? "active" : ""}`} onClick={() => setActiveTab("cursos")}>Cursos</button>
        <button className={`admin-tab ${activeTab === "estadisticas" ? "active" : ""}`} onClick={() => setActiveTab("estadisticas")}>Estadísticas</button>
        <button className={`admin-tab ${activeTab === "gestionar-cursos" ? "active" : ""}`} onClick={() => setActiveTab("gestionar-cursos")}>Gestionar Cursos</button>
        <button className={`admin-tab ${activeTab === "gestionar-usuarios" ? "active" : ""}`} onClick={() => setActiveTab("gestionar-usuarios")}>Gestionar usuarios</button>
      </div>

      <div className="admin-content-container">
        {renderTabContent()}
      </div>
      <Footer />
    </div>
  );
}

export default AdminCourses;
