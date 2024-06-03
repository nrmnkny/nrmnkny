const sql = require('mssql');
const { getDbConnection } = require('../config/db');

const DataController = {
  getAllEducation: async (req, res) => {
    try {
      const pool = await getDbConnection();
      const result = await pool.request().query("SELECT * FROM portfolio_data WHERE category='education'");
      console.log('Query executed successfully', result);
      res.json(result.recordset);
    } catch (err) {
      console.error('Error fetching work experience:', err.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  getAllWorkExperience: async (req, res) => {
    try {
      const pool = await getDbConnection();
      const result = await pool.request().query("SELECT * FROM portfolio_data WHERE category='work'");
      res.json(result.recordset);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  getAllSkills: async (req, res) => {
    try {
      const pool = await getDbConnection();
      const result = await pool.request().query("SELECT * FROM portfolio_data WHERE category='skills'");
      res.json(result.recordset);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  getAllProjects: async (req, res) => {
    try {
      const pool = await getDbConnection();
      const result = await pool.request().query("SELECT * FROM portfolio_data WHERE category='projects'");
      res.json(result.recordset);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  getAllResearchInterests: async (req, res) => {
    try {
      const pool = await getDbConnection();
      const result = await pool.request().query("SELECT * FROM portfolio_data WHERE category='research'");
      res.json(result.recordset);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  createEducation: async (req, res) => {
    const { title, description, start_date, end_date } = req.body;
    try {
      const pool = await getDbConnection();
      await pool.request()
        .input('title', sql.NVarChar, title)
        .input('description', sql.NVarChar, description)
        .input('start_date', sql.Date, start_date)
        .input('end_date', sql.Date, end_date)
        .query("INSERT INTO portfolio_data (category, title, description, start_date, end_date) VALUES ('education', @title, @description, @start_date, @end_date)");
      res.status(201).json({ message: 'Education created successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  updateEducation: async (req, res) => {
    const { id } = req.params;
    const { title, description, start_date, end_date } = req.body;
    try {
      const pool = await getDbConnection();
      await pool.request()
        .input('id', sql.Int, id)
        .input('title', sql.NVarChar, title)
        .input('description', sql.NVarChar, description)
        .input('start_date', sql.Date, start_date)
        .input('end_date', sql.Date, end_date)
        .query("UPDATE portfolio_data SET title = @title, description = @description, start_date = @start_date, end_date = @end_date WHERE id = @id AND category = 'education'");
      res.status(200).json({ message: 'Education updated successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  deleteEducation: async (req, res) => {
    const { id } = req.params;
    try {
      const pool = await getDbConnection();
      await pool.request().input('id', sql.Int, id).query("DELETE FROM portfolio_data WHERE id = @id AND category = 'education'");
      res.status(204).end();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  createWorkExperience: async (req, res) => {
    const { title, description, start_date, end_date } = req.body;
    try {
      const pool = await getDbConnection();
      await pool.request()
        .input('title', sql.NVarChar, title)
        .input('description', sql.NVarChar, description)
        .input('start_date', sql.Date, start_date)
        .input('end_date', sql.Date, end_date)
        .query("INSERT INTO portfolio_data (category, title, description, start_date, end_date) VALUES ('work', @title, @description, @start_date, @end_date)");
      res.status(201).json({ message: 'Work experience created successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  updateWorkExperience: async (req, res) => {
    const { id } = req.params;
    const { title, description, start_date, end_date } = req.body;
    try {
      const pool = await getDbConnection();
      await pool.request()
        .input('id', sql.Int, id)
        .input('title', sql.NVarChar, title)
        .input('description', sql.NVarChar, description)
        .input('start_date', sql.Date, start_date)
        .input('end_date', sql.Date, end_date)
        .query("UPDATE portfolio_data SET title = @title, description = @description, start_date = @start_date, end_date = @end_date WHERE id = @id AND category = 'work'");
      res.status(200).json({ message: 'Work experience updated successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  deleteWorkExperience: async (req, res) => {
    const { id } = req.params;
    try {
      const pool = await getDbConnection();
      await pool.request().input('id', sql.Int, id).query("DELETE FROM portfolio_data WHERE id = @id AND category = 'work'");
      res.status(204).end();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  createSkills: async (req, res) => {
    const { title, description } = req.body;
    try {
      const pool = await getDbConnection();
      await pool.request()
        .input('title', sql.NVarChar, title)
        .input('description', sql.NVarChar, description)
        .query("INSERT INTO portfolio_data (category, title, description) VALUES ('skills', @title, @description)");
      res.status(201).json({ message: 'Skill created successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  updateSkills: async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    try {
      const pool = await getDbConnection();
      await pool.request()
        .input('id', sql.Int, id)
        .input('title', sql.NVarChar, title)
        .input('description', sql.NVarChar, description)
        .query("UPDATE portfolio_data SET title = @title, description = @description WHERE id = @id AND category = 'skills'");
      res.status(200).json({ message: 'Skill updated successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  deleteSkills: async (req, res) => {
    const { id } = req.params;
    try {
      const pool = await getDbConnection();
      await pool.request().input('id', sql.Int, id).query("DELETE FROM portfolio_data WHERE id = @id AND category = 'skills'");
      res.status(204).end();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  createProjects: async (req, res) => {
    const { title, description } = req.body;
    try {
      const pool = await getDbConnection();
      await pool.request()
        .input('title', sql.NVarChar, title)
        .input('description', sql.NVarChar, description)
        .query("INSERT INTO portfolio_data (category, title, description) VALUES ('projects', @title, @description)");
      res.status(201).json({ message: 'Project created successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  updateProjects: async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    try {
      const pool = await getDbConnection();
      await pool.request()
        .input('id', sql.Int, id)
        .input('title', sql.NVarChar, title)
        .input('description', sql.NVarChar, description)
        .query("UPDATE portfolio_data SET title = @title, description = @description WHERE id = @id AND category = 'projects'");
      res.status(200).json({ message: 'Project updated successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  deleteProjects: async (req, res) => {
    const { id } = req.params;
    try {
      const pool = await getDbConnection();
      await pool.request().input('id', sql.Int, id).query("DELETE FROM portfolio_data WHERE id = @id AND category = 'projects'");
      res.status(204).end();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  createResearchInterests: async (req, res) => {
    const { title, description } = req.body;
    try {
      const pool = await getDbConnection();
      await pool.request()
        .input('title', sql.NVarChar, title)
        .input('description', sql.NVarChar, description)
        .query("INSERT INTO portfolio_data (category, title, description) VALUES ('research', @title, @description)");
      res.status(201).json({ message: 'Research interest created successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  updateResearchInterests: async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    try {
      const pool = await getDbConnection();
      await pool.request()
        .input('id', sql.Int, id)
        .input('title', sql.NVarChar, title)
        .input('description', sql.NVarChar, description)
        .query("UPDATE portfolio_data SET title = @title, description = @description WHERE id = @id AND category = 'research'");
      res.status(200).json({ message: 'Research interest updated successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  deleteResearchInterests: async (req, res) => {
    const { id } = req.params;
    try {
      const pool = await getDbConnection();
      await pool.request().input('id', sql.Int, id).query("DELETE FROM portfolio_data WHERE id = @id AND category = 'research'");
      res.status(204).end();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = DataController;
