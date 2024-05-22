const db = require('./db');

const DataModel = {
  getAllEducation: (callback) => {
    const sql = "SELECT * FROM portfolio_data WHERE category='education'";
    db.query(sql, callback);
  },
  getAllWorkExperience: (callback) => {
    const sql = "SELECT * FROM portfolio_data WHERE category='work'";
    db.query(sql, callback);
  },
  getAllSkills: (callback) => {
    const sql = "SELECT * FROM portfolio_data WHERE category='skills'";
    db.query(sql, callback);
  },
  getAllProjects: (callback) => {
    const sql = "SELECT * FROM portfolio_data WHERE category='projects'";
    db.query(sql, callback);
  },
  getAllResearchInterests: (callback) => {
    const sql = "SELECT * FROM portfolio_data WHERE category='research'";
    db.query(sql, callback);
  }
};

module.exports = DataModel;
