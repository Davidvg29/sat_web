const express = require('express');
const app = express();
const routes = require('./routes/routes');

app.use(express.json());

// rutas
app.use('/api', routes);

module.exports = app;
