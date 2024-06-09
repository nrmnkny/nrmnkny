const express = require('express');
const cors = require('cors');
const dataRoutes = require('./routes/dataRoutes');
const blogRoutes = require('./routes/blogRoutes');
const authRoutes = require('./routes/authRoutes');
const { checkAuth } = require('./middlewares/authMiddleware');

const app = express();

const corsOptions = {
  origin: ['https://nrmnkny.vercel.app', 'https://nrmnkny-r6fc6b59h-quirkscodes-projects.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use('/api/portfolio', dataRoutes);
app.use('/api/blog', checkAuth, blogRoutes); 
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
