import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Scripts from './services/Scripts';

const MovieDetails = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [showFavoriteModal, setShowFavoriteModal] = useState(false);
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [trailerKey, setTrailerKey] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);


  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const detalles = await Scripts.getMovieDetails(id);
        setMovieDetails(detalles);

        const videos = await Scripts.getMovieVideos(id);
        const trailerVideo = videos.find(video => video.type === 'Trailer');

        if (trailerVideo) {
          setTrailerKey(trailerVideo.key);
        }
      } catch (error) {
        console.error('Error obteniendo detalles de la película', error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const handleFavoriteClick = () => {
    setShowFavoriteModal(true);

    setTimeout(() => {
      setShowFavoriteModal(false);
    }, 3000);
  };

  const handleBuyClick = () => {
    setShowBuyModal(true);
  };

  const handleSeatClick = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((selectedSeat) => selectedSeat !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  if (!movieDetails) {
    return <div>Cargando detalles de la película...</div>;
  }

  return (
    <div className="container mx-auto p-8 bg-gray-900 shadow-lg" id='textoPeli'>
      <div className="flex  ">
        <img
          src={movieDetails.posterUrl}
          alt={movieDetails.title}
          className="w-120 h-auto rounded-lg mr-8 pt-8 pb-8"
        />
        <div>
          <h2 className="text-6xl font-bold mb-4 text-white">{movieDetails.title}</h2>
          <br />
          <p className="text-white mb-2">
            <span className="font-bold text-xl">Fecha de Estreno:&nbsp;&nbsp;</span>
            <b className='text-xl'>{movieDetails.release_date}</b>
          </p><br />
          <p className="text-white mb-2">
            <span className="font-bold text-xl">Duración:&nbsp;&nbsp;</span>
            <b className='text-xl'>{movieDetails.runtime} minutos</b>
          </p><br />
          <p className="text-white mb-2">
            <span className="font-bold text-xl">Valoración Media:&nbsp;&nbsp;</span>
            <b className="text-xl">{movieDetails.vote_average.toFixed(2)}&nbsp;&#9733;</b>
          </p><br />
          {Array.isArray(movieDetails.genres) && movieDetails.genres.length > 0 ? (
            <div className="text-white mb-4">
              <span className="font-bold text-xl">Géneros:&nbsp;&nbsp;</span>
              {movieDetails.genres.map((genre, index) => (
                <span className="font-bold text-xl" key={genre.id}>
                  {genre.name}
                  {index < movieDetails.genres.length - 1 && ', '}
                </span>
              ))}
            </div>
          ) : null}
          <br />
          {trailerKey && (
            <div className="mb-4">
              <span className="font-bold text-xl text-white">Trailer:&nbsp;&nbsp;</span>
              <iframe
                title="trailer"
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${trailerKey}`}
                allowFullScreen
              />
            </div>
          )}
          <p className="text-lg mb-4">
            <span className="font-bold text-xl text-white">Sinopsis:&nbsp;&nbsp;</span>
            <b className='text-white'>{movieDetails.overview}</b>
          </p>
          <br />
          <div className="flex space-x-4">
            <button onClick={handleFavoriteClick} className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md">
              Favorito
            </button>
            <button onClick={handleBuyClick} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md">
              Comprar
            </button>
          </div>

          {/* Modal de Favoritos */}
          {showFavoriteModal && (
            <div className="fixed inset-0 flex items-center justify-center backdrop-filter backdrop-blur-sm">
              <div className="bg-white p-8 rounded-lg text-center">
                <p className="text-lg font-bold mb-4">¡{movieDetails.title} ha sido guardada en favoritos!</p>
                <button onClick={() => setShowFavoriteModal(false)} className="bg-yellow-500 text-white px-4 py-2 rounded-md">
                  Cerrar
                </button>
              </div>
            </div>
          )}
          {showBuyModal && (
            <div className="fixed inset-0 flex items-center justify-center backdrop-filter backdrop-blur-sm">
              <div className="bg-white p-8 mt-16 rounded-lg text-center grid grid-cols-2 gap-8">
                {/* Columna izquierda: Imagen de la película */}
                <div className="col-span-1">
                  <p className="text-lg font-bold mb-4">{movieDetails.title}</p>
                  <img
                    src={movieDetails.posterUrl}
                    alt={movieDetails.title}
                    className="w-60 h-auto rounded-lg mb-4 mx-auto"
                  />
                </div>

                {/* Columna derecha: Seleccionar hora y asientos */}
                <div className="col-span-1">
                  <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2">Selecciona una hora:</label>
                    <select className="w-full p-2 border border-gray-300 rounded-md">
                      <option value="1">Hora 1</option>
                      <option value="2">Hora 2</option>
                      <option value="3">Hora 3</option>
                      <option value="4">Hora 4</option>
                      <option value="5">Hora 5</option>
                      {/* Otras opciones de hora */}
                    </select>
                  </div>
                  <br />
                  <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2">Selecciona tus asientos:</label>
                    <div className="grid grid-cols-6 gap-2">
                      {Array.from({ length: 24 }, (_, index) => {
                        const seat = String.fromCharCode(65 + Math.floor(index / 6)) + (index % 6 + 1);
                        return (
                          <button
                            key={index}
                            onClick={() => handleSeatClick(seat)}
                            className={`p-2 border ${selectedSeats.includes(seat) ? 'bg-green-500 text-white' : 'border-gray-300'
                              } rounded-md`}
                          >
                            {seat}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <br />
                  <div className="flex justify-center mb-4">
                    <button
                      onClick={() => setShowBuyModal(false)}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md mr-4"
                    >
                      Cerrar
                    </button>

                    <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md">
                      <a href="/peliComprar">Comprar</a>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}



        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
