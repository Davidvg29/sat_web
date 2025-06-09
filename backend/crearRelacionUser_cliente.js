const pool = require("./config/db");
const fs = require('fs');
const path = require('path');

const crearRelacionUser_cliente = async ()=>{
    try {
        const filePath = path.join(__dirname, './migrations/sat_usuariosweb_clientes.json');
        const data = fs.readFileSync(filePath, 'utf8');
        clientes = JSON.parse(data);

         const queryInsert = `
            INSERT INTO user_cliente (id_user, id_cliente)
            VALUES ($1, $2)
        `;

        for (let i = 0; i < clientes.length; i++) {
                await pool.query(queryInsert, [clientes[i].idjuser, clientes[i].IdentificacionClienteCodigo]);
                console.log(`Cliente ${clientes[i].IdentificacionClienteCodigo} insertado correctamente.`);
        }

    } catch (error) {
        console.log("error al crear relacion de user_cliente", error)
    }
}
module.exports = crearRelacionUser_cliente