import React, { useState } from 'react';
import logo from './images/icon2.svg';
import logoUAM from './images/logoUAM.svg';
import Courses from './courses.jsx'; 
import './login.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  if (isLoggedIn) {
    return <Courses />;
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logoUAM} className="App-logoUAM" alt="logoUAM"/>
        <img src={logo} className="App-iconPerson" alt="iconPerson" />
        <div className="container">
          <input type="text" placeholder="usuario" className="input-rectangle"/>
          <input type="password" placeholder="contraseña" className="input-rectangle"/>
        </div>
        <button className="button-iniciarSesion" onClick={handleLogin} >iniciar sesión</button>
        <p>
          Copyright © Universidad Americana. Reservados todos los derechos.
        </p>
      </header>
    </div>
  );
}

export default App;