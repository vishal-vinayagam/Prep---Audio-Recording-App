import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import AudioCard from '../AudioCard/AudioCard';
import { getRecordings, deleteRecording } from '../../utils/audioStorage';
import './Library.css';

const Library = ({ user }) => {
  const { theme } = useTheme();
  const [recordings, setRecordings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (!user) return;

    const fetchRecordings = async () => {
      setIsLoading(true);
      try {
        const userRecordings = await getRecordings(user.uid);
        setRecordings(userRecordings);
      } catch (error) {
        console.error('Error loading recordings:', error);
        setRecordings([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecordings();
  }, [user]);

  const loadRecordings = async () => {
    setIsLoading(true);
    try {
      const userRecordings = await getRecordings(user.uid);
      setRecordings(userRecordings);
    } catch (error) {
      console.error('Error loading recordings:', error);
      setRecordings([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this recording?')) {
      try {
        await deleteRecording(id, user.uid);
        await loadRecordings(); // Refresh the list
      } catch (error) {
        console.error('Error deleting recording:', error);
        alert('Failed to delete recording');
      }
    }
  };

  const filteredRecordings = recordings.filter(recording => {
    if (filter === 'all') return true;
    if (filter === 'recent') {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return new Date(recording.date) > weekAgo;
    }
    if (filter === 'oldest') {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return new Date(recording.date) <= weekAgo;
    }
    return true;
  });

  const storageKB = Math.round(recordings.reduce((acc, rec) => acc + (rec.size || 0), 0) / 1024);

  return (
    <div className={`library-container ${theme}`}>
      <div className="library-header">
        <div className="library-topline">
          <div className="library-title-group">
            <h1>My Library</h1>
            <div className="library-stats-inline">
              <span>Total: <strong>{recordings.length}</strong></span>
              <span>Storage: <strong>{storageKB} KB</strong></span>
            </div>
          </div>

          <div className="library-filters">
            <button
              className={`filter-button ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button
              className={`filter-button ${filter === 'recent' ? 'active' : ''}`}
              onClick={() => setFilter('recent')}
            >
              Recent
            </button>
            <button
              className={`filter-button ${filter === 'oldest' ? 'active' : ''}`}
              onClick={() => setFilter('oldest')}
            >
              Oldest
            </button>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading your recordings...</p>
        </div>
      ) : filteredRecordings.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🎤</div>
          <h2>No recordings yet</h2>
          <p>Start recording your first communication activity!</p>
          <p className="storage-note">
            Recordings are stored locally in your browser
          </p>
        </div>
      ) : (
        <div className="recordings-grid">
          {filteredRecordings.map((recording) => (
            <AudioCard
              key={recording.id}
              recording={recording}
              onDelete={() => handleDelete(recording.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Library;