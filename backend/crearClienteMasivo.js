const pool = require("./config/db");
const fs = require('fs');
const path = require('path');

const crearClienteMasivo = async ()=>{
    try {
        const filePath = path.join(__dirname, './migrations/sat_usuariosweb_clientes.json');
        const data = fs.readFileSync(filePath, 'utf8');
        clientes = JSON.parse(data);

        const queryInsert = `
            INSERT INTO clientes (idUser, codigoCliente)
            VALUES ($1, $2)
        `;
        for (let i = 0; i < clientes.length; i++) {
            if(clientes[i].UsuClEstado != "DES"){
                await pool.query(queryInsert, [clientes[i].idjuser, clientes[i].IdentificacionClienteCodigo]);
                console.log(`Cliente ${clientes[i].IdentificacionClienteCodigo} insertado correctamente.`);
            }
        }
        console.log("Todos los clientes han sido insertados correctamente.");

    } catch (error) {
        console.error(`Error al insertar el cliente: ${clientes[i].IdentificacionClienteCodigo}`, error);
    }
}
module.exports = crearClienteMasivo;