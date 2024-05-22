const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const dataRoutes = require('./dataRoutes');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', dataRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});