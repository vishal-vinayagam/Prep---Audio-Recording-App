// Local storage utilities for audio recordings

const STORAGE_KEY = 'prep_recordings';

export const saveRecording = async (audioBlob, userId) => {
  try {
    // Generate unique ID
    const id = `rec_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Convert blob to base64 for persistent storage
    const base64Audio = await blobToBase64(audioBlob);
    
    // Create recording object
    const recordingData = {
      id,
      userId,
      title: `Recording ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
      url: base64Audio,
      duration: Math.floor(Math.random() * 300) + 30, // Simulated duration (30-330 seconds)
      date: new Date().toISOString(),
      size: audioBlob.size
    };
    
    // Save to localStorage
    const recordings = getRecordingsFromStorage(userId);
    recordings.push(recordingData);
    saveRecordingsToStorage(userId, recordings);
    
    return recordingData;
  } catch (error) {
    console.error('Error saving recording:', error);
    throw error;
  }
};

// Helper to convert blob to base64
const blobToBase64 = (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

export const getRecordings = async (userId) => {
  try {
    return getRecordingsFromStorage(userId);
  } catch (error) {
    console.error('Error getting recordings:', error);
    return [];
  }
};

export const deleteRecording = async (recordingId, userId) => {
  try {
    const recordings = getRecordingsFromStorage(userId);
    const filteredRecordings = recordings.filter(rec => rec.id !== recordingId);
    saveRecordingsToStorage(userId, filteredRecordings);
    
    return true;
  } catch (error) {
    console.error('Error deleting recording:', error);
    throw error;
  }
};

// Helper functions
const getRecordingsFromStorage = (userId) => {
  try {
    const storageKey = `${STORAGE_KEY}_${userId}`;
    const data = localStorage.getItem(storageKey);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return [];
  }
};

const saveRecordingsToStorage = (userId, recordings) => {
  try {
    const storageKey = `${STORAGE_KEY}_${userId}`;
    localStorage.setItem(storageKey, JSON.stringify(recordings));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

// Simulate Firebase authentication with local user
export const getCurrentUser = () => {
  try {
    const userData = localStorage.getItem('prep_user');
    return userData ? JSON.parse(userData) : null;
  } catch {
    return null;
  }
};

export const saveUser = (user) => {
  try {
    localStorage.setItem('prep_user', JSON.stringify(user));
  } catch (error) {
    console.error('Error saving user:', error);
  }
};

export const deleteUser = () => {
  try {
    localStorage.removeItem('prep_user');
  } catch (error) {
    console.error('Error deleting user:', error);
  }
};