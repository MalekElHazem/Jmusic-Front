// src/components/artists/ArtistList.js

import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getAllArtists, deleteArtist } from '../../services/ArtistService';
import { MaterialReactTable } from 'material-react-table';
import './ArtistList.css'; // Import the CSS file

const ArtistList = () => {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    fetchArtists();
  }, []);

  const fetchArtists = async () => {
    try {
      const data = await getAllArtists();
      setArtists(data);
    } catch (error) {
      console.error('Failed to fetch artists:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteArtist(id);
      fetchArtists();
    } catch (error) {
      console.error(`Failed to delete artist with id ${id}:`, error);
    }
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
        size: 150,
      },
      {
        accessorKey: 'bio', // Include bio accessor
        header: 'Bio', // Bio column header
        Cell: ({ cell }) => cell.row.original.bio, // Render bio in the cell
      },
      {
        accessorKey: 'id',
        header: 'Actions',
        Cell: ({ cell }) => (
          <div>
            <Link to={`/artists/${cell.getValue()}`}>Edit</Link>
            <button onClick={() => handleDelete(cell.getValue())}>Delete</button>
          </div>
        ),
        size: 150,
      },
    ],
    []
  );
  

  return (
    <div className="artist-list-container">
      <h1>Artists</h1>
      <Link to="/artists/new">Create New Artist</Link>
      <div className="table-container">
        {artists && artists.length > 0 ? (
          <MaterialReactTable columns={columns} data={artists} />
        ) : (
          <p>No artists found.</p>
        )}
      </div>
    </div>
  );
};

export default ArtistList;
