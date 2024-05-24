// src/services/TrackService.js

const API_URL = "http://localhost:8001/tracks";

const getAllTracks = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Error fetching tracks: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error("Error in getAllTracks:", error);
    throw error;
  }
};

const getTrackById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error(`Error fetching track by ID: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error("Error in getTrackById:", error);
    throw error;
  }
};

const createTrack = async (track) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(track),
    });
    if (!response.ok) {
      throw new Error(`Error creating track: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error("Error in createTrack:", error);
    throw error;
  }
};

const updateTrack = async (id, track) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(track),
    });
    console.log("Update response:", response);
    if (!response.ok) {
      throw new Error(`Error updating track: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error("Error in updateTrack:", error);
    throw error;
  }
};

const deleteTrack = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Error deleting track: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error in deleteTrack:", error);
    throw error;
  }
};

export { getAllTracks, getTrackById, createTrack, updateTrack, deleteTrack };
