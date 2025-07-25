const express = require('express');
const app = express();
const routes = require('./routes/routes');
const cors = require("cors")
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173",  //el frontend (Vite) está en este puerto
  credentials: true                //necesario para cookies y withCredentials
}))

app.use(morgan('dev'));

// rutas
app.use('/api', routes);

module.exports = app;
