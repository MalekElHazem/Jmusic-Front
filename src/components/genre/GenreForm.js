import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getGenreById, createGenre, updateGenre } from "../../services/GenreService";
import './GenreForm.css'; // Import the CSS file

const GenreForm = () => {
  const [genre, setGenre] = useState({
    name: "",
    // Add any additional properties here
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchGenre(id);
    }
  }, [id]);

  const fetchGenre = async (id) => {
    const data = await getGenreById(id);
    setGenre(data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGenre((prevGenre) => ({ ...prevGenre, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        const updatedGenre = await updateGenre(id, genre);
        console.log("id: ", id);
        console.log("genre: ", genre);
        console.log("updatedGenre: ", updatedGenre);
      } else {
        const createdGenre = await createGenre(genre);
        console.log("id: ", id);
        console.log("genre: ", genre);
        console.log("createdGenre: ", createdGenre);
      }
      navigate("/genres");
    } catch (error) {
      console.error('Failed to save genre:', error);
    }
  };
   
  return (
    <div className="genre-form-container">
      <h1 className="genre-form-title">{id ? "Edit" : "Create"} Genre</h1>
      <form className="genre-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={genre.name}
            onChange={handleChange}
            required
          />
        </div>
        {/* Add additional fields here */}
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default GenreForm;
