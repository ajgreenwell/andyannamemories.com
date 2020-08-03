import React from 'react';
import './main.css';

export default function NavItem({ href, children, handleClick }) {
  return (<a href={href} className="nav-item" onClick={handleClick}>{children}</a>);
}