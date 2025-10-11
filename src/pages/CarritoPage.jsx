import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import '../assets/css/carrito.css';

const CarritoPage = () => {
    const { cart, addToCart, removeFromCart, clearCart } = useContext(CartContext);

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // ✅ Función para manejar el pago
    const handlePay = () => {
        if (cart.length === 0) {
            alert("Tu carrito está vacío.");
            return;
        }
        alert('¡Gracias por tu compra!');
        // ✅ AHORA SÍ: Se llama a la función para vaciar el carrito
        clearCart(); 
    };

    return (
        <main className="container py-5">
            <h1 className="mb-4 text-center">🛒 Carrito de Compras</h1>
            <div className="row g-4">
                <div className="col-12 col-lg-8" id="lista-carrito">
                    {cart.length === 0 ? (
                        <p className='text-center'>Tu carrito está vacío.</p>
                    ) : (
                        cart.map(item => (
                            <div key={item.code} className="carrito-item">
                                <div className="d-flex align-items-center flex-grow-1">
                                    <img src={item.image} alt={item.name} className="carrito-img" />
                                    <div>
                                        <h6>{item.name}</h6>
                                        <p>Subtotal: ${(item.price * item.quantity).toLocaleString('es-CL')}</p>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center gap-2">
                                    <button className="btn btn-sm btn-outline-secondary" onClick={() => removeFromCart(item.code, 1)}>➖</button>
                                    <span className="cantidad">{item.quantity}</span>
                                    <button className="btn btn-sm btn-outline-secondary" onClick={() => addToCart(item)}>➕</button>
                                    <button className="btn btn-sm btn-danger ms-3" onClick={() => removeFromCart(item.code, item.quantity)}>🗑️</button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                <aside className="col-12 col-lg-4">
                    <div className="card p-3 sticky-top">
                        <h4>Resumen</h4>
                        <hr />
                        <p>Total: <strong>${total.toLocaleString('es-CL')}</strong></p>
                        <button className="btn btn-danger w-100 mb-2" onClick={clearCart}>Vaciar carrito</button>
                        {/* ✅ El botón ahora llama a la nueva función handlePay */}
                        <button className="btn btn-success w-100" onClick={handlePay}>Pagar</button>
                    </div>
                </aside>
            </div>
        </main>
    );
};

export default CarritoPage;