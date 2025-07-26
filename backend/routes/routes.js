const express = require('express');
const router = express.Router();

const auth = require('../controllers/user/auth');
const relacionUserInmueble = require('../controllers/inmueble/relacionUserInmueble');
const getInmueble = require('../controllers/inmueble/getInmueble');
const getInfo = require('../controllers/user/getInfo');
const getFacturaPdf = require('../controllers/factura/getFacturaPdf');
const deleteRelacionUserInmueble = require('../controllers/inmueble/deleteRelacionUserInmueble');
const getDeuda = require('../controllers/inmueble/getDeuda');

//middleware que verifica el jwt(agreagr en cada endpoint que necesite estar protegido)
const { verifyToken } = require('../middlewares/jwt');

//user
router.post("/user/auth", auth);
router.get("/user", verifyToken, getInfo)

//inmueble
router.post("/inmueble/asociar", verifyToken, relacionUserInmueble)
router.get("/inmueble/:codInmueble", verifyToken, getInmueble)
router.delete("/inmueble/desasociar", verifyToken, deleteRelacionUserInmueble)
router.get("/inmueble/deuda/:codInmueble", verifyToken, getDeuda)

//factura
router.get("/factura/:numFactura", getFacturaPdf)

module.exports = router;