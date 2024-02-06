import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import Scripts from './services/Scripts';

const Section2 = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const popularMovies = await Scripts.getPopularMovies();
        setMovies(popularMovies);
      } catch (error) {
        console.error('Error fetching popular movies', error);
      }
    };

    fetchPopularMovies();
  }, []);

  const sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className="bg-gray-900 text-white relative">
      <br /><br /><br />
      <h1 className="mb-8 text-4xl font-bold text-center pt-8 pb-4">Estrenos más Populares</h1>
      <div className="mx-auto w-4/5">
        <Slider {...sliderSettings} className="mb-8">
          {movies.map((movie) => (
            <div key={movie.id} className="text-center">
              <Link to={`/pelicula/${movie.id}`}>
                <img src={movie.posterUrl} alt={movie.title} className="transition-transform transform-gpu hover:scale-110 mx-auto mb-4 rounded-lg cursor-pointer" />
                <p className="font-bold text-xl cursor-pointer">{movie.title}</p>
              </Link>
            </div>
          ))}
        </Slider>
        <br />
      </div>
      <div className="relative">
        <hr className='m-4' />
        <h1 className="mb-8 text-4xl font-bold text-center pt-8">Nuestros Cines ya estan en toda España</h1>
        <div className="grid grid-cols-3 gap-8">
          {/* Columna 1 */}
          <div className="text-center rounded-lg p-4 ml-4 col-span-3 sm:col-span-1 sm:col-start-2"> {/* Agregadas las clases col-span y sm:col-start */}
            <img src="src/assets/españa.png" alt="Oferta 1" className="mx-auto mb-4 rounded-lg transition-transform transform-gpu hover:scale-125" /><br />
            <p className='text-xl' id='textoPeli'>Descubre donde nos ubicamos entre más de 20 ciudades de España, Portugal y Marruecos</p>
            <br />
            <button className='rounded-full hover:bg-gray-700 p-4 transition-transform transform-gpu hover:scale-110'>Descubrir</button>
          </div>
        </div>
      </div>
      <hr className='m-4' />
      <h1 className="mb-8 text-4xl font-bold text-center pt-8 pb-8">Descubre Nuestras Ofertas</h1>
      <div className="grid grid-cols-3 gap-8">
        {/* Columna 1 */}
        <div className="text-center bg-gray-800 border border-gray-400 rounded-lg p-4 ml-4">
          <img src="src/assets/promo.jpg" alt="Oferta 1" className="mx-auto mb-4 rounded-lg" />
          <p className='text-xl' id='textoPeli'>Con esta oferta especial para miembros, te beneficiarás de un descuento del 10% en todos nuestros productos de bar.</p>
          <br />
          <button className='rounded-full hover:bg-gray-700 p-4 transition-transform transform-gpu hover:scale-110'>Reclamar</button>
        </div>
        {/* Columna 2 */}
        <div className="text-center  bg-gray-800 border border-gray-400 rounded-lg p-4">
          <img src="src/assets/promo2.jpg" alt="Oferta 2" className="mx-auto mb-4 rounded-lg" />
          <p className='text-xl' id='textoPeli'>Con esta oferta especial para miembros, podrás conseguir productos exclusivos de tus películas favoritas con la compra de un menú.</p>
          <br />
          <button className='rounded-full hover:bg-gray-700 p-4 transition-transform transform-gpu hover:scale-110'>Reclamar</button>
        </div>
        {/* Columna 3 */}
        <div className="text-center bg-gray-800 border border-gray-400 rounded-lg p-4 mr-4">
          <img src="src/assets/promo3.jpg" alt="Oferta 3" className="mx-auto mb-4 rounded-lg" />
          <p className='text-xl' id='textoPeli'>Ahora puedes ahorrar tiempo y dinero si compras tus entradas online. Además, tienes la ventaja de poder escoger tranquilamente tus butacas.</p>
          <br />
          <button className='rounded-full hover:bg-gray-700 p-4 transition-transform transform-gpu hover:scale-110'>Reclamar</button>
        </div>
        <br />
      </div>
    </div>
  );
};

export default Section2;
