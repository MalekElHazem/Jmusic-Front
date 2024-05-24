// src/services/ArtistService.js

const API_URL = "http://localhost:8001/artists";

const getAllArtists = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

const getArtistById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  return response.json();
};

const createArtist = async (artist) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(artist),
  });
  return response.json();
};

const updateArtist = async (id, artist) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(artist),
  });
  return response.json();
};

const deleteArtist = async (id) => {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
};

export { getAllArtists, getArtistById, createArtist, updateArtist, deleteArtist };
