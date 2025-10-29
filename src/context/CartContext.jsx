import React, { createContext, useState, useEffect } from 'react';
// Importa los productos por defecto como un fallback
import { productos as defaultProducts } from '../data/productos';

export const CartContext = createContext();

const PRODUCTS_STORAGE_KEY = 'productos_levelup'; // Clave para guardar productos
const CART_STORAGE_KEY = 'carrito_levelup'; // Clave para guardar carrito

export const CartProvider = ({ children }) => {
    // --- LÓGICA DEL CARRITO (sin cambios) ---
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const savedCart = localStorage.getItem(CART_STORAGE_KEY);
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => { /* ... (función sin cambios) ... */ };
    const removeFromCart = (productCode, quantityToRemove = 1) => { /* ... (función sin cambios) ... */ };
    const clearCart = () => { setCart([]); };

    // --- ✅ NUEVA LÓGICA DE PRODUCTOS ---
    const [products, setProducts] = useState([]);

    // Cargar productos desde localStorage al iniciar, o usar los de /data si no hay nada
    useEffect(() => {
        const storedProducts = localStorage.getItem(PRODUCTS_STORAGE_KEY);
        if (storedProducts) {
            setProducts(JSON.parse(storedProducts));
        } else {
            setProducts(defaultProducts); // Carga los productos por defecto
        }
    }, []);

    // Guardar productos en localStorage cada vez que cambien
    useEffect(() => {
        localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
    }, [products]);

    return (
        // ✅ AÑADIMOS 'products' y 'setProducts' al valor del Context
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, products, setProducts }}>
            {children}
        </CartContext.Provider>
    );
};