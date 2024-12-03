import React, { useState } from 'react';
import logo from './images/icon2.svg';
import logoUAM from './images/logoUAM.svg';
import './login.css';

/* PAGINA INICIAL, USER LOG IN */

const Login = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });

  // Maneja los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  // Maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica de validación de credenciales
    onLogin(credentials);
  };

  return (
    <div className="login">
      <header className="login-header">
        {/* Logo UAM */}
        <img src={logoUAM} className="login-logoUAM" alt="logoUAM"/>
        
        {/* Ícono de persona de negocios */}
        <img src={logo} className="login-iconPerson" alt="iconPerson" />
        
        <div className="login-circle" alt="circle"></div>
        
        {/* Formulario de inicio de sesión */}
        <form className="login-container" onSubmit={handleSubmit}>
          <input 
            type="text" 
            name="username" 
            placeholder="Usuario" 
            className="login-input-rectangle" 
            onChange={handleChange} 
            value={credentials.username}
            required 
          />
          <input 
            type="password" 
            name="password" 
            placeholder="Contraseña" 
            className="login-input-rectangle" 
            onChange={handleChange} 
            value={credentials.password}
            required 
          />
          
          {/* Botón de iniciar sesión */}
          <button className="login-button-iniciarSesion" type="submit">Iniciar Sesión</button>
        </form>
        
        <p>
          Copyright © Universidad Americana. Reservados todos los derechos.
        </p>
      </header>
    </div>
  );
};

export default Login;
