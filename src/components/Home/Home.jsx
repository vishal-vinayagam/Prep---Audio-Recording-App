import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import RecordingButton from '../RecordingButton/RecordingButton';
import AudioPlayer from '../AudioPlayer/AudioPlayer';
import useAudioRecorder from '../../hook/useAudioRecorder';
import { saveRecording } from '../../utils/audioStorage';
import './Home.css';

const Home = ({ user }) => {
  const { theme } = useTheme();
  const [savedAudio, setSavedAudio] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showSavedToast, setShowSavedToast] = useState(false);
  
  const {
    isRecording,
    audioURL,
    audioBlob,
    recordingTime,
    startRecording,
    stopRecording,
    resetRecording,
    formatTime
  } = useAudioRecorder();

  const handleSaveRecording = async () => {
    if (!audioBlob || !user) return;
    
    setIsSaving(true);
    try {
      const savedAudioData = await saveRecording(audioBlob, user.uid);
      setSavedAudio(savedAudioData);
      setShowSavedToast(true);
      setTimeout(() => setShowSavedToast(false), 3500);
    } catch (error) {
      console.error('Error saving recording:', error);
      alert('Failed to save recording');
    } finally {
      setIsSaving(false);
    }
  };

  const handleNewRecording = () => {
    resetRecording();
    setSavedAudio(null);
  };

  return (
    <div className={`home-container ${theme}`}>
      <div className="home-header">
        <div className="header-right">
          <span className="welcome-text">Welcome, {user?.displayName || 'Demo User'}</span>
        </div>
      </div>

      <div className="main-content">
        <RecordingButton
          isRecording={isRecording}
          onStart={startRecording}
          onStop={stopRecording}
          recordingTime={recordingTime}
          formatTime={formatTime}
        />

        {(audioURL || savedAudio) && (
          <div className="audio-controls">
            {showSavedToast && (
              <div className="save-toast">Saved to library ✓</div>
            )}
            <AudioPlayer
              audioUrl={savedAudio?.url || audioURL}
              title={savedAudio?.title || 'New Recording'}
              date={savedAudio?.date || new Date().toISOString()}
              duration={savedAudio?.duration || recordingTime}
            />
            
            {audioURL && !savedAudio && (
              <div className="save-actions">
                <button
                  className="save-button"
                  onClick={handleSaveRecording}
                  disabled={isSaving || !user}
                >
                  {isSaving ? 'Saving...' : 'Save to Library'}
                </button>
                <button
                  className="discard-button"
                  onClick={handleNewRecording}
                  disabled={isSaving}
                >
                  Discard
                </button>
              </div>
            )}
            
            {savedAudio && (
              <div className="saved-actions">
                <button className="new-record-button" onClick={handleNewRecording}>
                  Start New Recording
                </button>
                <p className="saved-notice">✓ Saved to your local library</p>
              </div>
            )}
          </div>
        )}
        
        {!audioURL && !savedAudio && (
          <div className="features-list">
            <h2>Features</h2>
            <ul>
              <li>Record unlimited audio notes</li>
              <li>Store locally in your browser</li>
              <li>Organize in personal library</li>
              <li>No internet required</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;