import React from 'react';

const Track = ({ title, artist }) => {
  return (
    <div className="track">
      <p>Title: {title}</p>
      <p>Artist: {artist}</p>
    </div>
  );
};

export default Track;
