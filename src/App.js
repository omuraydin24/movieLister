import React from "react";
import { Route, Routes } from "react-router-dom";
import MovieList from "./components/Screens/MovieList";
import MovieDetail from "./components/Screens/MovieDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MovieList />} />
      <Route path="/movies/:id" element={<MovieDetail />} />
    </Routes>
  );
}

export default App;
