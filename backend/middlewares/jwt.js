const jwt = require("jsonwebtoken");
require("dotenv").config();

const createToken = (payload)=>{
    return jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {expiresIn: "15m" }
    )
}

//middleware que verifica si el token es valido, se agrega al crear cada ruta en routes.js como middleware
const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            status: false,
            message: "No autenticado" 
        });
    }
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = payload;
        next();
    } catch (error) {
        console.error("Error al verificar token:", error.message);
        return res.status(401).json({
                status: false,
                message: "Token inválido o expirado" 
            });
    }
};

module.exports = {createToken, verifyToken}