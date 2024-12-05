import React from 'react';
import styles from './sidebar.module.css';
import settingsIcon from '../images/settings.svg';
import statisticIcon from '../images/statistic_icon.svg';

function Sidebar({ isOpen, toggleSidebar, role }) {
  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`} onClick={toggleSidebar}>
      <div className={styles.sidebarContent}>
        {/* Mostrar el ícono de estadísticas solo si el rol es 'administrador' */}
        {role === 'administrador' && (
          <img src={statisticIcon} alt="Estadísticas" className={styles.statisticIcon} />
        )}
        <img src={settingsIcon} alt="Configuración" className={styles.settingsIcon} />
      </div>
    </div>
  );
}

export default Sidebar;
