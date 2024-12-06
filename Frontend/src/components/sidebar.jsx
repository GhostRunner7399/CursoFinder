import React from 'react';
import styles from './sidebar.module.css';
import settingsIcon from '../images/settings.svg';
import statisticIcon from '../images/statistic_icon.svg';

function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
      <div className={styles.sidebarContent}>
        <img src={statisticIcon} alt="Estadisticas" className={styles.statisticIcon} />
        <img src={settingsIcon} alt="Configuración" className={styles.settingsIcon} />
      </div>
    </div>
  );
}

export default Sidebar;