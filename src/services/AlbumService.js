// src/services/AlbumService.js

const API_URL = "http://localhost:8001/albums";

const getAllAlbums = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

const getAlbumById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  return response.json();
};

const createAlbum = async (album) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(album),
  });
  return response.json();
};

const updateAlbum = async (id, album) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(album),
  });
  return response.json();
};



const deleteAlbum = async (id) => {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
};

export { getAllAlbums, getAlbumById, createAlbum, updateAlbum, deleteAlbum };
