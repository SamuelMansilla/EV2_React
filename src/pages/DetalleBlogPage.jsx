import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogs } from '../data/blogs';
import '../assets/css/detalle_blog.css';

const DetalleBlogPage = () => {
    const { id } = useParams();
    const blog = blogs.find(b => b.id === id);

    if (!blog) return <h2>Blog no encontrado.</h2>;

    return (
        <main className="container py-5" id="detalle-blog">
            <h1>{blog.titulo}</h1>
            <p className="text-muted">Por {blog.autor} - {blog.fecha}</p>
            <img src={blog.imagen} className="img-fluid mb-4" alt={blog.titulo} />
            <p style={{ whiteSpace: 'pre-line' }}>{blog.contenido}</p>
            <Link to="/blogs" className="btn btn-secondary mt-3">← Volver a Blogs</Link>
        </main>
    );
};
export default DetalleBlogPage;