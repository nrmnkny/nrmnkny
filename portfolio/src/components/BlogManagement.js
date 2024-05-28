import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BlogManagement = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/blog');
            setPosts(response.data);
        } catch (error) {
            console.error('There was an error fetching the blog posts!', error);
        }
    };

    const deletePost = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/blog/${id}`);
            fetchPosts();
        } catch (error) {
            console.error('There was an error deleting the blog post!', error);
        }
    };

    return (
        <div>
            <h2>Blog Management</h2>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                        <p>{post.author}</p>
                        <p>{post.published_date}</p>
                        <button onClick={() => deletePost(post.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BlogManagement;
