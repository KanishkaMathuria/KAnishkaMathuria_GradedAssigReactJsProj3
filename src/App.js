import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import data from "./data/data.json"
import AboutMovies from './AboutMovies/aboutMovies';
import AllMovies from './AllMovies/allMovies';

function App() {
  const [moviesData, setMoviesData] = useState({})
  useEffect(() => {
    setMoviesData(data)
  }, [])
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AllMovies setMoviesData={setMoviesData} moviesData={moviesData} />} />
        <Route path="/movie/:title/category/:categoryId" element={<AboutMovies moviesData={moviesData} />} />
      </Routes>
    </div>
  );
}

export default App;
