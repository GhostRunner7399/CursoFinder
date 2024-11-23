import logo from './icon2.svg';
import logoUAM from './logoUAM.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="App-circle"></div> {}
        {/*logo uam*/}
        <img src={logoUAM} className="App-logoUAM" alt="logoUAM"/>
        {/*business person icon*/}
        <img src={logo} className="App-logo" alt="logo" />
        {/*creacion de rectangulos*/} 
        <div className="container">
    <input type="text" placeholder="Username" className="input-rectangle"/>
    <input type="password" placeholder="Password" className="input-rectangle"/>
        </div>
        <p>
          ESTA ES UNA PRUEBA CREO QUE ACA PONDRIAMOS EL COPYRIGHT AUNQUE NI SE PARA Q SIRVE
        </p>
      </header>
    </div>
  );
}

export default App;
