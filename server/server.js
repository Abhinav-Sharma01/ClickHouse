const express = require('express');
const cors = require('cors');


const ingestionRoutes = require('./routes/ingestion');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', ingestionRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));