const DataModel = require('./dataModel');

const DataController = {
  getAllEducation: async (req, res) => {
    try {
      const results = await DataModel.getAllEducation();
      res.json(results);
    } catch (err) {
      console.error('Error fetching education data:', err);
      res.status(500).json({ error: err.message });
    }
  },
  getAllWorkExperience: async (req, res) => {
    try {
      const results = await DataModel.getAllWorkExperience();
      res.json(results);
    } catch (err) {
      console.error('Error fetching work experience data:', err);
      res.status(500).json({ error: err.message });
    }
  },
  getAllSkills: async (req, res) => {
    try {
      const results = await DataModel.getAllSkills();
      res.json(results);
    } catch (err) {
      console.error('Error fetching skills data:', err);
      res.status(500).json({ error: err.message });
    }
  },
  getAllProjects: async (req, res) => {
    try {
      const results = await DataModel.getAllProjects();
      res.json(results);
    } catch (err) {
      console.error('Error fetching projects data:', err);
      res.status(500).json({ error: err.message });
    }
  },
  getAllResearchInterests: async (req, res) => {
    try {
      const results = await DataModel.getAllResearchInterests();
      res.json(results);
    } catch (err) {
      console.error('Error fetching research interests data:', err);
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = DataController;
