import React, { useState } from 'react';
import NavMenu from './NavMenu.js';
import './main.css';

export default function NavMenuToggle(props) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleIsOpen() {
    setIsOpen(!isOpen);
  }

  return (
    <div id="nav-menu-toggle">
      <button className={isOpen ? 'nav-button-fixed nav-button' : 'nav-button'} onClick={toggleIsOpen}>
        <i className="fas fa-bars"></i>
      </button>
      {isOpen && <NavMenu toggleMenu={toggleIsOpen}/>}
    </div>
  );
}