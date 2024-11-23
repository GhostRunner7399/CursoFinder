import logo from './images/icon2.svg';
import logoUAM from './images/logoUAM.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="App-circle"></div> {}
        {/*logo uam*/}
        <img src={logoUAM} className="App-logoUAM" alt="logoUAM"/>
        {/*business person icon*/}
        <img src={logo} className="App-iconPerson" alt="iconPerson" />
        {/*creacion de botones username password*/} 
        <div className="container">
    <input type="text" placeholder="usuario" className="input-rectangle"/>
    <input type="password" placeholder="contraseña" className="input-rectangle"/>
        </div>
        {/*boton iniciar sesion*/ }
        <button className="button-iniciarSesion">iniciar sesión</button>
        <p>
        Copyright © Universidad Americana. Reservados todos los derechos.
        </p>
      </header>
    </div>
  );
}

export default App;
