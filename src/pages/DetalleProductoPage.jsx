// src/pages/DetalleProductoPage.jsx
import React, { useContext } from 'react'; // <-- Importa useContext
import { useParams, Link } from 'react-router-dom';
// import { productos } from '../data/productos'; // <-- ELIMINA esta línea
import { CartContext } from '../context/CartContext'; // <-- Importa el Contexto
import '../assets/css/detalle-producto.css';

const DetalleProductoPage = () => {
    const { id } = useParams();
    // Obtiene addToCart y la lista dinámica 'products' del contexto
    const { addToCart, products } = useContext(CartContext); // <-- USA products del contexto

    // Busca el producto en la lista del contexto
    const producto = products.find(p => p.code === id); // <-- Busca en 'products'

    if (!producto) {
        return (
            <div className="container py-5 text-center">
                <h2>Producto no encontrado</h2>
                <Link to="/productos" className="btn btn-primary">Volver a Productos</Link>
            </div>
        );
    }

    const handleAddToCart = () => {
        addToCart(producto);
        alert(`${producto.name} ha sido agregado al carrito.`);
    };

    return (
        <main className="container py-5">
            <div id="detalle-producto">
                <div className="card-detalle row">
                    <div className="col-md-6 img-container">
                        {/* Muestra la imagen (puede ser Base64 o ruta) */}
                        <img src={producto.image} alt={producto.name} className="img-fluid" />
                    </div>
                    <div className="col-md-6 info">
                        <h2>{producto.name}</h2>
                        <p className="lead">${producto.price.toLocaleString('es-CL')} CLP</p>
                        <p className="descripcion">{producto.description}</p>
                        <button className="btn btn-success btn-lg" onClick={handleAddToCart}>
                            Añadir al carrito
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
};
export default DetalleProductoPage;