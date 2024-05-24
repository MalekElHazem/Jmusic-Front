import React from 'react';

const SpotifyLogin = () => {
  const handleLogin = () => {
    const clientId = 'your_client_id';
    const redirectUri = 'http://localhost:3000/login/callback';
    const scope = 'user-read-private user-read-email';
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scope}`;

    window.location.href = authUrl;
  };

  return (
    <div>
      <button onClick={handleLogin}>Login with Spotify</button>
    </div>
  );
};

export default SpotifyLogin;
