import React from 'react';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Universidad Americana (UAM), Formación Docente</h3>
          <p>We are committed to providing quality education and fostering innovation.</p>
        </div>
        <div className="footer-section">
          <h3>Misión, Visión y Valores</h3>
          <p><strong>Misión:</strong> Empower learners to achieve their goals.</p>
          <p><strong>Visión:</strong> To be a leader in education and innovation.</p>
          <p><strong>Valores:</strong> Integrity, Excellence, Collaboration.</p>
        </div>
        <div className="footer-section">
          <h3>Contáctanos</h3>
          <p><strong>Email:</strong> uameduFD@gmail.com</p>
          <p><strong>Teléfono:</strong> 2278 3800</p>
          <p><strong>Dirección:</strong> 4P5V + 96W, Costado Noroeste. Camino de Oriente</p>
        </div>
      </div>
      <div className="footer-copyright">
        <p>&copy; {new Date().getFullYear()} Our Organization. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;