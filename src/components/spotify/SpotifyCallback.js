import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const SpotifyCallback = () => {
  const history = useHistory();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');

    if (code) {
      fetch('http://localhost:8001/spotify/callback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      })
        .then((response) => response.json())
        .then((data) => {
          localStorage.setItem('spotifyToken', data.access_token);
          history.push('/home');
        })
        .catch((error) => console.error('Error:', error));
    }
  }, [history]);

  return <div>Loading...</div>;
};

export default SpotifyCallback;
