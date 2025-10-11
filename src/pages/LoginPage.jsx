import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { regionesYcomunas } from '../data/regiones';
import '../assets/css/login.css';

const LoginPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();

    // ✅ LA SOLUCIÓN ESTÁ AQUÍ:
    // Nos aseguramos de que cada propiedad tenga un valor inicial definido (un string vacío '').
    const [formData, setFormData] = useState({
        run: '',
        nombre: '',
        apellidos: '',
        email: '',
        password: '',
        fechaNac: '',
        role: '',
        region: '',
        comuna: ''
    });

    const [comunas, setComunas] = useState([]);

    useEffect(() => {
        if (formData.region && regionesYcomunas && regionesYcomunas[formData.region]) {
            setComunas(regionesYcomunas[formData.region]);
        } else {
            setComunas([]);
        }
    }, [formData.region]);
    
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        
        if (id === 'region') {
            setFormData(prevData => ({
                ...prevData,
                region: value,
                comuna: '' // Resetea la comuna aquí
            }));
        } else {
            setFormData(prevData => ({
                ...prevData,
                [id]: value
            }));
        }
    };

    const handleRegister = (e) => {
        e.preventDefault();
        localStorage.setItem("user", JSON.stringify(formData));
        alert("Usuario registrado con éxito.");
        setIsLogin(true);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const user = JSON.parse(localStorage.getItem("user"));
        if (user && user.email === email && user.password === password) {
            alert(`Bienvenido ${user.nombre}`);
            navigate("/");
            window.location.reload();
        } else {
            alert("Correo o contraseña incorrectos.");
        }
    };

    return (
        <div className="auth-container">
            {isLogin ? (
                <div className="form-box">
                    <h2>Iniciar Sesión</h2>
                    <form onSubmit={handleLogin}>
                        <input type="email" name="email" placeholder="Correo electrónico" required />
                        <input type="password" name="password" placeholder="Contraseña" required />
                        <button type="submit">Entrar</button>
                    </form>
                    <div className="toggle-form">
                        ¿No tienes cuenta?{' '}
                        <button type="button" className="link-button" onClick={() => setIsLogin(false)}>
                            Regístrate aquí
                        </button>
                    </div>
                </div>
            ) : (
                <div className="form-box">
                    <h2>Registro</h2>
                    <form onSubmit={handleRegister}>
                        <input type="text" id="run" placeholder="RUN" value={formData.run} onChange={handleInputChange} />
                        <input type="text" id="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleInputChange} />
                        <input type="text" id="apellidos" placeholder="Apellidos" value={formData.apellidos} onChange={handleInputChange} />
                        <input type="email" id="email" placeholder="Correo electrónico" value={formData.email} onChange={handleInputChange} />
                        <input type="password" id="password" placeholder="Contraseña" value={formData.password} onChange={handleInputChange} />
                        <input type="date" id="fechaNac" value={formData.fechaNac} onChange={handleInputChange} />
                        <select id="role" value={formData.role} onChange={handleInputChange}>
                            <option value="">Selecciona tu rol</option>
                            <option value="cliente">Cliente</option>
                            <option value="admin">Administrador</option>
                        </select>
                        <select id="region" value={formData.region} onChange={handleInputChange}>
                            <option value="">Selecciona Región</option>
                            {regionesYcomunas && Object.keys(regionesYcomunas).map(region => (
                                <option key={region} value={region}>{region}</option>
                            ))}
                        </select>
                        <select id="comuna" value={formData.comuna} onChange={handleInputChange} disabled={!formData.region}>
                            <option value="">Selecciona Comuna</option>
                            {comunas.map(comuna => (
                                <option key={comuna} value={comuna}>{comuna}</option>
                            ))}
                        </select>
                        <button type="submit">Registrarse</button>
                    </form>
                    <div className="toggle-form">
                        ¿Ya tienes cuenta?{' '}
                        <button type="button" className="link-button" onClick={() => setIsLogin(true)}>
                            Inicia sesión
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LoginPage;