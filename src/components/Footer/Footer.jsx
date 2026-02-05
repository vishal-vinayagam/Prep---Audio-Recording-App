import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import './Footer.css';

const Footer = () => {
  const { theme } = useTheme();

  return (
    <footer className={`footer ${theme}`}>
      <div className="footer-content">
        <div className="footer-section">
          <img src="/logo.png" alt="Prep Logo" className="footer-logo" />
          <span className="app-name">Prep</span>
        </div>
        <div className="footer-section">
          <p className="creator-text">
            Created by Vishal with <span className="heart">❤️</span>
          </p>
        </div>
        <div className="footer-section">
          <p className="copyright">
            © {new Date().getFullYear()} Prep. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;