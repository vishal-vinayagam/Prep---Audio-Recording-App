import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useForm, ValidationError } from '@formspree/react';
import './ContactPopup.css';

const ContactPopup = ({ onClose }) => {
  const { theme } = useTheme();
  const [state, handleSubmit] = useForm("xkgwbgwa");
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (state.succeeded) {
    return (
      <div className="popup-overlay" onClick={onClose}>
        <div className={`contact-popup ${theme}`} onClick={(e) => e.stopPropagation()}>
          <div className="popup-header">
            <h2>Thank You!</h2>
            <button className="close-button" onClick={onClose}>×</button>
          </div>
          <div className="success-message">
            <div className="success-icon">✓</div>
            <h3>Message Sent Successfully</h3>
            <p>We'll get back to you as soon as possible.</p>
            <button className="close-success-button" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className={`contact-popup ${theme}`} onClick={(e) => e.stopPropagation()}>
        <div className="popup-header">
          <h2>Contact & Help</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your name"
            />
            <ValidationError prefix="Name" field="name" errors={state.errors} />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
            <ValidationError prefix="Email" field="email" errors={state.errors} />
          </div>

          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <select
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            >
              <option value="">Select a subject</option>
              <option value="feedback">Feedback</option>
              <option value="bug">Bug Report</option>
              <option value="feature">Feature Request</option>
              <option value="help">Need Help</option>
              <option value="other">Other</option>
            </select>
            <ValidationError prefix="Subject" field="subject" errors={state.errors} />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
              placeholder="Describe your query or feedback..."
            />
            <ValidationError prefix="Message" field="message" errors={state.errors} />
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              className="cancel-button" 
              onClick={onClose}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="submit-button"
              disabled={state.submitting}
            >
              {state.submitting ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </form>

        <div className="contact-info">
          <h3>Need Immediate Help?</h3>
          <p>Email us at: <a href="mailto:support@prep.com">support@prep.com</a></p>
          <p>We typically respond within 24 hours.</p>
        </div>
      </div>
    </div>
  );
};

export default ContactPopup;