import React from 'react';
import './BlogCard.css';

const BlogCard = ({ post }) => {
    const imageUrl = `http://localhost:${import.meta.env.VITE_PORT}/images/${post.image}`;

    return (
        <div className="blog-card">
            <img src={imageUrl} alt={post.title} className="blog-card-image" />
            <div className="blog-card-content">
                <h2 className="blog-card-title">{post.title}</h2>
                <p className="blog-card-description">{post.description}</p>
            </div>
        </div>
    );
};

export default BlogCard;
