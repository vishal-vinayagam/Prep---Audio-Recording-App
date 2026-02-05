import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import AudioPlayer from '../AudioPlayer/AudioPlayer';
import { formatDate } from '../../utils/dateFormatter';
import './AudioCard.css';

const AudioCard = ({ recording, onDelete }) => {
  const { theme } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleDelete = () => {
    if (onDelete) {
      onDelete(recording.id);
    }
  };

  const [showShare, setShowShare] = useState(false);

  const handleShare = async () => {
    // Try Web Share API first
    if (navigator.share) {
      try {
        await navigator.share({
          title: recording.title,
          text: `Listen to ${recording.title}`,
          url: recording.url
        });
        return;
      } catch {
        // ignore
      }
    }

    setShowShare((s) => !s);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(recording.url);
      alert('Link copied to clipboard');
      setShowShare(false);
    } catch {
      alert('Copy failed');
    }
  };

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = recording.url;
    const safeName = (recording.title || 'recording').replace(/[^a-z0-9._-]/gi, '_');
    a.download = `${safeName}.webm`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setShowShare(false);
  };

  const handleShareEmail = () => {
    const subject = encodeURIComponent(`Audio: ${recording.title}`);
    const body = encodeURIComponent(`Hi,\n\nI wanted to share this audio with you: ${recording.title}\n\n(You may need to download the file to attach it)\n\n` + recording.url);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
    setShowShare(false);
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(`${recording.title} - ${recording.url}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
    setShowShare(false);
  };

  const handleShareTwitter = () => {
    const text = encodeURIComponent(`${recording.title}`);
    const url = encodeURIComponent(recording.url);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
    setShowShare(false);
  };

  return (
    <div className={`audio-card ${theme} ${isExpanded ? 'expanded' : ''}`}>
      <div className="card-header" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="card-info">
          <h3 className="card-title">{recording.title}</h3>
          <div className="card-meta">
            <span className="card-date">{formatDate(recording.date)}</span>
            <span className="card-duration">{Math.round(recording.duration)}s</span>
          </div>
        </div>
        <button 
          className="expand-button"
          aria-label={isExpanded ? 'Collapse' : 'Expand'}
        >
          <div className={`expand-icon ${isExpanded ? 'expanded' : ''}`}></div>
        </button>
      </div>

      {isExpanded && (
        <div className="card-content">
          <AudioPlayer
            audioUrl={recording.url}
            title={recording.title}
            date={recording.date}
            duration={recording.duration}
          />
          
          <div className="card-actions">
            <button className="action-button share-button" onClick={handleShare}>
              Share
            </button>
            <button className="action-button delete-button" onClick={handleDelete}>
              Delete
            </button>
          </div>

          {showShare && (
            <div className="share-panel">
              <button className="share-item" onClick={handleShareWhatsApp}>WhatsApp</button>
              <button className="share-item" onClick={handleShareTwitter}>Twitter</button>
              <button className="share-item" onClick={handleShareEmail}>Email</button>
              <button className="share-item" onClick={handleCopyLink}>Copy Link</button>
              <button className="share-item" onClick={handleDownload}>Download</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AudioCard;