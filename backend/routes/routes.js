const express = require('express');
const router = express.Router();

const auth = require('../controllers/user/auth');
const relacionUserInmueble = require('../controllers/inmueble/relacionUserInmueble');
const getInmueble = require('../controllers/inmueble/getInmueble');
const getInfo = require('../controllers/user/getInfo');
const getFacturaPdf = require('../controllers/factura/getFacturaPdf');
const deleteRelacionUserInmueble = require('../controllers/inmueble/deleteRelacionUserInmueble');
const getDeuda = require('../controllers/inmueble/getDeuda');
const { verifyToken } = require('../middlewares/jwt');

//user
router.get("/user/verify", (req, res)=>{
     const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "No autenticado" });
  }

  try {
    const {username} = verifyToken(token);
    res.json(username); // Podés hacer query para datos extra si querés
  } catch (error) {
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
})
router.post("/user/auth", auth);
router.get("/user", getInfo)

//inmueble
router.post("/inmueble/asociar", relacionUserInmueble)
router.get("/inmueble/:codInmueble", getInmueble)
router.delete("/inmueble/desasociar", deleteRelacionUserInmueble)
router.get("/inmueble/deuda/:codInmueble", getDeuda)
//factura
router.get("/factura/:numFactura", getFacturaPdf)

module.exports = router;