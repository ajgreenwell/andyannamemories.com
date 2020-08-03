import React from 'react';
import NavItem from './NavItem.js';
import NavMenuToggle from './NavMenuToggle.js';
import './main.css';

export default function Navbar({ isLoggedIn, logout }) {
  return (
    <div id="navbar" className="container">
      <div id="nav-left">
        <i id="logo" className="fas fa-brain"></i>
        <div>My Memories</div>
      </div>
        {isLoggedIn ?
        <div id="nav-right">
          <NavItem href={"#photo-slideshow-location"}>photos</NavItem>
          <NavItem href={"#public-memories-location"}>public</NavItem>
          <NavItem href={"#private-memories-location"}>private</NavItem>
          <NavItem href={"#login-location"} handleClick={logout}>logout</NavItem>
        </div> :
        <div id="nav-right">
          <NavItem href={"#login-location"}>login</NavItem>
        </div>
        }
      <NavMenuToggle isLoggedIn={isLoggedIn} logout={logout} />
    </div>
  );
}