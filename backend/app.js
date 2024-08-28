const express = require('express');
const cors = require('cors');
const appRoutes = require('./routes/appRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/apps', appRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
