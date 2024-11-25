import React from 'react';
import logoUAM from './images/logoUAM.svg';
import './courses.css';

function courses() {
  return (
    <div className="courses">
        <img src={logoUAM} className="courses-logoUAM" alt="logoUAM"/>
        <div style={{ display: 'flex' }}></div>
        <p>
        Display de courses
        </p>
    </div>
  );
}

export default courses;
