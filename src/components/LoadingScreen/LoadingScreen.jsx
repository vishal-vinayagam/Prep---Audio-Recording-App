import React from 'react';
import './LoadingScreen.css';

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="loading-logo">
        <div className="logo-container">
          <img src="/logo.png" alt="Prep Logo" className="logo" />
        </div>
        <h1>Prep</h1>
        <div className="loading-dots">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;