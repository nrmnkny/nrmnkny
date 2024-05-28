const { getDbConnection } = require('./db');

const DataModel = {
  getAllEducation: async () => {
    // console.log('getAllEducation called');
    const pool = await getDbConnection();
    const result = await pool.request().query("SELECT * FROM portfolio_data WHERE category='education'");
    console.log('Education data fetched:', result.recordset);
    return result.recordset;
  },
  getAllWorkExperience: async () => {
    // console.log('getAllWorkExperience called');
    const pool = await getDbConnection();
    const result = await pool.request().query("SELECT * FROM portfolio_data WHERE category='work'");
    console.log('Work experience data fetched:', result.recordset);
    return result.recordset;
  },
  getAllSkills: async () => {
    // console.log('getAllSkills called');
    const pool = await getDbConnection();
    const result = await pool.request().query("SELECT * FROM portfolio_data WHERE category='skills'");
    console.log('Skills data fetched:', result.recordset);
    return result.recordset;
  },
  getAllProjects: async () => {
    // console.log('getAllProjects called');
    const pool = await getDbConnection();
    const result = await pool.request().query("SELECT * FROM portfolio_data WHERE category='projects'");
    console.log('Projects data fetched:', result.recordset);
    return result.recordset;
  },
  getAllResearchInterests: async () => {
    // console.log('getAllResearchInterests called');
    const pool = await getDbConnection();
    const result = await pool.request().query("SELECT * FROM portfolio_data WHERE category='research'");
    console.log('Research interests data fetched:', result.recordset);
    return result.recordset;
  }
};

module.exports = DataModel;
