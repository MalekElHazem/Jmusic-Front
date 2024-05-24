import React from 'react';

const PlayerControls = ({ onPlay, onPause, onNext, onPrevious }) => {
  return (
    <div className="player-controls">
      <button onClick={onPrevious}>Previous</button>
      <button onClick={onPlay}>Play</button>
      <button onClick={onPause}>Pause</button>
      <button onClick={onNext}>Next</button>
    </div>
  );
};

export default PlayerControls;
