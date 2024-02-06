const apiKey = 'ce01e695c2ba24addbefa432d94b81f2';
const apiUrl = 'https://api.themoviedb.org/3';
const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

const Scripts = {
  getPopularMovies: async () => {
    try {
      const response = await fetch(`${apiUrl}/movie/popular?api_key=${apiKey}`);
      if (!response.ok) {
        throw new Error('Error fetching popular movies');
      }

      const data = await response.json();

      // Retornar directamente los resultados
      return data.results.map((movie) => ({
        ...movie,
        posterUrl: `${imageBaseUrl}${movie.poster_path}`,
      }));
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  getMovieDetails: async (movieId) => {
    try {
      const response = await fetch(`${apiUrl}/movie/${movieId}?api_key=${apiKey}`);
      if (!response.ok) {
        throw new Error('Error fetching movie details');
      }

      const data = await response.json();

      // Retornar los detalles de la película
      return {
        ...data,
        posterUrl: `${imageBaseUrl}${data.poster_path}`,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  getAllMovies: async () => {
    try {
        const responseNowPlaying = await fetch(`${apiUrl}/movie/now_playing?api_key=${apiKey}`);
        const responseTopRated = await fetch(`${apiUrl}/movie/top_rated?api_key=${apiKey}`);

        if (!responseNowPlaying.ok || !responseTopRated.ok) {
            throw new Error('Error fetching all movies');
        }

        const dataNowPlaying = await responseNowPlaying.json();
        const dataTopRated = await responseTopRated.json();

        // Combina los resultados de las tres categorías
        const allMovies = [...dataNowPlaying.results, ...dataTopRated.results];

        // Retornar directamente los resultados
        return allMovies.map((movie) => ({
            ...movie,
            posterUrl: `${imageBaseUrl}${movie.poster_path}`,
        }));
    } catch (error) {
        console.error(error);
        throw error;
    }
  },

  // Nueva función para obtener los videos de una película
  getMovieVideos: async (movieId) => {
    try {
      const response = await fetch(`${apiUrl}/movie/${movieId}/videos?api_key=${apiKey}`);
      if (!response.ok) {
        throw new Error('Error fetching movie videos');
      }

      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // En tu servicio Scripts
  buscarMovies: async (buscador) => {
    try {
      const responseAllMovies = await fetch(`${apiUrl}/search/movie?api_key=${apiKey}&query=${buscador}`);

      if (!responseAllMovies.ok) {
        throw new Error('Error fetching movies');
      }

      const dataAllMovies = await responseAllMovies.json();

      // Obtén todas las películas directamente
      const allMovies = dataAllMovies.results;

      // Retornar directamente los resultados
      return allMovies.map((movie) => ({
        ...movie,
        posterUrl: `${imageBaseUrl}${movie.poster_path}`,
      }));
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
};

export default Scripts;
