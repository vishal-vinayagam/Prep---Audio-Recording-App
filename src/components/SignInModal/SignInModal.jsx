import React, { useState } from 'react';
import './SignInModal.css';
import { signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, googleProvider } from '../../firebase/config';

const SignInModal = ({ onClose, onSignIn }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mode, setMode] = useState('signin'); // 'signin' or 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const u = result.user;
      const userObj = {
        uid: u.uid,
        displayName: u.displayName,
        email: u.email,
        photoURL: u.photoURL
      };
      onSignIn && onSignIn(userObj);
    } catch (err) {
      setError(err.message || 'Sign-in failed');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignUp = async (e) => {
    e.preventDefault();
    if (!email || !password || !displayName) {
      setError('Please fill all fields');
      return;
    }
    
    setLoading(true);
    setError(null);
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const u = result.user;
      const userObj = {
        uid: u.uid,
        displayName: displayName,
        email: u.email,
        photoURL: null
      };
      onSignIn && onSignIn(userObj);
    } catch (err) {
      setError(err.message || 'Sign-up failed');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill all fields');
      return;
    }
    
    setLoading(true);
    setError(null);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const u = result.user;
      const userObj = {
        uid: u.uid,
        displayName: u.displayName || email.split('@')[0],
        email: u.email,
        photoURL: null
      };
      onSignIn && onSignIn(userObj);
    } catch (err) {
      setError(err.message || 'Sign-in failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin-overlay">
      <div className="signin-modal">
        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        <h2>{mode === 'signin' ? 'Sign In' : 'Sign Up'}</h2>
        <p>{mode === 'signin' ? 'Welcome back!' : 'Create your account'}</p>

        {error && <div className="signin-error">{error}</div>}

        {mode === 'signin' ? (
          <form onSubmit={handleEmailSignIn} className="auth-form">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleEmailSignUp} className="auth-form">
            <input
              type="text"
              placeholder="Full Name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? 'Creating account...' : 'Sign Up'}
            </button>
          </form>
        )}

        <div className="auth-divider">OR</div>

        <button className="google-signin" onClick={handleGoogleSignIn} disabled={loading}>
          {loading ? 'Signing in...' : 'Continue with Google'}
        </button>

        <div className="auth-toggle">
          {mode === 'signin' ? (
            <p>Don't have an account? <button type="button" onClick={() => setMode('signup')}>Sign up</button></p>
          ) : (
            <p>Already have an account? <button type="button" onClick={() => setMode('signin')}>Sign in</button></p>
          )}
        </div>

        <div className="modal-footnote">
          <small>By signing in you agree to our terms and privacy.</small>
        </div>
      </div>
    </div>
  );
};

export default SignInModal;
