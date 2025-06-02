const express = require('express');
const router = express.Router();

const prueba = require('../controllers/prueba');

router.get('/prueba', prueba);

module.exports = router;