import React, { useState, useEffect } from "react";
import DefaultHeader from "../def-header/default-header.jsx";
import Sidebar from "../sidebar/sidebar.jsx";
import Highlight from "../Highlight/highlight.jsx";
import ChatBot from "../Bot/bot.jsx";
import Footer from "../Footer/footer.jsx";
import "./Profile.css";

function Profile({ user }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    nombre: user?.nombre || "",
    correo: user?.correo || "",
    telefono: user?.telefono || "",
    cif: user?.cif || "",
    ...(user?.role === "administrador" && {
      cargo: user?.cargo || ""
    })
  });

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos guardados:", formData);
    // Aquí podrías enviar los datos al backend
  };

  // Role-specific fields
  const docenteFields = (
    <>
      <input type="text" name="facultad" placeholder="Facultad" value={formData.facultad} onChange={handleChange} />
      <input type="text" name="especialidad" placeholder="Especialidad" value={formData.especialidad} onChange={handleChange} />
      <input type="text" name="grado" placeholder="Grado académico" value={formData.grado} onChange={handleChange} />
      <input type="text" name="experiencia" placeholder="Años de experiencia" value={formData.experiencia} onChange={handleChange} />
    </>
  );

  const adminFields = (
    <>
      <input type="text" name="departamento" placeholder="Departamento" value={formData.departamento} onChange={handleChange} />
      <input type="text" name="cargo" placeholder="Cargo administrativo" value={formData.cargo} onChange={handleChange} />
    </>
  );

  return (
    <div className="profile-page">
      <DefaultHeader />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} user={user} />
      <ChatBot message={`¿Necesitas ayuda con tu perfil ${user?.role === "docente" ? "docente" : "administrativo"}?`} />

      <div className="section-title">
        <h1><Highlight>Perfil</Highlight></h1>
      </div>

      <div className="profile-container">
        <div className="profile-sidebar">
          <div className="avatar-placeholder">
            <span className="icon">📷</span> /* LOOK FOR AN ICON NOT AN EMOJI*/
          </div>
          <p className="username">{user?.nombre || "Usuario"}</p>
          <ul className="profile-nav">
            <li className="active">Mi perfil</li>
            <li>Fotografía</li>
            {user?.role === "docente" && <li>Cursos</li>}
            <li>Resumen de actividad</li>
          </ul>
        </div>

        <div className="profile-main">
          <div className="public-profile">
            <h3>PERFIL {user?.role === "docente" ? "DOCENTE" : "ADMINISTRATIVO"}</h3>
            <p>Actualiza tu información profesional</p>
          </div>

          <form className="profile-form" onSubmit={handleSubmit}>
            <h4>Información básica:</h4>
            <input type="text" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} />
            <input type="email" name="correo" placeholder="Correo" value={formData.correo} onChange={handleChange} />
            <input type="text" name="telefono" placeholder="Teléfono" value={formData.telefono} onChange={handleChange} />
            
            {user?.role === "docente" ? docenteFields : adminFields}
            
            <button type="submit" className="save-btn">Guardar</button>
          </form>
        </div>
      </div>

      <ChatBot message={`¿Necesitas ayuda con tu perfil ${user?.role === "docente" ? "docente" : "administrativo"}?`} />
      <Footer />
    </div>
  );
}

export default Profile;