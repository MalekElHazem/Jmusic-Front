import React from 'react';
import './Home.css';
//import useSound from 'use-sound';
import Coldplay from './Coldplay.mp3';

function Home() {

  let audio = new Audio(Coldplay)

  const start = () => {
    audio.play()
  }


  return (
    <div className="home-content">
      <h2>Manage Your Music Library</h2>
        <p>With Jmusic, you can easily manage all aspects of your music library including users, tracks, genres, artists, albums, and playlists. Use the links below to navigate to the various sections of the app.</p>
        
      <audio controls>
        <source src={Coldplay} type="audio/mpeg" />
            Your browser does not support the audio element.
      </audio>
      < div >
      <button onClick={start}>Play</button>
    </div >
    </div>
  );
}

export default Home;
