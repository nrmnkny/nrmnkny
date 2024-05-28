const BlogModel = require('./blogModel');

const BlogController = {
  getAllPosts: (req, res) => {
    BlogModel.getAllPosts((err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(results);
    });
  },
  createPost: (req, res) => {
    const { title, content, author, published_date } = req.body;
    BlogModel.createPost({ title, content, author, published_date }, (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: 'Blog post created', id: result.insertId });
    });
  },
  updatePost: (req, res) => {
    const { title, content, author, published_date } = req.body;
    const { id } = req.params;
    BlogModel.updatePost(id, { title, content, author, published_date }, (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: 'Blog post updated' });
    });
  },
  deletePost: (req, res) => {
    const { id } = req.params;
    BlogModel.deletePost(id, (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: 'Blog post deleted' });
    });
  }
};

module.exports = BlogController;
