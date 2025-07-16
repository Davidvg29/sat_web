const pool = require("../../config/db")
const { crearArchivoRemoto, leerArchivoRemotoTes, connectSSH, leerArchivoRemotoTxt } = require("../../services/funcionesAccesoRemoto")
const validarCodInmueble = require("../../validations/validarCodInmueble")

const relacionUserInmueble = async (req, res)=>{
    try {
        const {idUser, codInmueble} = req.body
        
        //valida si el codigo de inmueble es correcto
        const validar = validarCodInmueble(codInmueble)
        if(!validar){
            return res.status(404).json({
                status: false,
                message: "Inmueble no encontrado para hacer la relacion con user",
            });
        }

        // valida si el idUser es correcto
        if (!idUser || isNaN(Number(idUser))) {
            return res.status(400).json({
                status: false,
                message: "ID de usuario inválido"
            });
        }

        // valida que user exista en bd
        const querySearchUser = `SELECT * FROM users WHERE id_user = $1`
        const user = await pool.query(querySearchUser, [idUser])
        if(user.rowCount !== 1){
            return res.status(404).json({
                    status: false,
                    message: `User no existe`
            })
        }

        //crea conexion ssh
        const conn = await connectSSH()
        // crea archivo remoto
        const archivoRemoto = await crearArchivoRemoto(codInmueble, conn)
        if (!archivoRemoto) {
            return res.status(500).json({
                status: false,
                message: "Error al crear el archivo remoto",
            });
        }

        // valida si existe el inmueble en el comunica
        const archivoTes = await leerArchivoRemotoTes(`res_ident_de_clientes${codInmueble}.tes`, conn)
        if (archivoTes === "0002") {
            return res.status(204).json({
                status: false,
                message: "Inmueble no existe",
            });
        }
        
        // busca el inmueble en la tabla inmueble
        const querySearchInmueble = `SELECT * FROM inmueble WHERE codigoInmueble = $1`
        const inmueble = await pool.query(querySearchInmueble, [codInmueble])
        let idInmueble;
        if(inmueble.rowCount === 0){
            // si no existe se agrega a bd
            const archivoTxt = await leerArchivoRemotoTxt(`res_ident_de_clientes${codInmueble}.txt`, conn)
            const nombre = archivoTxt.toString().slice(23, 50).trim(),
                calle = archivoTxt.toString().slice(73, 103).trim(),
                numero = archivoTxt.toString().slice(103, 108).trim(),
                piso = archivoTxt.toString().slice(108, 110).trim(),
                depto = archivoTxt.toString().slice(110, 113).trim(),
                manzana = archivoTxt.toString().slice(113, 116).trim(),
                block = archivoTxt.toString().slice(116, 119).trim(),
                lote = archivoTxt.toString().slice(119, 122).trim(),
                casa = archivoTxt.toString().slice(122, 125).trim(),
                barrio = archivoTxt.toString().slice(125, 155).trim(),
                localidad = archivoTxt.toString().slice(155, 185).trim()
            const queryAddInmueble = `
                INSERT INTO inmueble (codigoInmueble, nombre, calle, numero, piso, depto, manzana, block, lote, casa, barrio, localidad)
                VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`
            await pool.query(queryAddInmueble, [codInmueble, nombre, calle, numero, piso, depto, manzana, block, lote, casa, barrio, localidad])
            const resultInmueble = await pool.query(`
                    SELECT id_inmueble FROM inmueble WHERE codigoInmueble = $1`, [codInmueble])

            idInmueble = resultInmueble.rows[0].id_inmueble
        }else{
                 idInmueble = inmueble.rows[0].id_inmueble
        }
        
        // busca si ya existe relacion en tre user e inmueble 
        const searchRelacion = `select * from user_inmueble where id_user = $1 and id_inmueble = $2`
        const querySearchRelacion = await pool.query(searchRelacion, [idUser, idInmueble])
        if(querySearchRelacion.rowCount === 1){
            return res.status(200).json({
                status: true,
                message: `Relacion idUser: ${idUser} y codInmueble: ${codInmueble} ya existe`
            })
        }

        // agrega relacion entre user e inmueble
        const queryInsertRelacionUserInmueble = `
            INSERT INTO user_inmueble (id_user, id_inmueble)
            VALUES ($1, $2)`
        await pool.query(queryInsertRelacionUserInmueble, [idUser, idInmueble])

        return res.status(200).json({
            status: true,
            message: `Relacion idUser: ${idUser} y codInmueble: ${codInmueble} relacionado correctamente`
        })

    } catch (error) {
        return res.status(500).json({
            status:false,
            message: "Error al relacionar usuario con el inmueble",
            error: error
        })
    }
}
module.exports = relacionUserInmueble