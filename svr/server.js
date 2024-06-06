require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dataRoutes = require('./routes/dataRoutes');
const blogRoutes = require('./routes/blogRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Get the allowed origin from the environment variable
const allowedOrigin = process.env.ALLOWED_ORIGIN;

app.use(cors({
  origin: allowedOrigin,
  credentials: true,
}));

app.use(express.json());

app.use('/api/portfolio', dataRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
