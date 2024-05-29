const { getDbConnection } = require('../config/db');

const DataModel = {
  getAllEducation: async () => {
    try {
      const pool = await getDbConnection();
      const result = await pool.request().query("SELECT * FROM portfolio_data WHERE category='education'");
      console.log('Education data fetched:', result.recordset);
      return result.recordset;
    } catch (err) {
      console.error('Error fetching education data:', err);
      throw err;
    }
  },
  getAllWorkExperience: async () => {
    try {
      const pool = await getDbConnection();
      const result = await pool.request().query("SELECT * FROM portfolio_data WHERE category='work'");
      console.log('Work experience data fetched:', result.recordset);
      return result.recordset;
    } catch (err) {
      console.error('Error fetching work experience data:', err);
      throw err;
    }
  },
  getAllSkills: async () => {
    try {
      const pool = await getDbConnection();
      const result = await pool.request().query("SELECT * FROM portfolio_data WHERE category='skills'");
      console.log('Skills data fetched:', result.recordset);
      return result.recordset;
    } catch (err) {
      console.error('Error fetching skills data:', err);
      throw err;
    }
  },
  getAllProjects: async () => {
    try {
      const pool = await getDbConnection();
      const result = await pool.request().query("SELECT * FROM portfolio_data WHERE category='projects'");
      console.log('Projects data fetched:', result.recordset);
      return result.recordset;
    } catch (err) {
      console.error('Error fetching projects data:', err);
      throw err;
    }
  },
  getAllResearchInterests: async () => {
    try {
      const pool = await getDbConnection();
      const result = await pool.request().query("SELECT * FROM portfolio_data WHERE category='research'");
      console.log('Research interests data fetched:', result.recordset);
      return result.recordset;
    } catch (err) {
      console.error('Error fetching research interests data:', err);
      throw err;
    }
  }
};

module.exports = DataModel;
