import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { getCurrentUser, saveUser, deleteUser } from './utils/audioStorage';
import SignInModal from './components/SignInModal/SignInModal';
import { auth } from './firebase/config';
import { signOut } from 'firebase/auth';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Library from './components/Library/Library';
import Footer from './components/Footer/Footer';
import './App.css';

function App() {
  const [user, setUser] = useState(() => getCurrentUser());
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);
  const [showSignInModal, setShowSignInModal] = useState(false);

  useEffect(() => {
    // Show loading screen for 2 seconds on initial app load
    const timer = setTimeout(() => {
      setShowLoadingScreen(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleRequestSignIn = () => setShowSignInModal(true);

  const handleSignIn = (userObj) => {
    saveUser(userObj);
    setUser(userObj);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch {
      // ignore signOut errors
    }

    deleteUser();
    setUser(null);
  };

  if (showLoadingScreen) {
    return <LoadingScreen />;
  }

  return (
    <ThemeProvider>
      <Router>
        <div className="app">
          <Navbar user={user} onRequestSignIn={handleRequestSignIn} onLogout={handleLogout} />

          <main className="app-main">
            <Routes>
              <Route 
                path="/" 
                element={
                  user ? <Home user={user} /> : <Navigate to="/login" />
                } 
              />
              <Route 
                path="/library" 
                element={
                  user ? (
                    <Library user={user} />
                  ) : <Navigate to="/login" />
                } 
              />
              <Route 
                path="/login" 
                element={
                  !user ? (
                    <div className="login-page">
                      <div className="login-container">
                        <h2>Welcome to Prep</h2>
                        <p>Record, save, and manage your communication activities</p>
                        <div style={{display: 'flex', gap: '8px', justifyContent: 'center'}}>
                          <button className="login-button" onClick={handleRequestSignIn}>
                            Sign in with Google
                          </button>
                          <button className="login-button secondary" onClick={handleRequestSignIn}>
                            Sign up
                          </button>
                        </div>
                        <p className="login-note">
                          Sign in to start recording and manage your audio library
                        </p>
                      </div>
                    </div>
                  ) : <Navigate to="/" />
                } 
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>

          <Footer />
        </div>

        {showSignInModal && (
          <SignInModal
            onClose={() => setShowSignInModal(false)}
            onSignIn={(userObj) => {
              handleSignIn(userObj);
              setShowSignInModal(false);
            }}
          />
        )}
      </Router>
    </ThemeProvider>
  );
}

export default App;