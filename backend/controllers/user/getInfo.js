const pool = require("../../config/db")

const getInfo = async(req, res)=>{
    try {
        const {username} = req.query
        const queryUser = `SELECT * FROM users WHERE username = $1`
        const user = await pool.query(queryUser, [username?username:req.user.username])
        if(user.rowCount !== 1){
            return res.status(404).json({
                    status: false,
                    message: `User no existe`
            })
        }

        const queryGetRelacion = `
            SELECT 
                name, 
                ui.id_inmueble, 
                codigoInmueble, 
                nombre AS titular,
                TRIM(
                    CONCAT_WS(
                        ' ',
                        CASE WHEN calle <> '' THEN 'Calle: ' || calle ELSE NULL END,
                        CASE WHEN numero <> '' AND numero <> '0' THEN numero ELSE NULL END,
                        CASE WHEN piso <> '' THEN ', Piso: ' || piso ELSE NULL END,
                        CASE WHEN depto <> '' THEN ', Depto: ' || depto ELSE NULL END,
                        CASE WHEN manzana <> '' THEN ', Manzana: ' || manzana ELSE NULL END,
                        CASE WHEN block <> '' THEN ', Block: ' || block ELSE NULL END,
                        CASE WHEN lote <> '' THEN ', Lote: ' || lote ELSE NULL END,
                        CASE WHEN casa <> '' THEN ', Casa: ' || casa ELSE NULL END,
                        CASE WHEN barrio <> '' THEN ', Barrio: ' || barrio ELSE NULL END,
                        CASE WHEN localidad <> '' THEN localidad ELSE NULL END
                    )
                ) AS direccion
            FROM users u 
            LEFT JOIN user_inmueble ui ON u.id_user = ui.id_user 
            LEFT JOIN inmueble i ON ui.id_inmueble = i.id_inmueble
            WHERE u.id_user = $1;
            `
        const relacion = await pool.query(queryGetRelacion, [user.rows[0].id_user])
        //console.log(relacion)
        const infoUser = {
            id: user.rows[0].id_user,
            username: user.rows[0].username,
            name: user.rows[0].name,
            email: user.rows[0].email,
            inmuebles: []
        }
        relacion.rows.forEach((i) => {
            infoUser.inmuebles.push({id_inmueble: i.id_inmueble, codInmueble: i.codigoinmueble, titular: i.titular, direccion: i.direccion});
            
        });

        res.status(200).json({
            status: true,
            message: "Usuario encontrado exitosamente.",
            data: infoUser
        })
    } catch (error) {
        console.error("Error:", error);
        let message
        if (error.name === "TokenExpiredError") {
            message = "Sesion expirada, inicie sesion otra vez.";
        } else if (error.name === "JsonWebTokenError") {
            message = "Inicio de sesion invalida.";
        } else {
            message = "Error en sesion:", error.message;
        }
        res.status(500).json({
        status: false,
        message: "Error al obtener informacion del usuario",
        error: message
        });
    }
}
module.exports = getInfo