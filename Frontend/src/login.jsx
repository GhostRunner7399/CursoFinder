import React, { useState } from 'react';
import logo from './images/login/iconLoginUAMFD.svg';
import errorImage from './images/login/errorLogin.svg';
import logIcon from './images/login/logIcon.svg';
import LogoUAM from './components/Logo-UAM/logoUAM';
import { motion } from "framer-motion";
import './login.css';

/* PAGINA INICIAL, USER LOG IN */

const Login = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ cif: "", contraseña: "" });
  const [error, setError] = useState("");
  //POR SI ACAAA SE DEJA EL SHAKE DE LOGIN ERROR
  //const [shakeTrigger, setShakeTrigger] = useState(0);


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
        //credenciales invalidas, intentar de nuevo
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
        {/*<img src={logo} className="login-iconPerson" alt="iconPerson" />*/}
        {/*animacion para que la imagen baje lentam*/}
        <motion.img 
        src={logo} 
        className="login-iconPerson" 
        alt="iconPerson"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
/>

        <div className="login-circle" alt="circle"></div>
      </div>
    )}

    {/* Formulario de inicio de sesión */}
    
   {/*<form className="login-container" onSubmit={handleSubmit}>*/}

  {/* ANIMACION ENTRADA DE ABAJO HACIA ARRIBA */}
   {/*<motion.form
  className="login-container"
  onSubmit={handleSubmit}
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
>*/}

{/* SHAKE AL MENSAJE DE ERROR CON LA ENTRADA*/}
<motion.form
  className="login-container"
  onSubmit={handleSubmit}
  initial={{ opacity: 0, y: 30 }}
  animate={{
    opacity: 1,
    y: 0,
    x: error ? [0, -10, 10, -10, 10, 0] : 0
  }}
  transition={{
    opacity: { duration: 0.8, ease: "easeOut" },
    y: { duration: 0.8, ease: "easeOut" },
    x: error ? { duration: 0.6, ease: "easeInOut" } : { duration: 0 }
  }}
>

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
      {/*<button className="login-button-iniciarSesion" type="submit">
       Iniciar Sesión</button>*/}
       {/*animacion para el boton al posicionarse en el*/}
      <motion.button
      className="login-button-iniciarSesion"
      type="submit"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
    Iniciar Sesión
    </motion.button>

      <div className="cpr">
        Copyright © Universidad Americana. Reservados todos los derechos.
      </div>
    </motion.form>
     {/* Mostrar error image */}
     {/*{error && (
         <div className="login-image-container"> 
           <img 
             src={errorImage} 
             className="login-error-image" 
             alt="Error" 
           />
         </div> 
      )} */ } 
      {error && (
  <motion.div 
    className="login-image-container"
    initial={{ opacity: 0, x: -100 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
  > 
    <img 
      src={errorImage} 
      className="login-error-image" 
      alt="Error" 
    />
  </motion.div>
)}
       
    </div>
  );
};

export default Login;
