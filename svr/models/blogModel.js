const db = require('../config/db');

const BlogModel = {
  getAllPosts: (callback) => {
    const sql = 'SELECT * FROM blog_posts';
    db.query(sql, callback);
  },
  createPost: (data, callback) => {
    const sql = 'INSERT INTO blog_posts (title, content, author, published_date) VALUES (?, ?, ?, ?)';
    db.query(sql, [data.title, data.content, data.author, data.published_date], callback);
  },
  updatePost: (id, data, callback) => {
    const sql = 'UPDATE blog_posts SET title = ?, content = ?, author = ?, published_date = ? WHERE id = ?';
    db.query(sql, [data.title, data.content, data.author, data.published_date, id], callback);
  },
  deletePost: (id, callback) => {
    const sql = 'DELETE FROM blog_posts WHERE id = ?';
    db.query(sql, [id], callback);
  }
};

module.exports = BlogModel;
