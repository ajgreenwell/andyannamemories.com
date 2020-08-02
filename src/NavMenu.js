import React from 'react';
import './main.css';

export default function NavMenu({ toggleMenu }) {
  return (
    <div id="nav-menu">
      <a href="#photo-slideshow-location" className="nav-item" onClick={toggleMenu}>photos</a>
      <a href="#public-memories-location" className="nav-item" onClick={toggleMenu}>public memories</a>
      <a href="#private-memories-location" className="nav-item" onClick={toggleMenu}>private memories</a>
    </div>
  );
}