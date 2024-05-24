// src/components/BottomBar.js

import React, { useState, useEffect } from 'react';
import './BottomBar.css';

const BottomBar = () => {
  const [currentTrack, setCurrentTrack] = useState(null);

  useEffect(() => {
    // Fetch or listen to the current track playing from your state or backend
    // For this example, let's use a hardcoded track
    setCurrentTrack({
      title: "Sample Track",
      artist: "Sample Artist",
      album: "Sample Album",
      coverUrl: "https://via.placeholder.com/70",
      progress: 30, // in percentage
    });
  }, []);

  return (
    <div className="bottom-bar">
      {currentTrack && (
        <>
          <div className="track-info">
            <img src={currentTrack.coverUrl} alt="Track cover" className="track-cover" />
            <div className="track-details">
              <div className="track-title">{currentTrack.title}</div>
              <div className="track-artist">{currentTrack.artist}</div>
            </div>
          </div>
          <div className="track-controls">
            <button className="control-button">⏮️</button>
            <button className="control-button">⏯️</button>
            <button className="control-button">⏭️</button>
          </div>
          <div className="track-progress">
            <div className="progress-bar">
              <div className="progress" style={{ width: `${currentTrack.progress}%` }}></div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BottomBar;
