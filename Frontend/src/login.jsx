import React, { useState } from 'react';
import logo from './images/iconLoginUAMFD.svg';
import logoUAM from './images/logoUAM.svg';
import errorImage from './images/errorLogin.svg';
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
        setError("Credenciales inválidas. Inténtalo de nuevo.");
      }
    } catch (err) {
      setError("Error al iniciar sesión. Inténtalo más tarde.");
      console.error(err);
    }
  };

  return (
    <div className="login">
      <header className="login-header">
        <img src={logoUAM} className="login-logoUAM" alt="logoUAM"/>
      </header>

      {!error && (
        <>
          <img src={logo} className="login-iconPerson" alt="iconPerson" />
          <div className="login-circle" alt="circle"></div>
        </>
      )}

        {/* Formulario de inicio de sesión */}
        <form className="login-container" onSubmit={handleSubmit}>
          <div className="container-title">UAMFD</div>
          <input 
            type="text" 
            name="cif" 
            placeholder="CIF" 
            className="login-input-rectangle" 
            onChange={handleChange} 
            value={credentials.cif}
            required 
          />
          <input 
            type="password" 
            name="contraseña" 
            placeholder="Contraseña" 
            className="login-input-rectangle" 
            onChange={handleChange} 
            value={credentials.contraseña}
            required 
          />
          
          {/* Botón de iniciar sesión */}
          <button className="login-button-iniciarSesion" type="submit">Iniciar Sesión</button>

          <div className="cpr">Copyright © Universidad Americana. Reservados todos los derechos.</div>

          {/* Mostrar error */}
          {error && (
          <>
            <img 
              src={errorImage} 
              className="login-error-image" 
              alt="Error" 
            />
            <p className="login-error">{error}</p>
          </>
        )}
        </form>
        
        
    </div>
  );
};

export default Login;
