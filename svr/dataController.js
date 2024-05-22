const DataModel = require('./dataModel');

const DataController = {
  getAllEducation: (req, res) => {
    DataModel.getAllEducation((err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(results);
    });
  },
  getAllWorkExperience: (req, res) => {
    DataModel.getAllWorkExperience((err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(results);
    });
  },
  getAllSkills: (req, res) => {
    DataModel.getAllSkills((err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(results);
    });
  },
  getAllProjects: (req, res) => {
    DataModel.getAllProjects((err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(results);
    });
  },
  getAllResearchInterests: (req, res) => {
    DataModel.getAllResearchInterests((err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(results);
    });
  }
};

module.exports = DataController;
