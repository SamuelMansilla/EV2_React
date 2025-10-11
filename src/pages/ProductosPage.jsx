import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { productos } from '../data/productos';
import { CartContext } from '../context/CartContext';
import '../assets/css/productos.css';

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
                        <h6>{p.name}</h6>
                        <p className="descripcion">{p.description.substring(0, 90)}...</p>
                        <div className="precio">${p.price.toLocaleString('es-CL')}</div>
                        <div className="product-actions">
                            <button className="btn btn-primary mb-2" onClick={() => handleAddToCart(p)}>
                                Agregar al Carrito
                            </button>
                            <Link to={`/producto/${p.code}`} className="btn btn-outline-light">Ver detalle</Link>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
};
export default ProductosPage;