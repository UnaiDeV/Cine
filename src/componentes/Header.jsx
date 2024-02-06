import React from 'react';

const Header = () => {
  return (
    <header className="fixed w-full text-white z-50 bg-gray-900">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center ml-4">
          <a href="/" className="flex items-center">
            <img src="../src/assets/logo.png" alt="logo" className="transition-transform transform-gpu hover:scale-110 animate-pulse h-24 p-4" />
            <span className="ml-2 text-xl font-bold transition-transform transform-gpu hover:scale-110">Cines Callau</span>
          </a>
        </div>
        <a className="hover:text-gray-200  transition-transform transform-gpu hover:scale-110" href="">Cines</a>
        <a className="hover:text-gray-200  transition-transform transform-gpu hover:scale-110" href="/pelisRandom">Peliculas</a>
        <a className="hover:text-gray-200  transition-transform transform-gpu hover:scale-110" href="">Promociones</a>
        <a className="hover:text-gray-200  transition-transform transform-gpu hover:scale-110 mr-4" href="">Inicia Sesión</a>
      </div>
    </header>
  );
};

export default Header;
