import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import ProfileDropdown from '../ProfileDropdown/ProfileDropdown';
import logoImage from '../../assets/logo.png';
import './Navbar.css';

const Navbar = ({ user, onRequestSignIn, onLogout }) => {
  const { theme } = useTheme();

  return (
    <nav className={`navbar ${theme}`}>
      <div className="nav-left">
        <img src={logoImage} alt="Prep Logo" className="nav-logo" />
        <span className="app-name">Prep</span>
      </div>
      <div className="nav-right">
        <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          Home
        </NavLink>
        <NavLink to="/library" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          Library
        </NavLink>
        <div className="nav-profile">
          <ProfileDropdown user={user} onRequestSignIn={onRequestSignIn} onLogout={onLogout} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;