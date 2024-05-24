import React from 'react';

const Playlist = ({ tracks, onSelectTrack }) => {
  return (
    <div className="playlist">
      <h2>Playlist</h2>
      <ul>
        {tracks.map((track, index) => (
          <li key={index} onClick={() => onSelectTrack(track)}>
            {track.title} - {track.artist}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Playlist;
