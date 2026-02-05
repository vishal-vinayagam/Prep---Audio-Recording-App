import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import ContactPopup from '../ContactPopup/ContactPopup';
import './ProfileDropdown.css';

const ProfileDropdown = ({ user, onLogout, onRequestSignIn }) => {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [showContactPopup, setShowContactPopup] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleProfileClick = () => {
    if (!user) {
      onRequestSignIn && onRequestSignIn();
      return;
    }

    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    onLogout();
    setIsOpen(false);
  };

  const handleContactClick = () => {
    setShowContactPopup(true);
    setIsOpen(false);
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <>
      <div className="profile-dropdown-container" ref={dropdownRef}>
        <button className="profile-button" onClick={handleProfileClick}>
          {user ? (
            <div className="profile-avatar">
              {user.photoURL ? (
                <img src={user.photoURL} alt={user.displayName} className="avatar-image" />
              ) : (
                <span className="avatar-initials">
                  {getInitials(user.displayName || user.email)}
                </span>
              )}
            </div>
          ) : (
            <div className="login-indicator">Login</div>
          )}
        </button>

        {isOpen && user && (
          <div className={`dropdown-menu ${theme}`}>
            <div className="dropdown-header">
              <div className="user-info">
                <div className="user-avatar">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName} />
                  ) : (
                    <span className="user-initials">
                      {getInitials(user.displayName || user.email)}
                    </span>
                  )}
                </div>
                <div className="user-details">
                  <h4 className="user-name">{user.displayName || 'User'}</h4>
                  <p className="user-email">{user.email}</p>
                </div>
              </div>
            </div>

            <div className="dropdown-divider"></div>

            <div className="dropdown-section">
              <h5 className="section-title">Account</h5>
              <button className="dropdown-item">
                <span className="item-icon">👤</span>
                Profile Settings
              </button>
            </div>

            <div className="dropdown-section">
              <h5 className="section-title">Preferences</h5>
              <button className="dropdown-item" onClick={toggleTheme}>
                <span className="item-icon">
                  {theme === 'dark' ? '☀️' : '🌙'}
                </span>
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </button>
            </div>

            <div className="dropdown-section">
              <h5 className="section-title">Support</h5>
              <button className="dropdown-item" onClick={handleContactClick}>
                <span className="item-icon">💬</span>
                Contact & Help
              </button>
            </div>

            <div className="dropdown-divider"></div>

            <div className="dropdown-footer">
              <button className="logout-button" onClick={handleLogout}>
                <span className="logout-icon">🚪</span>
                Logout
              </button>
            </div>
          </div>
        )}
      </div>

      {showContactPopup && (
        <ContactPopup onClose={() => setShowContactPopup(false)} />
      )}
    </>
  );
};

export default ProfileDropdown;