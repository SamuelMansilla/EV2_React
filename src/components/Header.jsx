import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem('user'));
    if (loggedUser) {
      setUser(loggedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/login';
  };

  return (
    <header>
      <nav>
        <div className="logo">
          {/* Aquí está la corrección: se usa la ruta como texto */}
          <Link to="/"><img src="/img/Logo_Level-U.webp" alt="Logo Level-Up" /></Link>
        </div>

        <div className={`menu-toggle ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
          <span></span><span></span><span></span>
        </div>

        <ul id="menu" className={menuOpen ? 'show' : ''} onClick={() => setMenuOpen(false)}>
          <li><NavLink to="/">Inicio</NavLink></li>
          <li><NavLink to="/productos">Productos</NavLink></li>
          <li><NavLink to="/nosotros">Nosotros</NavLink></li>
          <li><NavLink to="/blogs">Blogs</NavLink></li>
          <li><NavLink to="/contacto">Contacto</NavLink></li>
        </ul>

        <div className="icons" id="authArea">
          <Link to="/carrito"><span className="material-icons">shopping_cart</span></Link>
          {user ? (
            <>
              <span style={{ color: '#39FF14', marginLeft: '10px' }}>¡Hola, {user.nombre}!</span>
              <button onClick={handleLogout} className="btn btn-sm btn-danger" style={{ marginLeft: '10px' }}>Salir</button>
            </>
          ) : (
            <Link to="/login"><span className="material-icons">person</span></Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;