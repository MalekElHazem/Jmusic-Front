import React, { useEffect, useState } from 'react';

const UserProfile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('spotifyToken');

    fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setProfile(data))
      .catch((error) => console.error('Error:', error));
  }, []);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{profile.display_name}</h1>
      <p>{profile.email}</p>
      <img src={profile.images[0]?.url} alt="Profile" />
    </div>
  );
};

export default UserProfile;
