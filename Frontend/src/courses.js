import React from 'react';
import logoUAM from './images/logoUAM.svg';
import './courses.css';

function HomePage() {
  return (
    <div className="courses">
      <header className="courses-header">
        <img src={logoUAM} className="courses-logoUAM" alt="logoUAM"/> 
        <p>
        Display de courses
        </p>
      </header>
    </div>
  );
}

export default HomePage;
