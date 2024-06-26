const express = require('express');
const BlogController = require('../controllers/blogController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', BlogController.getAllPosts);
router.get('/:id', BlogController.getPostById);
router.post('/', authMiddleware, BlogController.createPost);
router.put('/:id', authMiddleware, BlogController.updatePost);
router.delete('/:id', authMiddleware, BlogController.deletePost);

module.exports = router;
