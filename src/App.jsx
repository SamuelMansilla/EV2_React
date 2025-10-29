import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';

// Importa los Layouts
import PublicLayout from './components/PublicLayout'; // Plantilla de la tienda
import AdminLayout from './components/AdminLayout';   // Plantilla del admin

// Importa todas las Páginas Públicas
import HomePage from './pages/HomePage';
import ProductosPage from './pages/ProductosPage';
import CarritoPage from './pages/CarritoPage';
import NosotrosPage from './pages/NosotrosPage';
import BlogsPage from './pages/BlogsPage';
import ContactoPage from './pages/ContactoPage';
import LoginPage from './pages/LoginPage';
import DetalleProductoPage from './pages/DetalleProductoPage';
import DetalleBlogPage from './pages/DetalleBlogPage';

// Importa todas las Páginas de Admin
import AdminHomePage from './pages/AdminHomePage';
import AdminProductosPage from './pages/AdminProductosPage';
import AdminUsuariosPage from './pages/AdminUsuariosPage'; // Asegúrate de haber creado esta página

import './assets/css/styles.css';

function App() {
  return (
    <CartProvider>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          {/* --- Rutas Públicas (usan PublicLayout) --- */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/productos" element={<ProductosPage />} />
            <Route path="/producto/:id" element={<DetalleProductoPage />} />
            <Route path="/nosotros" element={<NosotrosPage />} />
            <Route path="/blogs" element={<BlogsPage />} />
            <Route path="/blog/:id" element={<DetalleBlogPage />} />
            <Route path="/contacto" element={<ContactoPage />} />
            <Route path="/carrito" element={<CarritoPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Route>

          {/* --- Rutas de Admin (usan AdminLayout) --- */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminHomePage />} /> {/* Ruta principal /admin */}
            <Route path="productos" element={<AdminProductosPage />} /> {/* Ruta /admin/productos */}
            <Route path="usuarios" element={<AdminUsuariosPage />} /> {/* Ruta /admin/usuarios */}
          </Route>
          
          {/* --- Ruta 404 (fuera de los layouts) --- */}
          <Route path="*" element={<div className="container py-5 text-center"><h1>404: Página no encontrada</h1></div>} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;