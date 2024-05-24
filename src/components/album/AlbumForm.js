import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAlbumById, createAlbum, updateAlbum } from '../../services/AlbumService';
import { getAllArtists } from '../../services/ArtistService';
import './AlbumForm.css';

const AlbumForm = () => {
  const [album, setAlbum] = useState({
    name: '',
    releaseDate: '',
    artist: '', // This should be an object containing the ID
  });

  const [artists, setArtists] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchArtists();
    if (id) {
      fetchAlbum(id);
    }
  }, [id]);

  const fetchAlbum = async (id) => {
    const data = await getAlbumById(id);
    setAlbum({
      ...data,
      artist: data.artist.id, // Set the artist ID here
    });
  };

  const fetchArtists = async () => {
    const data = await getAllArtists();
    setArtists(data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAlbum((prevAlbum) => ({
      ...prevAlbum,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateAlbum(id, album);
        console.log('Album updated:', album);
      } else {
        const createdAlbum = await createAlbum({
          ...album,
          artist: { id: album.artist }, // Ensure artist is sent as an object with id
        });
        console.log('Album created:', createdAlbum);
      }
      navigate('/albums');
    } catch (error) {
      console.error('Failed to save album:', error);
    }
  };

  return (
    <div className="album-form-container">
      <h1 className="album-form-title">{id ? 'Edit' : 'Create'} Album</h1>
      <form className="album-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={album.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="releaseDate">Release Date:</label>
          <input
            type="date"
            id="releaseDate"
            name="releaseDate"
            value={album.releaseDate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="artist">Artist:</label>
          <select
            id="artist"
            name="artist"
            value={album.artist}
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
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default AlbumForm;
