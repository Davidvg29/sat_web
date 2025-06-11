const express = require('express');
const router = express.Router();

const prueba = require('../controllers/prueba');
const auth = require('../controllers/user/auth');

router.get('/prueba', prueba);

//user
router.post("/user/auth", auth);

module.exports = router;