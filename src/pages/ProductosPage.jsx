import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { productos } from '../data/productos';
import { CartContext } from '../context/CartContext';
import '../assets/css/productos.css'; // Asegúrate de importar el CSS

// Función para renderizar estrellas (puedes moverla a un archivo utils si prefieres)
const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;
    return '★'.repeat(fullStars) + '☆'.repeat(emptyStars);
};

const ProductosPage = () => {
    const { addToCart } = useContext(CartContext);

    const handleAddToCart = (product) => {
        addToCart(product);
        alert(`${product.name} ha sido agregado al carrito.`);
    };

    return (
        <main className="productos">
            <h2>Nuestros Productos</h2>
            <div className="grid-productos">
                {productos.map(p => (
                    <div className="card" key={p.code}>
                        <img src={p.image} alt={p.name} />
                        <div className="card-body">
                             <h6>{p.name}</h6>
                            {/* ✅ AÑADIMOS EL RATING AQUÍ */}
                            <div className="rating mb-2">
                                <span className="stars">{renderStars(p.rating)}</span>
                                <span className="reviews">({p.reviews} reseñas)</span>
                            </div>
                            <p className="descripcion">{p.description.substring(0, 90)}...</p>
                        </div>
                        <div className="precio">${p.price.toLocaleString('es-CL')}</div>
                        <div className="product-actions mt-auto"> {/* mt-auto empuja los botones abajo */}
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