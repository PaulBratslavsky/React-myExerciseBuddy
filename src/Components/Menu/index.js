import React from 'react';

// CSS
import './menu.css';
const Menu = (props) => {
  return (
    <div className="modal" onClick={props.showMenu}>
      <nav className="main-nav">
        <ul>
          <li>hello</li>
        </ul>
      </nav>
    </div>
    
  )
}

export default Menu;