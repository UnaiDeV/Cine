import React from 'react';
import App from '/src/App.jsx';
import { Routes, Route } from 'react-router-dom';
import DetallesPelicula from '../pages/DetallesPelicula.jsx';
import PaginasPeliculas from '../pages//PaginasPeliculas.jsx';
import PaginaCompra from '../pages//PaginaCompra.jsx';


class Router extends React.Component {
    render() {
        return (

            <Routes>
                <Route path='/' element={<App />}/>
                <Route path='/pelicula/:id' element={<DetallesPelicula />} />
                <Route path='/pelisRandom' element={<PaginasPeliculas />} />
                <Route path='/peliComprar' element={<PaginaCompra />} />
            </Routes>

        );
    }
}
export default Router;