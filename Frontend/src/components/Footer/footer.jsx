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
          <h3>Mission, Vision & Values</h3>
          <p><strong>Mission:</strong> Empower learners to achieve their goals.</p>
          <p><strong>Vision:</strong> To be a leader in education and innovation.</p>
          <p><strong>Values:</strong> Integrity, Excellence, Collaboration.</p>
        </div>
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: info@organization.com</p>
          <p>Phone: +1 (123) 456-7890</p>
          <p>Address: 123 Education Lane, Knowledge City</p>
        </div>
      </div>
      <div className="footer-copyright">
        <p>&copy; {new Date().getFullYear()} Our Organization. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;