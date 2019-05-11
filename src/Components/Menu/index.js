import React from 'react';
import { Link } from 'react-router-dom';

// CSS
import './menu.css';
const Menu = (props) => {
  return (
    <div className="modal" onClick={props.showMenu}>
      <nav className="main-nav">
        <ul>
          <li><Link to="/">HOME</Link></li>
          <li><Link to="/add-exercise">ADD EXERCISE</Link></li>
          <li><Link to="/my-favorites">FAVORITES</Link></li>
          <li><Link to="/my-routnes">MY ROUTINES</Link></li>
        </ul>
      </nav>
    </div>
    
  )
}

export default Menu;