import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { regionesYcomunas } from '../data/regiones';
import '../assets/css/login.css';

const LoginPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();

    // ✅ 1. AÑADIMOS 'referralCode' DE VUELTA AL ESTADO INICIAL
    const [formData, setFormData] = useState({
        run: '', nombre: '', apellidos: '', email: '',
        password: '', fechaNac: '', role: 'cliente', region: '', comuna: '', // Role 'cliente' por defecto
        referralCode: '' 
    });
    const [errors, setErrors] = useState({});
    const [comunas, setComunas] = useState([]);

    useEffect(() => {
        if (formData.region && regionesYcomunas && regionesYcomunas[formData.region]) {
            setComunas(regionesYcomunas[formData.region]);
        } else {
            setComunas([]);
        }
        // Reiniciar comuna al cambiar de región (importante para evitar errores)
        if (formData.comuna && !comunas.includes(formData.comuna)) {
             setFormData(prev => ({ ...prev, comuna: '' }));
        }
       
    }, [formData.region, comunas]);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevData => ({ ...prevData, [id]: value }));
    };

    const validate = () => {
        const newErrors = {};
        const nameRegex = /^[a-zA-Z\s]+$/;
        const runRegex = /^[0-9]+[0-9kK]?$/;
        const emailRegex = /^[\w.-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;

        if (!formData.nombre) newErrors.nombre = "El nombre es obligatorio.";
        else if (!nameRegex.test(formData.nombre)) newErrors.nombre = "El nombre solo puede contener letras.";
        
        if (!formData.apellidos) newErrors.apellidos = "Los apellidos son obligatorios.";
        else if (!nameRegex.test(formData.apellidos)) newErrors.apellidos = "Los apellidos solo pueden contener letras.";

        if (!formData.run) newErrors.run = "El RUN es obligatorio.";
        else if (!runRegex.test(formData.run)) newErrors.run = "El RUN solo puede contener números y la letra K.";

        if (!formData.email) newErrors.email = "El correo es obligatorio.";
        else if (!emailRegex.test(formData.email)) newErrors.email = "El correo debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com.";
        
        if (!formData.password) newErrors.password = "La contraseña es obligatoria.";
        if (!formData.role) newErrors.role = "Debes seleccionar un rol.";
        if (!formData.region) newErrors.region = "Debes seleccionar una región.";
        if (!formData.comuna) newErrors.comuna = "Debes seleccionar una comuna.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // ✅ 2. FUNCIÓN DE REGISTRO ACTUALIZADA CON LÓGICA DE REFERIDOS Y GAMIFICACIÓN
    const handleRegister = (e) => {
        e.preventDefault();
        if (validate()) {
            // Lógica de referido (simulada)
            if (formData.referralCode) {
                const referredByUser = JSON.parse(localStorage.getItem("user")); // Asume que el código es del último usuario
                if (referredByUser && referredByUser.myReferralCode === formData.referralCode) {
                    alert(`¡Gracias por usar el código de ${referredByUser.nombre}!`);
                    // (En una app real, aquí actualizarías los puntos de 'referredByUser' en la base de datos)
                    console.log(`${referredByUser.nombre} ha ganado puntos por referirte.`);
                } else {
                    console.log("Código de referido no válido o no encontrado.");
                }
            }

            // Genera un código de referido único para el nuevo usuario
            const myNewReferralCode = formData.nombre.slice(0, 4).toUpperCase() + Date.now().toString().slice(-4);

            // Crea el nuevo objeto de usuario con los datos de gamificación
            const newUser = {
                ...formData,
                points: 50, // Puntos iniciales por registrarse
                level: 1,
                myReferralCode: myNewReferralCode
            };

            localStorage.setItem("user", JSON.stringify(newUser));
            alert(`Usuario registrado con éxito. Tu código de referido es: ${myNewReferralCode}`);
            setIsLogin(true); // Cambia al formulario de login
        }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const user = JSON.parse(localStorage.getItem("user"));

        if (user && user.email === email && user.password === password) {
            alert(`Bienvenido ${user.nombre}`);
            if (user.role === 'admin') {
                navigate("/admin"); 
            } else {
                navigate("/");
            }
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
                    <form onSubmit={handleRegister} noValidate>
                        <input type="text" id="run" placeholder="RUN" value={formData.run} onChange={handleInputChange} />
                        {errors.run && <span className="error">{errors.run}</span>}

                        <input type="text" id="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleInputChange} />
                        {errors.nombre && <span className="error">{errors.nombre}</span>}
                        
                        <input type="text" id="apellidos" placeholder="Apellidos" value={formData.apellidos} onChange={handleInputChange} />
                        {errors.apellidos && <span className="error">{errors.apellidos}</span>}

                        <input type="email" id="email" placeholder="Correo electrónico" value={formData.email} onChange={handleInputChange} />
                        {errors.email && <span className="error">{errors.email}</span>}

                        <input type="password" id="password" placeholder="Contraseña" value={formData.password} onChange={handleInputChange} />
                        {errors.password && <span className="error">{errors.password}</span>}

                        <input type="date" id="fechaNac" value={formData.fechaNac} onChange={handleInputChange} />
                        
                        {/* ✅ 3. INPUT PARA EL CÓDIGO DE REFERIDO AÑADIDO DE VUELTA */}
                        <input 
                            type="text" 
                            id="referralCode" 
                            placeholder="Código de referido (opcional)" 
                            value={formData.referralCode} 
                            onChange={handleInputChange} 
                        />

                        <select id="role" value={formData.role} onChange={handleInputChange}>
                            <option value="">Selecciona tu rol</option>
                            <option value="cliente">Cliente</option>
                            <option value="admin">Administrador</option>
                        </select>
                        {errors.role && <span className="error">{errors.role}</span>}

                        <select id="region" value={formData.region} onChange={handleInputChange}>
                            <option value="">Selecciona Región</option>
                            {regionesYcomunas && Object.keys(regionesYcomunas).map(region => (
                                <option key={region} value={region}>{region}</option>
                            ))}
                        </select>
                        {errors.region && <span className="error">{errors.region}</span>}
                        
                        <select id="comuna" value={formData.comuna} onChange={handleInputChange} disabled={!formData.region}>
                            <option value="">Selecciona Comuna</option>
                            {comunas.map(comuna => (
                                <option key={comuna} value={comuna}>{comuna}</option>
                            ))}
                        </select>
                        {errors.comuna && <span className="error">{errors.comuna}</span>}

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