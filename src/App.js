import React from 'react';
import logo from './logo.svg';
import './App.css';
import ClientsList from './components/ClientsList'

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header> */}
      <ClientsList />
    </div>
  );
}

export default App;
