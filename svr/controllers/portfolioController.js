const sql = require('mssql');
const { getDbConnection } = require('../config/db');

const PortfolioController = {
  getAllItems: async (req, res) => {
    try {
      const pool = await getDbConnection();
      const result = await pool.request().query("SELECT * FROM portfolio_data");
      res.json(result.recordset);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  getItemsByCategory: async (req, res) => {
    const { category } = req.params;
    try {
      const pool = await getDbConnection();
      const result = await pool.request().input('category', sql.NVarChar, category).query("SELECT * FROM portfolio_data WHERE category = @category");
      res.json(result.recordset);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  createItem: async (req, res) => {
    const { title, description, category, start_date, end_date } = req.body;
    try {
      const pool = await getDbConnection();
      await pool.request()
        .input('title', sql.NVarChar, title)
        .input('description', sql.NVarChar, description)
        .input('category', sql.NVarChar, category)
        .input('start_date', sql.Date, start_date)
        .input('end_date', sql.Date, end_date)
        .query("INSERT INTO portfolio_data (title, description, category, start_date, end_date) VALUES (@title, @description, @category, @start_date, @end_date)");
      res.status(201).json({ message: 'Item created successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  updateItem: async (req, res) => {
    const { id } = req.params;
    const { title, description, category, start_date, end_date } = req.body;
    try {
      const pool = await getDbConnection();
      await pool.request()
        .input('id', sql.Int, id)
        .input('title', sql.NVarChar, title)
        .input('description', sql.NVarChar, description)
        .input('category', sql.NVarChar, category)
        .input('start_date', sql.Date, start_date)
        .input('end_date', sql.Date, end_date)
        .query("UPDATE portfolio_data SET title = @title, description = @description, category = @category, start_date = @start_date, end_date = @end_date WHERE id = @id");
      res.json({ message: 'Item updated successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  deleteItem: async (req, res) => {
    const { id } = req.params;
    try {
      const pool = await getDbConnection();
      await pool.request().input('id', sql.Int, id).query("DELETE FROM portfolio_data WHERE id = @id");
      res.status(204).end();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = PortfolioController;
