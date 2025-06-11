const pool = require("./config/db");
const fs = require('fs');
const path = require('path');

const crearRelacionUser_inmueble = async ()=>{
    try {
        const filePath = path.join(__dirname, './migrations/sat_usuariosweb_clientes.json');
        const data = fs.readFileSync(filePath, 'utf8');
        clientes = JSON.parse(data);

         const queryInsert = `
            INSERT INTO user_inmueble (id_user, id_inmueble)
            VALUES ($1, $2)
        `;

        for (let i = 0; i < clientes.length; i++) {
            if(clientes[i].UsuClEstado != "DES"){
                const inmueble = `
                    SELECT * FROM inmueble WHERE codigoInmueble = $1
                `
                const idInmueble = await pool.query(inmueble, [clientes[i].IdentificacionClienteCodigo])

                if(clientes[i].idjuser != 0 && clientes[i].IdentificacionClienteCodigo != 0){
                    const searchRelacion = `
                        select * from user_inmueble where id_user = ${clientes[i].idjuser} and id_inmueble = ${idInmueble.rows[0].id_inmueble}
                    `
                    const querySearchRelacion = await pool.query(searchRelacion)
                    console.log(querySearchRelacion.rowCount)
                    console.log(`${clientes[i].idjuser} - ${idInmueble.rows[0].id_inmueble}`)
                    if(querySearchRelacion.rowCount != 1){
                        await pool.query(queryInsert, [clientes[i].idjuser, idInmueble.rows[0].id_inmueble]);
                        console.log(`inmueble ${clientes[i].IdentificacionClienteCodigo} relacionado correctamente.`);
                    }else{
                        console.log(`relacion ${clientes[i].idjuser} - ${idInmueble.rows[0].id_inmueble} ya existe`)
                    }
                }
            }
        }

    } catch (error) {
        console.log("error al crear relacion de user_inmueble", error)
    }
}
module.exports = crearRelacionUser_inmueble