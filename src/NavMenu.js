import React from 'react';
import './main.css';

export default function NavMenu({ toggleMenu }) {
  return (
    <div id="nav-menu">
      <a href="#photo-slideshow-location" className="nav-item" onClick={toggleMenu}>photos</a>
      <a href="#clean-memories-location" className="nav-item" onClick={toggleMenu}>clean memories</a>
      <a href="#dirty-memories-location" className="nav-item" onClick={toggleMenu}>dirty memories</a>
    </div>
  );
}