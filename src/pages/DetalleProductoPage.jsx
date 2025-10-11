import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { productos } from '../data/productos';
import { CartContext } from '../context/CartContext';
import '../assets/css/detalle-producto.css';

const DetalleProductoPage = () => {
    const { id } = useParams();
    const { addToCart } = useContext(CartContext);
    const producto = productos.find(p => p.code === id);

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