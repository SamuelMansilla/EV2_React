import React from 'react';
// ✅ 1. Cambia la importación de 'BrowserRouter as Router' a solo 'BrowserRouter'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductosPage from './pages/ProductosPage';
import CarritoPage from './pages/CarritoPage';
import NosotrosPage from './pages/NosotrosPage';
import BlogsPage from './pages/BlogsPage';
import ContactoPage from './pages/ContactoPage';
import LoginPage from './pages/LoginPage';
import DetalleProductoPage from './pages/DetalleProductoPage';
import DetalleBlogPage from './pages/DetalleBlogPage';
import './assets/css/styles.css';

function App() {
  return (
    <CartProvider>
      {/* ✅ 2. Usa BrowserRouter y añade la propiedad 'basename' */}
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/productos" element={<ProductosPage />} />
            <Route path="/producto/:id" element={<DetalleProductoPage />} />
            <Route path="/nosotros" element={<NosotrosPage />} />
            <Route path="/blogs" element={<BlogsPage />} />
            <Route path="/blog/:id" element={<DetalleBlogPage />} />
            <Route path="/contacto" element={<ContactoPage />} />
            <Route path="/carrito" element={<CarritoPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<h1>404: Página no encontrada</h1>} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;