const express = require('express');
const BlogController = require('../controllers/blogController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', BlogController.getAllPosts);
router.post('/new', authMiddleware, BlogController.createPost);
router.put('/edit/:id', authMiddleware, BlogController.updatePost);
router.delete('/delete/:id', authMiddleware, BlogController.deletePost);

module.exports = router;
