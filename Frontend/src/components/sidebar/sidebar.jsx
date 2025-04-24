import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './sidebar.module.css';

// Icons
import displayIcon from '../../images/sidebar/display_sidebar.svg';
import DashboardIcon from '../../images/sidebar/dashboard.svg';
import settingsIcon from '../../images/sidebar/Settings.svg';
import statisticIcon from '../../images/sidebar/statistics.svg';
import logOutIcon from '../../images/sidebar/logOut.svg';

// Example helper to convert role IDs to role names
function getRoleName(idRol) {
  switch (idRol) {
    case 1:
      return 'Administrador';
    case 2:
      return 'Docente';
    default:
      return 'Usuario'; 
  }
}

function Sidebar({ isOpen, toggleSidebar, user }) {
  const navigate = useNavigate();

  // Extract the role name from user.id_rol
  const roleName = user?.id_rol ? getRoleName(user.id_rol) : 'Docente';

  // Handlers for navigation
  const handleDashboardClick = () => {
    navigate('/courses');
  };

  const handleStatisticsClick = () => {
    navigate('/statistics');
  };

  const handleSettingsClick = () => {
    navigate('/settings');
  };

  const handleLogoutClick = () => {
    // Replace with your logout logic
    navigate('/login');
  };

  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
      {/* Toggle icon (clicking it expands/collapses the sidebar) */}
      <img
        src={displayIcon}
        alt="Toggle Sidebar"
        className={`${styles.displayIcon} ${isOpen ? styles.displayIconOpened : ""}`}
        onClick={toggleSidebar}
      />

      {/* The expanded content (role, icons, labels) */}
      <div className={styles.sidebarContent}>
        {/* User / Role Identifier */}
        <div className={styles.identificadorContainer}>
          {isOpen && (
            <>
              <p className={styles.sidebarTitle}>UAMFD</p>
              <p className={styles.sidebarRole}>{roleName}</p>
            </>
          )}
        </div>

        <div className= {styles.navItems}>{/* Nav items */}
            <div className={styles.navItem} onClick={handleDashboardClick}>
              <img src={DashboardIcon} alt="Dashboard" />
              {isOpen && <span>Dashboard</span>}
            </div>

            {roleName === 'Administrador' && (
              <div className={styles.navItem} onClick={handleStatisticsClick}>
                <img src={statisticIcon} alt="Estadísticas" />
                {isOpen && <span>Estadísticas</span>}
              </div>
            )}

            <div className={styles.navItem} onClick={handleSettingsClick}>
              <img src={settingsIcon} alt="Configuración" />
              {isOpen && <span>Configuración</span>}
            </div>

            <div className={styles.navItem} onClick={handleLogoutClick}>
              <img src={logOutIcon} alt="Cerrar sesión" />
              {isOpen && <span>Cerrar sesión</span>}
            </div>
          </div>
        </div>
    </div>
  );
}

export default Sidebar;
