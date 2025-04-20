import React, { useState } from "react";
import DefaultHeader from "../def-header/default-header.jsx";
import Sidebar from "../sidebar/sidebar.jsx";
import Highlight from "../Highlight/highlight.jsx";
import ChatBot from "../Bot/bot.jsx";
import Footer from "../Footer/footer.jsx";
import "./Settings.css";

function Configuration({ user }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="configuration-page">
      <DefaultHeader />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} user={user} />
      <ChatBot message="Ayuda" />

      <div className="section-title">
        <h1><Highlight>Configuración</Highlight></h1>
      </div>

      <div className="configuration-container">
        <div className="configuration-card">
          <h2>Configuración</h2>

          <div className="config-item">
            <span>Modo oscuro</span>
            <label className="switch">
              <input type="checkbox" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
              <span className="slider round"></span>
            </label>
          </div>

          <div className="config-item">
            <span>Recibir notificaciones por correo</span>
            <label className="switch">
              <input
                type="checkbox"
                checked={emailNotifications}
                onChange={() => setEmailNotifications(!emailNotifications)}
              />
              <span className="slider round"></span>
            </label>
          </div>

          <button className="report-btn">Reportar un problema</button>
          <button className="logout-btn" onClick={handleLogout}>Cerrar sesión</button>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Configuration;
