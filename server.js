const express = require('express');
const cors = require('cors');
const robotsRoute = require('./routes/robots');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/robots', robotsRoute);

const port = process.env.PORT || 5002;
app.listen(port);
