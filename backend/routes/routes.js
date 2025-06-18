const express = require('express');
const router = express.Router();

const prueba = require('../controllers/prueba');
const auth = require('../controllers/user/auth');
const relacionUserInmueble = require('../controllers/inmueble/relacionUserInmueble');
const getInmueble = require('../controllers/inmueble/getInmueble');
const getInfo = require('../controllers/user/getInfo');

router.get('/prueba', prueba);

//user
router.post("/user/auth", auth);
router.get("/user", getInfo)

//inmueble
router.post("/inmueble/asociar", relacionUserInmueble)
router.get("/inmueble/:codInmueble", getInmueble)

module.exports = router;