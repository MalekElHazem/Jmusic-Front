import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getAllGenres, deleteGenre } from '../../services/GenreService';
import { MaterialReactTable } from 'material-react-table';
import './GenreList.css'; // Import the CSS file

const GenreList = () => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    try {
      const data = await getAllGenres();
      setGenres(data);
    } catch (error) {
      console.error('Failed to fetch genres:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteGenre(id);
      fetchGenres();
    } catch (error) {
      console.error(`Failed to delete genre with id ${id}:`, error);
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
        accessorKey: 'id',
        header: 'Actions',
        Cell: ({ cell }) => (
          <div>
            <Link to={`/genres/${cell.getValue()}`}>Edit</Link>
            <button onClick={() => handleDelete(cell.getValue())}>Delete</button>
          </div>
        ),
        size: 150,
      },
    ],
    []
  );

  return (
    <div className="genre-list-container">
      <h1>Genres</h1>
      <Link to="/genres/new">Create New Genre</Link>
      <div className="table-container">
        {genres && genres.length > 0 ? (
          <MaterialReactTable columns={columns} data={genres} />
        ) : (
          <p>No genres found.</p>
        )}
      </div>
    </div>
  );
};

export default GenreList;
