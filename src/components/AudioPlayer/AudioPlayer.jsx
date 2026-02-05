import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { formatDate } from '../../utils/dateFormatter';
import './AudioPlayer.css';

const AudioPlayer = ({ audioUrl, title, date, duration }) => {
  const { theme } = useTheme();
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [audioDuration, setAudioDuration] = useState(duration || 0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const handleEnded = () => setIsPlaying(false);
    const setDurationFromAudio = () => setAudioDuration(audio.duration || duration || 0);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('loadedmetadata', setDurationFromAudio);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('loadedmetadata', setDurationFromAudio);
    };
  }, [duration]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const value = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = value;
      setCurrentTime(value);
    }
  };

  const handleVolumeChange = (e) => {
    const value = parseFloat(e.target.value);
    setVolume(value);
    if (audioRef.current) {
      audioRef.current.volume = value;
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <div className={`audio-player ${theme}`}>
      <audio ref={audioRef} src={audioUrl} preload="metadata" />
      
      <div className="player-header">
        <h3 className="audio-title">{title}</h3>
        <div className="audio-meta">
          <span className="audio-date">{formatDate(date)}</span>
          <span className="audio-duration">{formatTime(duration)}</span>
        </div>
      </div>

      <div className="player-controls">
        <button 
          className="play-button" 
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <div className="pause-icon"></div>
          ) : (
            <div className="play-icon"></div>
          )}
        </button>

        <div className="seek-control">
          <span className="time-current">{formatTime(currentTime)}</span>
          <input
            type="range"
            className="seek-slider"
            min="0"
            max={audioDuration}
            value={currentTime}
            onChange={handleSeek}
            aria-label="Seek audio"
          />
          <span className="time-total">{formatTime(duration)}</span>
        </div>

        <div className="volume-control">
          <div className="volume-icon"></div>
          <input
            type="range"
            className="volume-slider"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            aria-label="Volume control"
          />
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;