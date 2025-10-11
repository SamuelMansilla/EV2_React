import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './assets/css/styles.css';
// Importa el proveedor del carrito
import { CartProvider } from './context/CartContext';

// Importa componentes estructurales
import Header from './components/Header';
import Footer from './components/Footer';

// Importa todas las páginas de tu aplicación
// Nota: Deberás crear estos archivos de página en tu carpeta src/pages/
import HomePage from './pages/HomePage';
import ProductosPage from './pages/ProductosPage';
import CarritoPage from './pages/CarritoPage';
import NosotrosPage from './pages/NosotrosPage';
import BlogsPage from './pages/BlogsPage';
import ContactoPage from './pages/ContactoPage';
import LoginPage from './pages/LoginPage';
import DetalleProductoPage from './pages/DetalleProductoPage';
import DetalleBlogPage from './pages/DetalleBlogPage';

// Importa los estilos globales si no lo hiciste en index.js
// import './assets/css/styles.css';

function App() {
  return (
    // 2. El proveedor del carrito envuelve toda la aplicación
    <CartProvider>
      {/* 1. El Router gestiona la navegación */}
      <Router>
        <Header />
        <main>
          {/* 3. Routes define qué componente mostrar según la URL */}
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

            {/* Opcional: Ruta para página no encontrada */}
            <Route path="*" element={<h1>404: Página no encontrada</h1>} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </CartProvider>
  );
}

export default App;