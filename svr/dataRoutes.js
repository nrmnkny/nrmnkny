const express = require('express');
const DataController = require('./dataController');
const BlogController = require('./blogController');

const router = express.Router();

router.get('/education', DataController.getAllEducation);
router.get('/workexperience', DataController.getAllWorkExperience);
router.get('/skills', DataController.getAllSkills);
router.get('/projects', DataController.getAllProjects);
router.get('/researchinterests', DataController.getAllResearchInterests);

// Blog routes
router.get('/blog', BlogController.getAllPosts);
router.post('/blog', BlogController.createPost);
router.put('/blog/:id', BlogController.updatePost);
router.delete('/blog/:id', BlogController.deletePost);

module.exports = router;
