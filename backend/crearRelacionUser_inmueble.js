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
                await pool.query(queryInsert, [clientes[i].idjuser, clientes[i].id]);
                console.log(`inmueble ${clientes[i].IdentificacionClienteCodigo} relacionado correctamente.`);
            }
        }

    } catch (error) {
        console.log("error al crear relacion de user_inmueble", error)
    }
}
module.exports = crearRelacionUser_inmueble