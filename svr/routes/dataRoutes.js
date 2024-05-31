const express = require('express');
const DataController = require('../controllers/dataController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/education', DataController.getAllEducation);
router.get('/workexperience', DataController.getAllWorkExperience);
router.get('/skills', DataController.getAllSkills);
router.get('/projects', DataController.getAllProjects);
router.get('/researchinterests', DataController.getAllResearchInterests);

// Protected routes for managing portfolio data
router.post('/education', authMiddleware, DataController.createEducation);
router.put('/education/:id', authMiddleware, DataController.updateEducation);
router.delete('/education/:id', authMiddleware, DataController.deleteEducation);

router.post('/workexperience', authMiddleware, DataController.createWorkExperience);
router.put('/workexperience/:id', authMiddleware, DataController.updateWorkExperience);
router.delete('/workexperience/:id', authMiddleware, DataController.deleteWorkExperience);

router.post('/skills', authMiddleware, DataController.createSkills);
router.put('/skills/:id', authMiddleware, DataController.updateSkills);
router.delete('/skills/:id', authMiddleware, DataController.deleteSkills);

router.post('/projects', authMiddleware, DataController.createProjects);
router.put('/projects/:id', authMiddleware, DataController.updateProjects);
router.delete('/projects/:id', authMiddleware, DataController.deleteProjects);

router.post('/researchinterests', authMiddleware, DataController.createResearchInterests);
router.put('/researchinterests/:id', authMiddleware, DataController.updateResearchInterests);
router.delete('/researchinterests/:id', authMiddleware, DataController.deleteResearchInterests);

module.exports = router;
