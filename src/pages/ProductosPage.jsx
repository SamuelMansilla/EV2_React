// src/pages/ProductosPage.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import '../assets/css/productos.css';

// ✅ AÑADIDA DE VUELTA: Función para renderizar estrellas
const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;
    return '★'.repeat(fullStars) + '☆'.repeat(emptyStars);
};

const ProductosPage = () => {
    const { addToCart, products } = useContext(CartContext); // <-- Obtiene products del contexto

    const handleAddToCart = (product) => {
        addToCart(product);
        alert(`${product.name} ha sido agregado al carrito.`);
    };

    return (
        <main className="productos">
            <h2>Nuestros Productos</h2>
            <div className="grid-productos">
                {products.map(p => ( // <-- Mapea sobre products del contexto
                    <div className="card" key={p.code}>
                        <img src={p.image} alt={p.name} />
                        <div className="card-body">
                             <h6>{p.name}</h6>
                            {/* Usa la función renderStars */}
                            <div className="rating mb-2">
                                <span className="stars">{renderStars(p.rating)}</span>
                                <span className="reviews">({p.reviews} reseñas)</span>
                            </div>
                            <p className="descripcion">{p.description.substring(0, 90)}...</p>
                        </div>
                        <div className="precio">${p.price.toLocaleString('es-CL')}</div>
                        <div className="product-actions mt-auto">
                             <button className="btn btn-primary mb-2 w-100" onClick={() => handleAddToCart(p)}>
                                Agregar al Carrito
                            </button>
                            <Link to={`/producto/${p.code}`} className="btn btn-outline-light w-100">
                                Ver detalle
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
};
export default ProductosPage;