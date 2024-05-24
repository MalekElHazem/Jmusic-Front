import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar({ onLogout }) {
  return (
    <nav className="sidebar">
      <ul>
        <li>
        <Link to="/Home" className='sidebar-button'>Home</Link>
        </li>
        <br></br>
        <br></br>
        <li>
        <Link to="/tracks" className='sidebar-button'>Tracks</Link>
        </li>
        <br></br>
        <br></br>
        <li>
        <Link to="/Artists" className='sidebar-button'>Artists</Link>
        </li>
        <br></br>
        <br></br>
        <li>
          <Link to="/Albums" className='sidebar-button'>Albums</Link>
        </li>
        <br></br>
        <br></br> 
        <li>
          <Link to="/Genres" className='sidebar-button'>Genres</Link>
        </li>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br> 
        <br></br>
        <br></br>
        <br></br>
        <li>
          <Link to="/logout" onClick={onLogout} className='sidebar-link'>
            Logout
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;