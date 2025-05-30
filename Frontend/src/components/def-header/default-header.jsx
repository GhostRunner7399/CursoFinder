import React from 'react';
import { useNavigate } from 'react-router-dom';
import logoUAM from '../../images/logoUAM.svg';
import profileIcon from '../../images/def-header/profile_Button.svg';
import bell from '../../images/def-header/Bell.svg';
import './default-header.css';

function DefaultHeader() {
  const navigate = useNavigate();

  const handleDashboardClick = () => {
    navigate('/courses');
  };

  const handleMyTeachingOnClick = () => {
    navigate('/practica-docente');
  };

  const handleMyLearningOnClick = () => {
    navigate('/aprendizaje-docente');
  };

  const handleProfileClick = () => {
    navigate('/perfil');
  };

  return (
    <div className="header">
      <img
        src={logoUAM}
        className="logoUAM"
        alt="Logo-UAM"
        onClick={handleDashboardClick} // <-- AÑADIDO
        style={{ cursor: 'pointer' }}   // <-- Opcional: para que el mouse cambie a manita
      />
      <div className="nav-links">
        <p onClick={handleMyTeachingOnClick}>Mi práctica docente</p>
        <p onClick={handleMyLearningOnClick}>Mi aprendizaje</p>
      </div>

      <div className="icons-container">
        <img src={bell} className="notification-icon" alt="Notification-Icon" />
        <img
          src={profileIcon}
          className="profile-icon"
          alt="Profile-Icon"
          onClick={handleProfileClick}
        />
      </div>
    </div>
  );
}

export default DefaultHeader;
