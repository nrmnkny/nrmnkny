const sql = require('mssql');
const { query } = require('../config/db');

const DataModel = {
    getAllEducation: async () => {
        return await query("SELECT * FROM portfolio_data WHERE category='education'");
    },
    getAllWorkExperience: async () => {
        return await query("SELECT * FROM portfolio_data WHERE category='work'");
    },
    getAllSkills: async () => {
        return await query("SELECT * FROM portfolio_data WHERE category='skills'");
    },
    getAllProjects: async () => {
        return await query("SELECT * FROM portfolio_data WHERE category='projects'");
    },
    getAllResearchInterests: async () => {
        return await query("SELECT * FROM portfolio_data WHERE category='research'");
    },
    createEducation: async (data) => {
        return await query(
            "INSERT INTO portfolio_data (category, title, description, start_date, end_date) VALUES ('education', @Title, @Description, @StartDate, @EndDate)",
            [
                { name: 'Title', type: sql.NVarChar, value: data.title },
                { name: 'Description', type: sql.NVarChar, value: data.description },
                { name: 'StartDate', type: sql.Date, value: data.start_date },
                { name: 'EndDate', type: sql.Date, value: data.end_date }
            ]
        );
    },
    updateEducation: async (id, data) => {
        return await query(
            "UPDATE portfolio_data SET title = @Title, description = @Description, start_date = @StartDate, end_date = @EndDate WHERE id = @Id AND category = 'education'",
            [
                { name: 'Id', type: sql.Int, value: id },
                { name: 'Title', type: sql.NVarChar, value: data.title },
                { name: 'Description', type: sql.NVarChar, value: data.description },
                { name: 'StartDate', type: sql.Date, value: data.start_date },
                { name: 'EndDate', type: sql.Date, value: data.end_date }
            ]
        );
    },
    deleteEducation: async (id) => {
        return await query("DELETE FROM portfolio_data WHERE id = @Id AND category = 'education'", [
            { name: 'Id', type: sql.Int, value: id }
        ]);
    },
    createWorkExperience: async (data) => {
        return await query(
            "INSERT INTO portfolio_data (category, title, description, start_date, end_date) VALUES ('work', @Title, @Description, @StartDate, @EndDate)",
            [
                { name: 'Title', type: sql.NVarChar, value: data.title },
                { name: 'Description', type: sql.NVarChar, value: data.description },
                { name: 'StartDate', type: sql.Date, value: data.start_date },
                { name: 'EndDate', type: sql.Date, value: data.end_date }
            ]
        );
    },
    updateWorkExperience: async (id, data) => {
        return await query(
            "UPDATE portfolio_data SET title = @Title, description = @Description, start_date = @StartDate, end_date = @EndDate WHERE id = @Id AND category = 'work'",
            [
                { name: 'Id', type: sql.Int, value: id },
                { name: 'Title', type: sql.NVarChar, value: data.title },
                { name: 'Description', type: sql.NVarChar, value: data.description },
                { name: 'StartDate', type: sql.Date, value: data.start_date },
                { name: 'EndDate', type: sql.Date, value: data.end_date }
            ]
        );
    },
    deleteWorkExperience: async (id) => {
        return await query("DELETE FROM portfolio_data WHERE id = @Id AND category = 'work'", [
            { name: 'Id', type: sql.Int, value: id }
        ]);
    },
    createSkills: async (data) => {
        return await query(
            "INSERT INTO portfolio_data (category, title, description) VALUES ('skills', @Title, @Description)",
            [
                { name: 'Title', type: sql.NVarChar, value: data.title },
                { name: 'Description', type: sql.NVarChar, value: data.description }
            ]
        );
    },
    updateSkills: async (id, data) => {
        return await query(
            "UPDATE portfolio_data SET title = @Title, description = @Description WHERE id = @Id AND category = 'skills'",
            [
                { name: 'Id', type: sql.Int, value: id },
                { name: 'Title', type: sql.NVarChar, value: data.title },
                { name: 'Description', type: sql.NVarChar, value: data.description }
            ]
        );
    },
    deleteSkills: async (id) => {
        return await query("DELETE FROM portfolio_data WHERE id = @Id AND category = 'skills'", [
            { name: 'Id', type: sql.Int, value: id }
        ]);
    },
    createProjects: async (data) => {
        return await query(
            "INSERT INTO portfolio_data (category, title, description) VALUES ('projects', @Title, @Description)",
            [
                { name: 'Title', type: sql.NVarChar, value: data.title },
                { name: 'Description', type: sql.NVarChar, value: data.description }
            ]
        );
    },
    updateProjects: async (id, data) => {
        return await query(
            "UPDATE portfolio_data SET title = @Title, description = @Description WHERE id = @Id AND category = 'projects'",
            [
                { name: 'Id', type: sql.Int, value: id },
                { name: 'Title', type: sql.NVarChar, value: data.title },
                { name: 'Description', type: sql.NVarChar, value: data.description }
            ]
        );
    },
    deleteProjects: async (id) => {
        return await query("DELETE FROM portfolio_data WHERE id = @Id AND category = 'projects'", [
            { name: 'Id', type: sql.Int, value: id }
        ]);
    },
    createResearchInterests: async (data) => {
        return await query(
            "INSERT INTO portfolio_data (category, title, description) VALUES ('research', @Title, @Description)",
            [
                { name: 'Title', type: sql.NVarChar, value: data.title },
                { name: 'Description', type: sql.NVarChar, value: data.description }
            ]
        );
    },
    updateResearchInterests: async (id, data) => {
        return await query(
            "UPDATE portfolio_data SET title = @Title, description = @Description WHERE id = @Id AND category = 'research'",
            [
                { name: 'Id', type: sql.Int, value: id },
                { name: 'Title', type: sql.NVarChar, value: data.title },
                { name: 'Description', type: sql.NVarChar, value: data.description }
            ]
        );
    },
    deleteResearchInterests: async (id) => {
        return await query("DELETE FROM portfolio_data WHERE id = @Id AND category = 'research'", [
            { name: 'Id', type: sql.Int, value: id }
        ]);
    }
};

module.exports = DataModel;
