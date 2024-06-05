const sql = require('mssql');
const { getDbConnection } = require('../config/db');

const DataController = {
  getAllItems: async (req, res) => {
    try {
      const pool = await getDbConnection();
      const result = await pool.request().query("SELECT * FROM portfolio_data");
      res.json(result.recordset);
    } catch (err) {
      console.error('Error fetching all items:', err);
      res.status(500).json({ error: err.message });
    }
  },
  getItemById: async (req, res) => {
    const { id } = req.params;
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid ID parameter' });
    }
    try {
      const pool = await getDbConnection();
      const result = await pool.request().input('id', sql.Int, id).query("SELECT * FROM portfolio_data WHERE id = @id");
      res.json(result.recordset[0]);
    } catch (err) {
      console.error(`Error fetching item by ID ${id}:`, err);
      res.status(500).json({ error: err.message });
    }
  },
  getAllEducation: async (req, res) => {
    try {
      const pool = await getDbConnection();
      const result = await pool.request().query("SELECT * FROM portfolio_data WHERE category='education'");
      res.json(result.recordset);
    } catch (err) {
      console.error('Error fetching education data:', err);
      res.status(500).json({ error: err.message });
    }
  },
  getAllWorkExperience: async (req, res) => {
    try {
      const pool = await getDbConnection();
      const result = await pool.request().query("SELECT * FROM portfolio_data WHERE category='work'");
      res.json(result.recordset);
    } catch (err) {
      console.error('Error fetching work experience data:', err);
      res.status(500).json({ error: err.message });
    }
  },
  getAllSkills: async (req, res) => {
    try {
      const pool = await getDbConnection();
      const result = await pool.request().query("SELECT * FROM portfolio_data WHERE category='skills'");
      res.json(result.recordset);
    } catch (err) {
      console.error('Error fetching skills data:', err);
      res.status(500).json({ error: err.message });
    }
  },
  getAllProjects: async (req, res) => {
    try {
      const pool = await getDbConnection();
      const result = await pool.request().query("SELECT * FROM portfolio_data WHERE category='projects'");
      res.json(result.recordset);
    } catch (err) {
      console.error('Error fetching projects data:', err);
      res.status(500).json({ error: err.message });
    }
  },
  getAllResearchInterests: async (req, res) => {
    try {
      const pool = await getDbConnection();
      const result = await pool.request().query("SELECT * FROM portfolio_data WHERE category='research'");
      res.json(result.recordset);
    } catch (err) {
      console.error('Error fetching research interests data:', err);
      res.status(500).json({ error: err.message });
    }
  },
  createItem: async (req, res) => {
    const { title, description, category, start_date, end_date } = req.body;
    try {
      const pool = await getDbConnection();
      const query = category === 'skills' ? 
        "INSERT INTO portfolio_data (title, description, category) VALUES (@title, @description, @category)" :
        "INSERT INTO portfolio_data (title, description, category, start_date, end_date) VALUES (@title, @description, @category, @start_date, @end_date)";
      
      const request = pool.request()
        .input('title', sql.NVarChar, title)
        .input('description', sql.NVarChar, description)
        .input('category', sql.NVarChar, category);

      if (category !== 'skills') {
        request.input('start_date', sql.Date, start_date)
          .input('end_date', sql.Date, end_date);
      }

      await request.query(query);
      res.status(201).json({ message: 'Item created successfully' });
    } catch (err) {
      console.error('Error creating item:', err);
      res.status(500).json({ error: err.message });
    }
  },
  updateItem: async (req, res) => {
    const { id } = req.params;
    const { title, description, category, start_date, end_date } = req.body;
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid ID parameter' });
    }
    try {
      const pool = await getDbConnection();
      const query = category === 'skills' ? 
        "UPDATE portfolio_data SET title = @title, description = @description, category = @category WHERE id = @id" :
        "UPDATE portfolio_data SET title = @title, description = @description, category = @category, start_date = @start_date, end_date = @end_date WHERE id = @id";

      const request = pool.request()
        .input('id', sql.Int, id)
        .input('title', sql.NVarChar, title)
        .input('description', sql.NVarChar, description)
        .input('category', sql.NVarChar, category);

      if (category !== 'skills') {
        request.input('start_date', sql.Date, start_date)
          .input('end_date', sql.Date, end_date);
      }

      await request.query(query);
      res.json({ message: 'Item updated successfully' });
    } catch (err) {
      console.error(`Error updating item with ID ${id}:`, err);
      res.status(500).json({ error: err.message });
    }
  },
  deleteItem: async (req, res) => {
    const { id } = req.params;
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid ID parameter' });
    }
    try {
      const pool = await getDbConnection();
      await pool.request().input('id', sql.Int, id).query("DELETE FROM portfolio_data WHERE id = @id");
      res.status(204).end();
    } catch (err) {
      console.error(`Error deleting item with ID ${id}:`, err);
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = DataController;
