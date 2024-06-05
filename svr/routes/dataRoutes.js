const express = require('express');
const DataController = require('../controllers/dataController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// General routes
router.get('/', DataController.getAllItems);
router.get('/:id', DataController.getItemById);
router.post('/', authMiddleware, DataController.createItem);
router.put('/:id', authMiddleware, DataController.updateItem);
router.delete('/:id', authMiddleware, DataController.deleteItem);

// Category-based routes
router.get('/category/:content', (req, res) => {
  const { content } = req.params;
  switch (content) {
    case 'education':
      return DataController.getAllEducation(req, res);
    case 'workexperience':
      return DataController.getAllWorkExperience(req, res);
    case 'skills':
      return DataController.getAllSkills(req, res);
    case 'projects':
      return DataController.getAllProjects(req, res);
    case 'researchinterests':
      return DataController.getAllResearchInterests(req, res);
    default:
      return res.status(404).json({ error: 'Not Found' });
  }
});

module.exports = router;
