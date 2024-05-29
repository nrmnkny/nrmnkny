const sql = require('mssql');
const { getDbConnection } = require('../config/db');

const BlogController = {
  getAllPosts: async (req, res) => {
    try {
      const pool = await getDbConnection();
      const result = await pool.request().query('SELECT * FROM blog_posts ORDER BY created_at DESC');
      res.json(result.recordset);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getPostById: async (req, res) => {
    const { id } = req.params;
    try {
      const pool = await getDbConnection();
      const result = await pool.request().input('id', sql.Int, id).query('SELECT * FROM blog_posts WHERE id = @id');
      res.json(result.recordset[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  createPost: async (req, res) => {
    const { title, content, author } = req.body;
    try {
      const pool = await getDbConnection();
      await pool.request()
        .input('title', sql.NVarChar, title)
        .input('content', sql.NVarChar, content)
        .input('author', sql.NVarChar, author)
        .query('INSERT INTO blog_posts (title, content, author) VALUES (@title, @content, @author)');
      res.status(201).json({ message: 'Post created successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  updatePost: async (req, res) => {
    const { id } = req.params;
    const { title, content, author } = req.body;
    try {
      const pool = await getDbConnection();
      await pool.request()
        .input('id', sql.Int, id)
        .input('title', sql.NVarChar, title)
        .input('content', sql.NVarChar, content)
        .input('author', sql.NVarChar, author)
        .query('UPDATE blog_posts SET title = @title, content = @content, author = @author, updated_at = GETDATE() WHERE id = @id');
      res.json({ message: 'Post updated successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  deletePost: async (req, res) => {
    const { id } = req.params;
    try {
      const pool = await getDbConnection();
      await pool.request().input('id', sql.Int, id).query('DELETE FROM blog_posts WHERE id = @id');
      res.json({ message: 'Post deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = BlogController;
