const express = require('express');
const app = express();
const routes = require('./routes/routes');
const cors = require("cors")
const morgan = require('morgan');

app.use(express.json());

app.use(cors())

app.use(morgan('dev'));

// rutas
app.use('/api', routes);

module.exports = app;
