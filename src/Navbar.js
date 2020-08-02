import React from 'react';
import NavMenuToggle from './NavMenuToggle.js';
import './main.css';

export default function Navbar() {
  return (
    <div id="navbar" className="container">
      <div id="nav-left">
        <i id="logo" className="fas fa-brain"></i>
        <div>My Memories</div>
      </div>
      <div id="nav-right">
        <a href="#photo-slideshow-location" className="nav-item">photos</a>
        <a href="#public-memories-location" className="nav-item">public</a>
        <a href="#private-memories-location" className="nav-item">private</a>
      </div>
      <NavMenuToggle />
    </div>
  );
}