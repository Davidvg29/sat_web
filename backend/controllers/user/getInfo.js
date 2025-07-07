const pool = require("../../config/db")

const getInfo = async(req, res)=>{
    try {
        const {username} = req.query
        const queryUser = `SELECT * FROM users WHERE username = $1`
        const user = await pool.query(queryUser, [username])
        if(user.rowCount !== 1){
            return res.status(404).json({
                    status: false,
                    message: `User no existe`
            })
        }

        const queryGetRelacion = `
            select name, ui.id_inmueble, codigoInmueble 
            from users u 
            left join user_inmueble ui on u.id_user = ui.id_user 
            left join inmueble i on ui.id_inmueble = i.id_inmueble 
            where u.id_user = $1`
        const relacion = await pool.query(queryGetRelacion, [user.rows[0].id_user])
        console.log(relacion)
        const infoUser = {
            id: user.rows[0].id_user,
            name: user.rows[0].name,
            email: user.rows[0].email,
            inmuebles: []
        }
        relacion.rows.forEach((r) => {
            infoUser.inmuebles.push(r.codigoinmueble);
        });

        res.status(200).json({
            status: true,
            message: "Usuario encontrado exitosamente.",
            data: infoUser
        })
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
        status: false,
        message: "Error al obtener informacion del usuario",
        error: error.message
        });
    }
}
module.exports = getInfo