import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DefaultHeader from "../../../components/def-header/default-header.jsx";
import Sidebar from "../../../components/sidebar/sidebar.jsx";
import Highlight from "../../../components/Highlight/highlight.jsx";
import Footer from "../../../components/Footer/footer.jsx";
import AdminCoursesTabCursos from "./AdminCoursesTabCursos.jsx";
import AdminCoursesTabGestionarC from "./AdminCoursesTabGestionarC.jsx";
import AdminCoursesTabGestionarU from "./AdminCoursesTabGestionarU.jsx";

import "./AdminCourses.css";

function AdminCourses({ user }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("cursos");
  const [courses, setCourses] = useState([]);
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  useEffect(() => {
    fetch("http://localhost:8080/api/courses/all")
      .then((res) => res.json())
      .then((data) => {
        console.log("Cursos que llegaron a AdminCourses:", data);
        setCourses(data.content); 
      })
      .catch((err) => console.error("Error al obtener cursos:", err));
  
    fetch("http://localhost:8080/api/users/all")
      .then((res) => res.json())
      .then((data) => {
        console.log("Usuarios que llegaron a AdminCourses:", data);
        setUsers(data.content);
      })
      .catch((err) => console.error("Error al obtener usuarios:", err));
  }, []);  

  const renderTabContent = () => {
    switch (activeTab) {
      case "cursos":
        return <AdminCoursesTabCursos courses={courses} />; 
      case "estadisticas":
        return <div className="admin-tab-content">Contenido de Estadísticas</div>;
      case "gestionar-cursos":
        return <AdminCoursesTabGestionarC courses={courses} />; 
      case "gestionar-usuarios":
        return <AdminCoursesTabGestionarU users={users} />;
      default:
        return null;
    }
  };

  return (
    <div className="admin-page">
      <DefaultHeader />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} user={user} onLogout={handleLogout} />

      <div className="section-title">
        <h1><Highlight>Administra y gestiona</Highlight></h1>
      </div>

      <div className="admin-tabs-horizontal">
        <button className={`admin-tab ${activeTab === "cursos" ? "active" : ""}`} onClick={() => setActiveTab("cursos")}>Cursos</button>
        <button className={`admin-tab ${activeTab === "estadisticas" ? "active" : ""}`} onClick={() => setActiveTab("estadisticas")}>Estadísticas</button>
        <button className={`admin-tab ${activeTab === "gestionar-cursos" ? "active" : ""}`} onClick={() => setActiveTab("gestionar-cursos")}>Gestionar Cursos</button>
        <button className={`admin-tab ${activeTab === "gestionar-usuarios" ? "active" : ""}`} onClick={() => setActiveTab("gestionar-usuarios")}>Gestionar Usuarios</button>
      </div>

      <div className="admin-content-container">
        {renderTabContent()}
      </div>

      <Footer />
    </div>
  );
}

export default AdminCourses;
