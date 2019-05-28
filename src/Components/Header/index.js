import React from 'react';

// CSS
import './header.css';

const Header = (props) => {
    return (
      <header className="main-header">
        <div className="main-header__logo">
          <i class="fas fa-dumbbell"></i>
        </div>
  
        <div className="main-header__menu">
          <i id="menu-button" onClick={props.showMenu}class="fas fa-bars"></i>
        </div>
        
      </header>
    )
  
}

export default Header;