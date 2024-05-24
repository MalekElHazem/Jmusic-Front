// src/App.js

import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sign from "./Authenticate/Sign";
import Home from "./components/Home";
import Sidebar from "./components/Sidebar";
import Logout from "./components/Logout";
import BottomBar from "./components/BottomBar";
import TrackList from "./components/track/TrackList";
import TrackForm from "./components/track/TrackForm";
import ArtistList from "./components/artists/ArtistList";
import ArtistForm from "./components/artists/ArtistForm";
//import AddArtistForm from "./components/artists/ArtistForm";
import AlbumList from "./components/album/AlbumList";
import AlbumForm from "./components/album/AlbumForm";
import GenreList from "./components/genre/GenreList";
import GenreForm from "./components/genre/GenreForm";


import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogin = (token) => {
    setIsLoggedIn(true);
    localStorage.setItem("token", token);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
  };

  return (
    <div className="App">
      {isLoggedIn && <Sidebar onLogout={handleLogout} />}
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? <Navigate to="/home" replace /> : <Navigate to="/sign" replace />
          }
        />
        <Route
          path="/sign"
          element={
            isLoggedIn ? (
              <Navigate to="/home" replace />
            ) : (
              <Sign onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/home"
          element={isLoggedIn ? <Home /> : <Navigate to="/sign" replace />}
        />
        <Route
          path="/logout"
          element={<Logout />}
        />
        <Route
          path="/tracks"
          element={isLoggedIn ? <TrackList /> : <Navigate to="/sign" replace />}
        />
        <Route
          path="/tracks/new"
          element={isLoggedIn ? <TrackForm /> : <Navigate to="/sign" replace />}
        />
        <Route
          path="/tracks/:id"
          element={isLoggedIn ? <TrackForm /> : <Navigate to="/sign" replace />}
        />
        <Route
          path="/Artists"
          element={isLoggedIn ? <ArtistList /> : <Navigate to="/sign" replace />}
        />
        <Route
          path="/Artists/new"
          element={isLoggedIn ? <ArtistForm /> : <Navigate to="/sign" replace />}
        />
        <Route
          path="/Artists/:id"
          element={isLoggedIn ? <ArtistForm /> : <Navigate to="/sign" replace />}
        />

        <Route
          path="/Albums"
          element={isLoggedIn ? <AlbumList /> : <Navigate to="/sign" replace />}
        />
        <Route
          path="/Albums/new"
          element={isLoggedIn ? <AlbumForm /> : <Navigate to="/sign" replace />}
        />
        <Route
          path="/Albums/:id"
          element={isLoggedIn ? <AlbumForm /> : <Navigate to="/sign" replace />}
        />

        <Route
          path="/Genres"
          element={isLoggedIn ? <GenreList /> : <Navigate to="/sign" replace />}
        />
        <Route
          path="/Genres/new"
          element={isLoggedIn ? <GenreForm /> : <Navigate to="/sign" replace />}
        />
        <Route
          path="/Genres/:id"
          element={isLoggedIn ? <GenreForm /> : <Navigate to="/sign" replace />}
        />
        <Route path="*" element={<Navigate to={isLoggedIn ? "/home" : "/sign"} replace />} />
      </Routes>
      {isLoggedIn && <BottomBar />}
    </div>
  );
}

export default App;
