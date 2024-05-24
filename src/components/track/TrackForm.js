import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getTrackById, createTrack, updateTrack } from '../../services/trackService';
import { getAllAlbums } from '../../services/AlbumService';
import { getAllArtists } from '../../services/ArtistService';
import { getAllGenres } from '../../services/GenreService';
import './TrackForm.css';

const TrackForm = () => {
  const [track, setTrack] = useState({
    title: '',
    artist: '', // This should be an object containing the ID
    album: '', // This should be an object containing the ID
    genre: '', // This should be an object containing the ID
    filePath: '', // Path to the MP3 file stored on the file system
  });

  const [albums, setAlbums] = useState([]);
  const [artists, setArtists] = useState([]);
  const [genres, setGenres] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchArtists();
    fetchAlbums();
    fetchGenres();
    if (id) {
      fetchTrack(id);
    }
  }, [id]);

  const fetchTrack = async (id) => {
    const data = await getTrackById(id);
    setTrack({
      ...data,
      artist: data.artist.id, // Set the artist ID here
      album: data.album.id, // Set the album ID here
      genre: data.genre.id, // Set the genre ID here
    });
  };

  const fetchArtists = async () => {
    const data = await getAllArtists();
    setArtists(data);
  };

  const fetchAlbums = async () => {
    const data = await getAllAlbums();
    setAlbums(data);
  };

  const fetchGenres = async () => {
    const data = await getAllGenres();
    setGenres(data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTrack((prevTrack) => ({
      ...prevTrack,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        const createdupdated = await updateTrack(id, track);
        console.log('id:', id);
        console.log('Track :', track);
        console.log('Track updated:', createdupdated);
      } else {
        const createdTrack = await createTrack({
          ...track,
          artist: { id: track.artist }, // Ensure artist is sent as an object with id
          album: { id: track.album }, // Ensure album is sent as an object with id
          genre: { id: track.genre }, // Ensure genre is sent as an object with id
        });
        console.log('Track created:', createdTrack);
      }
      navigate('/tracks');
    } catch (error) {
      console.error('Failed to save track:', error);
    }
  };

  return (
    <div className="track-form-container">
      <h1 className="track-form-title">{id ? 'Edit' : 'Create'} Track</h1>
      <form className="track-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={track.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="artist">Artist:</label>
          <select
            id="artist"
            name="artist"
            value={track.artist}
            onChange={handleChange}
            required
          >
            <option value="">Select an artist</option>
            {artists.map((artist) => (
              <option key={artist.id} value={artist.id}>
                {artist.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="album">Album:</label>
          <select
            id="album"
            name="album"
            value={track.album}
            onChange={handleChange}
            required
          >
            <option value="">Select an album</option>
            {albums.map((album) => (
              <option key={album.id} value={album.id}>
                {album.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="genre">Genre:</label>
          <select
            id="genre"
            name="genre"
            value={track.genre}
            onChange={handleChange}
            required
          >
            <option value="">Select a genre</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="filePath">File Path:</label>
          <input
            type="text"
            id="filePath"
            name="filePath"
            value={track.filePath}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default TrackForm;
