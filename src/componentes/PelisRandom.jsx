import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Scripts from './services/Scripts';

const PelisRandom = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        let movies;

        if (searchTerm) {
          movies = await Scripts.buscarMovies(searchTerm);
        } else {
          movies = await Scripts.getPopularMovies();
        }

        setFilteredMovies(movies);
      } catch (error) {
        console.error('Error fetching movies', error);
      }
    };

    fetchMovies();
  }, [searchTerm]);

  return (
    <div>
      <div className="flex items-center justify-center my-4">
        <img src="../src/assets/logo.png" alt="Imagen 1" className="mr-2 w-16 h-16" />
        <input
          type="text"
          placeholder="Buscar películas"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded text-gray-900 w-80 mr-2 text-center"
        />
        <img src="../src/assets/logo.png" alt="Imagen 2" className="ml-2 w-16 h-16" />
      </div>
      <br />
      <div className="grid grid-cols-5 gap-8 bg-gray-900 p-4">
        {filteredMovies.map((movie) => (
          <div key={movie.id} className="text-center">
            <Link to={`/pelicula/${movie.id}`} className="block">
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="transition-transform transform-gpu hover:scale-110 mx-auto mb-4 rounded-lg cursor-pointer"
              />
              <br />
              <p className="text-xl text-white">{movie.title}</p>
            </Link>
            <br />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PelisRandom;
