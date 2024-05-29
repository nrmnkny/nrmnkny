const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const { query } = require('../config/db');
const sql = require('mssql');

const router = express.Router();

// Registration endpoint
router.post(
    '/register',
    [
        body('username').notEmpty().withMessage('Username is required'),
        body('email').isEmail().withMessage('Email is invalid'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, email, password } = req.body;

        try {
            // Check if user already exists
            const existingUserQuery = 'SELECT * FROM users WHERE email = @Email';
            const existingUser = await query(existingUserQuery, [{ name: 'Email', type: sql.NVarChar, value: email }]);

            if (existingUser.length > 0) {
                return res.status(400).json({ message: 'User already exists' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const insertUserQuery = `
                INSERT INTO users (username, email, password)
                VALUES (@Username, @Email, @Password)
            `;

            const inputs = [
                { name: 'Username', type: sql.NVarChar, value: username },
                { name: 'Email', type: sql.NVarChar, value: email },
                { name: 'Password', type: sql.NVarChar, value: hashedPassword },
            ];

            await query(insertUserQuery, inputs);

            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            console.error('Error registering user:', error);
            res.status(500).json({ message: 'Server error' });
        }
    }
);

// Login endpoint
router.post(
    '/login',
    [
        body('email').isEmail().withMessage('Email is invalid'),
        body('password').exists().withMessage('Password is required'),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            const userQuery = 'SELECT * FROM users WHERE email = @Email';
            const userResult = await query(userQuery, [{ name: 'Email', type: sql.NVarChar, value: email }]);
            const user = userResult[0];

            if (!user) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            const payload = {
                user: {
                    id: user.id,
                    username: user.username,
                },
            };

            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

            res.json({ token });
        } catch (error) {
            console.error('Error logging in user:', error);
            res.status(500).json({ message: 'Server error' });
        }
    }
);

module.exports = router;
