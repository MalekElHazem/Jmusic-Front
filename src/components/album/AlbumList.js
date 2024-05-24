// src/components/albums/AlbumList.js

import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { deleteAlbum, getAllAlbums } from '../../services/AlbumService';
import { MaterialReactTable } from 'material-react-table';
import './AlbumList.css'; // Import the CSS file

const AlbumList = () => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    try {
      const data = await getAllAlbums();
      setAlbums(data);
    } catch (error) {
      console.error('Failed to fetch albums:', error);
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
        accessorKey: 'releaseDate',
        header: 'Release Date',
        Cell: ({ cell }) => {
          const releaseDate = new Date(cell.row.original.releaseDate);
          return releaseDate.toLocaleDateString();
        },
        size: 150,
      },
      {
        accessorKey: 'artist',
        header: 'Artist',
        Cell: ({ cell }) => {
          const artist = cell.row.original.artist;
          return artist ? artist.name : '';
        },
        size: 150,
      },
      {
        accessorKey: 'id',
        header: 'Actions',
        Cell: ({ cell }) => (
          <div>
            <Link to={`/albums/${cell.getValue()}`}>Edit</Link>
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
      await deleteAlbum(id);
      fetchAlbums();
      console.log(`Deleting album with id ${id}`);
    } catch (error) {
      console.error(`Failed to delete album with id ${id}:`, error);
    }
  };

  return (
    <div className="album-list-container">
      <h1>Albums</h1>
      <Link to="/albums/new">Create New Album</Link>
      <div className="table-container">
        {albums && albums.length > 0 ? (
          <MaterialReactTable columns={columns} data={albums} />
        ) : (
          <p>No albums found.</p>
        )}
      </div>
    </div>
  );
};

export default AlbumList;
