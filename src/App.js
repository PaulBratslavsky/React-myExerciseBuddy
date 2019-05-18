import React from 'react';
import { BrowserRouter } from "react-router-dom";
import Routes from './Routes';
import './firebase.js';

// CSS
import './main.css';

function App() {
  return (
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
  );
}

export default App;
