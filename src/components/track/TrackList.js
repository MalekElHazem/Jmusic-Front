import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { deleteTrack, getAllTracks } from '../../services/trackService';
import { MaterialReactTable } from 'material-react-table';
import './TrackList.css'; // Import the CSS file
import useSound from 'use-sound';
import Coldplay from '../Coldplay.mp3';

const TrackList = () => {
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);

  let audio = new Audio(Coldplay)

  const start = () => {
    audio.play()
  }

  //pause
  const pause = () => {
    audio.pause()
  }

  

  useEffect(() => {
    setCurrentTrack("../Coldplay.mp3");
    fetchTracks();
  }, []);

  const fetchTracks = async () => {
    try {
      const data = await getAllTracks();
      setTracks(data);
      console.log('All tracks:', data);
    } catch (error) {
      console.error('Failed to fetch tracks:', error);
    }
  };

  const handlePlay = (filePath) => {
    setCurrentTrack(filePath);
    console.log("fillle", filePath);
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: 'title',
        header: 'Title',
        size: 150,
      },
      {
        accessorKey: 'artist.name',
        header: 'Artist',
        size: 150,
      },
      {
        accessorKey: 'album.name',
        header: 'Album',
        size: 150,
      },
      {
        accessorKey: 'genre.name',
        header: 'Genre',
        size: 150,
      },
      {
        accessorKey: 'id',
        header: 'Play',
        Cell: ({ cell }) => (
          <button onClick={start}>Play</button>
        ),
        size: 100,
      },
      {
        accessorKey: 'id',
        header: 'Actions',
        Cell: ({ cell }) => (
          <div>
            <Link to={`/tracks/${cell.getValue()}`}>Edit</Link>
            <button onClick={() => handleDelete(cell.getValue())}>Delete</button>
          </div>
        ),
        size: 150,
      },
    ],
    []
  );

  const handleDelete = async (id) => {
    try {
      await deleteTrack(id);
      fetchTracks();
      console.log(`Deleting track with id ${id}`);
    } catch (error) {
      console.error(`Failed to delete track with id ${id}:`, error);
    }
  };

  return (
    <div className="track-list-container">
      <h1>Tracks</h1>
      <button onClick={start}>Play</button>
      <button onClick={pause}>Pause</button>
      <audio controls>
              <source src={currentTrack} type="audio/mpeg" />
              Your browser does not support the audio element.
      </audio>
      <Link to="/tracks/new">Create New Track</Link>
      <div className="table-container">
        {tracks && tracks.length > 0 ? (
          <MaterialReactTable columns={columns} data={tracks} />
        ) : (
          <p>No tracks found.</p>
        )}
      </div>
    </div>
  );
};

export default TrackList;
