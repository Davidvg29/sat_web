const pool = require("../../config/db")

const deleteRelacionUserInmueble = async(req, res)=>{
    try {
        const {idUser, idInmueble} = req.body
        const queryDelete = "delete from user_inmueble where id_user = $1 and id_inmueble = $2"
        const query = await pool.query(queryDelete, [idUser, idInmueble])
        if(query.rowCount === 0){
            return res.status(404).json({
                status: false,
                message: `No se pudo eliminar el inmueble.`
            })
        }
        res.status(200).json({
            status: true,
            message: `Inmueble eliminado correctamente.`
        })
    } catch (error) {
        console.log(error)
    }
}
module.exports = deleteRelacionUserInmueble