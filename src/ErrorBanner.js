import React from 'react';
import './main.css';

export default function ErrorBanner({closeErrorBanner, children}) {
  return (
    <div className="error-banner">
      <p className="error-banner-text">{children}</p>
      <button className="error-banner-button" onClick={closeErrorBanner}>
        <i className="error-banner-icon far fa-times-circle"></i>
      </button>
    </div>
  );
}