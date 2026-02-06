import React from 'react';
import logoImage from '../../assets/logo.png';
import './PageTransitionLoader.css';

const PageTransitionLoader = ({ show }) => {
  if (!show) return null;

  return (
    <div className="page-transition-overlay">
      <div className="transition-loader">
        <img src={logoImage} alt="Prep Logo" className="loader-logo" />
        <div className="loader-spinner"></div>
      </div>
    </div>
  );
};

export default PageTransitionLoader;
