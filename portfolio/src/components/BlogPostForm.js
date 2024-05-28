import React, { useState } from 'react';
import axios from 'axios';

const BlogPostForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [publishedDate, setPublishedDate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/blog', {
                title,
                content,
                author,
                published_date: publishedDate
            });
            alert('Blog post added');
        } catch (error) {
            console.error('There was an error adding the blog post!', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div>
                <label>Content</label>
                <textarea value={content} onChange={(e) => setContent(e.target.value)} required></textarea>
            </div>
            <div>
                <label>Author</label>
                <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required />
            </div>
            <div>
                <label>Published Date</label>
                <input type="date" value={publishedDate} onChange={(e) => setPublishedDate(e.target.value)} required />
            </div>
            <button type="submit">Add Post</button>
        </form>
    );
};

export default BlogPostForm;
