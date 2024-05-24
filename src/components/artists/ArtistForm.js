import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getArtistById, createArtist, updateArtist } from "../../services/ArtistService";
import './ArtistForm.css';

const ArtistForm = () => {
  const [artist, setArtist] = useState({
    name: "",
    bio: "", // Added bio to state
    albums: []
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchArtist(id);
    }
  }, [id]);

  const fetchArtist = async (id) => {
    const data = await getArtistById(id);
    setArtist(data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArtist((prevArtist) => ({ ...prevArtist, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      const updatedArtist = await updateArtist(id, artist);
      console.log("id: ", id);
      console.log("artist: ", artist);
      console.log("updatedArtist: ", updatedArtist);
    } else {
      const createdArtist = await createArtist(artist);
      console.log("id: ", id);
      console.log("artist: ", artist);
      console.log("createdArtist: ", createdArtist);
    }
    navigate("/artists");
  };
   
  return (
    <div className="artist-form-container">
      <h1 className="artist-form-title">{id ? "Edit" : "Create"} Artist</h1>
      <form className="artist-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={artist.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="bio">Bio:</label>
          <textarea
            id="bio"
            name="bio"
            value={artist.bio}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default ArtistForm;
