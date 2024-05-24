// src/services/GenreService.js

const API_URL = 'http://localhost:8001/genres';

const getAllGenres = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

const getGenreById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  return response.json();
};

const createGenre = async (genre) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(genre),
  });
  return response.json();
};

const updateGenre = async (id, genre) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(genre),
  });
  return response.json();
};

const deleteGenre = async (id) => {
  await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
};

export { getAllGenres, getGenreById, createGenre, updateGenre, deleteGenre };
