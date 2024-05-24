// src/components/Tracks.jsx

import React, { useState, useEffect } from 'react';

const Tracks = () => {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    fetchTracks();
  }, []);

  const fetchTracks = async () => {
    try {
      const response = await fetch('http://localhost:8001/tracks');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setTracks(data);
    } catch (error) {
      console.error('Error fetching tracks:', error);
    }
  };

  return (
    <div>
      <h1>All Tracks</h1>
      <ul>
        {tracks.map(track => (
          <li key={track.id}>
            {track.title || 'null'} - {track.artist?.name || 'null'} ({track.album?.title || 'null'})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tracks;
