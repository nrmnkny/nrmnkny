const express = require('express');
const DataController = require('./dataController');

const router = express.Router();

router.get('/education', DataController.getAllEducation);
router.get('/workexperience', DataController.getAllWorkExperience);
router.get('/skills', DataController.getAllSkills);
router.get('/projects', DataController.getAllProjects);
router.get('/researchinterests', DataController.getAllResearchInterests);

module.exports = router;
