const sql = require('mssql');
const { getDbConnection } = require('../config/db');

const BlogController = {
    getAllPosts: async (req, res) => {
        try {
            const pool = await getDbConnection();
            const result = await pool.request().query('SELECT * FROM blog_posts ORDER BY created_at DESC');
            res.json(result.recordset);
        } catch (err) {
            console.error('Error fetching all posts:', err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    getPostById: async (req, res) => {
        const { id } = req.params;
        try {
            const pool = await getDbConnection();
            const result = await pool.request().input('id', sql.Int, id).query('SELECT * FROM blog_posts WHERE id = @id');
            res.json(result.recordset[0]);
        } catch (err) {
            console.error('Error fetching post by ID:', err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    createPost: async (req, res) => {
        const { title, content, author } = req.body;
        console.log('Received post data:', req.body); // Log received data
        if (!title || !content || !author) {
            return res.status(400).json({ error: 'Title, content, and author are required' });
        }
        try {
            const pool = await getDbConnection();
            await pool.request()
                .input('title', sql.NVarChar, title)
                .input('content', sql.NVarChar, content)
                .input('author', sql.NVarChar, author)
                .query('INSERT INTO blog_posts (title, content, author) VALUES (@title, @content, @author)');
            res.status(201).json({ message: 'Post created successfully' });
        } catch (err) {
            console.error('Error creating post:', err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    updatePost: async (req, res) => {
        const { id } = req.params;
        const { title, content, author } = req.body;
        console.log('Received update data:', req.body); // Log received data
        if (!title || !content || !author) {
            return res.status(400).json({ error: 'Title, content, and author are required' });
        }
        try {
            const pool = await getDbConnection();
            await pool.request()
                .input('id', sql.Int, id)
                .input('title', sql.NVarChar, title)
                .input('content', sql.NVarChar, content)
                .input('author', sql.NVarChar, author)
                .query('UPDATE blog_posts SET title = @title, content = @content, author = @author WHERE id = @id');
            res.json({ message: 'Post updated successfully' });
        } catch (err) {
            console.error('Error updating post:', err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    deletePost: async (req, res) => {
        const { id } = req.params;
        try {
            console.log('Received request to delete post with ID:', id); // Log received ID
            const pool = await getDbConnection();
            const result = await pool.request().input('id', sql.Int, id).query('DELETE FROM blog_posts WHERE id = @id');
            if (result.rowsAffected[0] === 0) {
                return res.status(404).json({ error: 'Post not found' });
            }
            res.status(204).end();
        } catch (err) {
            console.error('Error deleting post:', err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

module.exports = BlogController;
