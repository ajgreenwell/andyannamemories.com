import React from 'react';
import NavItem from './NavItem.js';
import './main.css';

export default function NavMenu({ isLoggedIn, logout, toggleMenu }) {
  function logoutAndToggleMenu() {
    logout();
    toggleMenu();
  }

  return (
    <div>
      {isLoggedIn ?
      <div id="nav-menu">
        <NavItem href={"#photo-slideshow-location"} handleClick={toggleMenu}>photos</NavItem>
        <NavItem href={"#public-memories-location"} handleClick={toggleMenu}>public</NavItem>
        <NavItem href={"#private-memories-location"} handleClick={toggleMenu}>private</NavItem>
        <NavItem href={"#login-location"} handleClick={logoutAndToggleMenu}>logout</NavItem>
      </div> :
      <div id="nav-menu">
        <NavItem href={"#login-location"} handleClick={toggleMenu}>login</NavItem>
      </div>}
    </div>
  );
}