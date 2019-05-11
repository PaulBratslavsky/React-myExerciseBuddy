import React from 'react';

// CSS
import './header.css';

const Header = (props) => {
  return (
    <header className="main-header">
      <div className="main-header__logo">
        <h1>My Exercise Buddy</h1>
      </div>

      <div className="main-header__menu">
        <i onClick={props.showMenu}class="fas fa-bars"></i>
      </div>
    </header>
  )
}

export default Header;