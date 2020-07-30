import React from 'react';
import NavMenuToggle from './NavMenuToggle.js';
import './main.css';

export default function Navbar() {
  return (
    <div id="navbar" className="container">
      <div id="nav-left">
        <i id="logo" className="fas fa-brain"></i>
        <div>MyMemories Editor</div>
      </div>
      <div id="nav-right">
        <a href="#photo-slideshow-location" className="nav-item">photos</a>
        <a href="#clean-memories-location" className="nav-item">clean</a>
        <a href="#dirty-memories-location" className="nav-item">dirty</a>
      </div>
      <NavMenuToggle />
    </div>
  );
}