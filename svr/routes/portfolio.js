const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');

// Portfolio model
const Portfolio = require('../models/Portfolio');

// @route GET api/portfolio
// @desc Get all portfolio items
router.get('/', async (req, res) => {
    try {
        const portfolio = await Portfolio.find();
        res.json(portfolio);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// @route POST api/portfolio
// @desc Create a portfolio item
router.post('/', authenticateToken, async (req, res) => {
    const newPortfolioItem = new Portfolio(req.body);
    try {
        const portfolioItem = await newPortfolioItem.save();
        res.json(portfolioItem);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// @route PUT api/portfolio/:id
// @desc Update a portfolio item
router.put('/:id', authenticateToken, async (req, res) => {
    try {
        const updatedPortfolioItem = await Portfolio.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedPortfolioItem);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// @route DELETE api/portfolio/:id
// @desc Delete a portfolio item
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        await Portfolio.findByIdAndRemove(req.params.id);
        res.json({ message: 'Portfolio item deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
