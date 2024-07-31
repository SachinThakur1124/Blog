import React, { useEffect, useState } from 'react';
import './BlogHome.css';
import axios from 'axios';
import BlogCard from '../blogCard/BlogCard';


const BlogHome = () => {
    const [blogs, setBlogs] = useState([]);

    const fetchBlogs = async () => {
        try {
            const res = await axios.get("/api/v1/blog");
            setBlogs(res.data.blogs);
        } catch (error) {
            console.error("Error fetching blogs:", error);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    return (
        <div className="blog-home">
            <header className="header">
                <h1>Welcome to My Blog</h1>
            </header>
            <main className="main-content">
                {blogs.map(post => (
                    <BlogCard key={post._id} post={post} />
                ))}
            </main>
            <footer className="footer">
                <p>&copy; 2024 My Blog. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default BlogHome;
