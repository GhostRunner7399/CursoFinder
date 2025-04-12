import React, { useState } from 'react';
import logo from './images/login/iconLoginUAMFD.svg';
import errorImage from './images/login/errorLogin.svg';
import logIcon from './images/login/logIcon.svg';
import LogoUAM from './components/Logo-UAM/logoUAM';
import './login.css';

/* PAGINA INICIAL, USER LOG IN */

const Login = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ cif: "", contraseña: "" });
  const [error, setError] = useState("");

  // Maneja los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const success = await onLogin(credentials);
      if (!success) {
        {/*credenciales invalidas, intentar de nuevo*/}
        setError("Credenciales invalidas.")
        setCredentials({ cif: "", contraseña: "" });
      } else {
        setError("");
      }
    } catch (err) {
      setError("Error al iniciar sesión. Inténtalo más tarde.");
      setCredentials({ cif: "", contraseña: "" });
      console.error(err);
    }
  };

  return (
    <div className="login">
      <header className="login-header">
        <LogoUAM />
      </header>
      
    {/*si no hay error se muestra el image principal de las personas */}
    {!error && (
      <div className="login-image-container">
        <img src={logo} className="login-iconPerson" alt="iconPerson" />
        <div className="login-circle" alt="circle"></div>
      </div>
    )}

    {/* Formulario de inicio de sesión */}
    
    <form className="login-container" onSubmit={handleSubmit}>
      <img src={logIcon} className="log-icon" alt="log"/>
      <div className="container-title">Formación Docente</div>
      <input 
        type="text" 
        name="cif" 
        placeholder={error ? "CIF Incorrecto*" : "CIF"} 
        className={`login-input-rectangle ${error ? "login-error-input-rectangle" : ""}`}
        onChange={handleChange} 
        value={credentials.cif}
        required 
      />
      <input 
        type="password" 
        name="contraseña" 
        placeholder={error ? "Contraseña Incorrecta*" : "Contraseña"} 
        className={`login-input-rectangle ${error ? "login-error-input-rectangle" : ""}`}
        onChange={handleChange} 
        value={credentials.contraseña}
        required 
      />
      {/* botón iniciar sesión */}
      <button className="login-button-iniciarSesion" type="submit">
        Iniciar Sesión</button>
      <div className="cpr">
        Copyright © Universidad Americana. Reservados todos los derechos.
      </div>
    </form>
     {/* Mostrar error image */}
     {error && (
         <div className="login-image-container"> 
           <img 
             src={errorImage} 
             className="login-error-image" 
             alt="Error" 
           />
         </div> 
      )}          
    </div>
  );
};

export default Login;
