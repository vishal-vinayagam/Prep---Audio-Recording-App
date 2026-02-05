import React, { useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import './RecordingButton.css';

const RecordingButton = ({ isRecording, onStart, onStop, recordingTime, formatTime }) => {
  const { theme } = useTheme();

  useEffect(() => {
    let audioContext;
    let analyser;
    let source;
    let dataArray;
    let animationId;

    if (isRecording && window.AudioContext) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          audioContext = new AudioContext();
          analyser = audioContext.createAnalyser();
          source = audioContext.createMediaStreamSource(stream);
          source.connect(analyser);
          analyser.fftSize = 256;
          dataArray = new Uint8Array(analyser.frequencyBinCount);

          const draw = () => {
            if (!analyser) return;
            
            analyser.getByteFrequencyData(dataArray);
            const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
            const intensity = Math.min(average / 128, 1);
            
            document.documentElement.style.setProperty('--pulse-intensity', intensity);
            animationId = requestAnimationFrame(draw);
          };
          
          draw();
        })
        .catch(err => console.error('Error accessing audio:', err));
    }

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isRecording]);

  return (
    <div className={`recording-container ${theme}`}>
      <div className="recording-visualizer">
        {isRecording && (
          <>
            <div className="pulse-ring"></div>
            <div className="pulse-ring delay-1"></div>
            <div className="pulse-ring delay-2"></div>
          </>
        )}
        <button
          className={`record-button ${isRecording ? 'recording' : ''}`}
          onClick={isRecording ? onStop : onStart}
          aria-label={isRecording ? 'Stop recording' : 'Start recording'}
        >
          <div className="button-inner">
            {isRecording ? (
              <div className="stop-icon"></div>
            ) : (
              <div className="mic-icon"></div>
            )}
          </div>
        </button>
      </div>
      
      {isRecording && (
        <div className="recording-info">
          <div className="recording-indicator">
            <div className="recording-dot"></div>
            <span>Recording</span>
          </div>
          <div className="recording-timer">{formatTime(recordingTime)}</div>
        </div>
      )}
      
      {!isRecording && !recordingTime && (
        <p className="instruction">Click to start recording your communication</p>
      )}
    </div>
  );
};

export default RecordingButton;