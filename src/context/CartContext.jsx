// src/context/CartContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { productos as defaultProducts } from '../data/productos'; // Productos originales

export const CartContext = createContext();

const PRODUCTS_STORAGE_KEY = 'productos_levelup';
const CART_STORAGE_KEY = 'carrito_levelup';

export const CartProvider = ({ children }) => {
    // --- Lógica del Carrito (sin cambios) ---
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem(CART_STORAGE_KEY);
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        setCart(prevCart => {
            const existingProductIndex = prevCart.findIndex(item => item.code === product.code);
            if (existingProductIndex > -1) {
                // Si el producto ya existe, incrementa la cantidad
                const updatedCart = [...prevCart];
                updatedCart[existingProductIndex] = {
                    ...updatedCart[existingProductIndex],
                    quantity: updatedCart[existingProductIndex].quantity + 1
                };
                return updatedCart;
            } else {
                // Si es nuevo, agrégalo con cantidad 1
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };
    
    const removeFromCart = (productCode, quantityToRemove = 1) => {
        setCart(prevCart => {
            const existingProductIndex = prevCart.findIndex(item => item.code === productCode);
            if (existingProductIndex > -1) {
                const updatedCart = [...prevCart];
                const currentQuantity = updatedCart[existingProductIndex].quantity;
                if (currentQuantity - quantityToRemove <= 0) {
                    // Si la cantidad a remover es mayor o igual a la actual, elimina el producto
                    updatedCart.splice(existingProductIndex, 1);
                } else {
                    // Si no, solo reduce la cantidad
                    updatedCart[existingProductIndex] = {
                        ...updatedCart[existingProductIndex],
                        quantity: currentQuantity - quantityToRemove
                    };
                }
                return updatedCart;
            }
            return prevCart; // Si no se encuentra, devuelve el carrito sin cambios
        });
    };
    
    const clearCart = () => { setCart([]); };

    // --- Lógica de Productos MODIFICADA ---
    const [products, setProducts] = useState([]);

    // Cargar y fusionar productos al iniciar
    useEffect(() => {
        // 1. Empieza siempre con los productos por defecto
        const baseProducts = [...defaultProducts]; 
        
        // 2. Intenta cargar los productos de localStorage
        const storedProductsJson = localStorage.getItem(PRODUCTS_STORAGE_KEY);
        let storedProducts = [];
        if (storedProductsJson) {
            try {
                storedProducts = JSON.parse(storedProductsJson);
                if (!Array.isArray(storedProducts)) { // Validación extra
                    storedProducts = [];
                }
            } catch (e) {
                console.error("Error parsing products from localStorage", e);
                storedProducts = []; // Resetea si hay error al parsear
            }
        }

        // 3. Fusiona las listas:
        // Crea un mapa para manejar fácil las actualizaciones por 'code'
        const productMap = new Map();
        
        // Agrega primero los por defecto
        baseProducts.forEach(p => productMap.set(p.code, p));
        
        // Luego, agrega/sobrescribe con los de localStorage
        storedProducts.forEach(p => productMap.set(p.code, p)); 

        // 4. Convierte el mapa de vuelta a un array y actualiza el estado
        setProducts(Array.from(productMap.values()));

    }, []); // Este efecto solo se ejecuta una vez al montar

    // Guardar productos en localStorage cada vez que cambien
    useEffect(() => {
        // Evita guardar el estado inicial vacío si la carga aún no ha terminado
        if (products.length > 0) { 
            localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
        }
    }, [products]);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, products, setProducts }}>
            {children}
        </CartContext.Provider>
    );
};