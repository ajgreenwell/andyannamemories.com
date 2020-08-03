import React, { useState } from 'react';
import { password } from './config.js';
import './main.css';

export default function LoginPortal({ login, setIsLoginError }) {
  const [passwordValue, setPasswordValue] = useState('');

  function tryLogin() {
    if (password === passwordValue)
      login();
    else
      setIsLoginError(true);
  }

  return (
    <div id="login-portal">
      <div id="login-location"></div>
      <h1 id="login-header">You Are Not Logged In.</h1>
      <p id="login-subheader">
        In order to access your memories, you must enter the password below.
        If you can't remember the password, just ask Andy.
      </p>
      <div id="login-form">
        <h3 id="password-label">Password:</h3>
        <input
          id="password-field"
          type="text"
          value={passwordValue}
          onChange={(e) => setPasswordValue(e.target.value)}
        />
        <button id="login-button" onClick={tryLogin} >
          <i className="login-icon fas fa-sign-in-alt"></i>
          Login
        </button>
      </div>
    </div>
  );
}