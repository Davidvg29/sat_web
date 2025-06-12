const relacionUserInmueble = async (req, res)=>{
    try {
        const {idUser, codInmueble} = req.body
        res.status(200).json({
            message: "relacion user inmueble "
        })
    } catch (error) {
        res.status(500).json({
            message: "Error al asociar usuario con el inmueble"
        })
    }
}
module.exports = relacionUserInmueble