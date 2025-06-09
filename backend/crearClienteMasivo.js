const pool = require("./config/db");
const fs = require('fs');
const path = require('path');

const crearClienteMasivo = async ()=>{
    try {
        const filePath = path.join(__dirname, './migrations/sat_usuariosweb_clientes.json');
        const data = fs.readFileSync(filePath, 'utf8');
        clientes = JSON.parse(data);

        const queryInsert = `
            INSERT INTO cliente (codigoCliente)
            VALUES ($1)
        `;
        const querySelectId_cliente = `
            SELECT codigoCliente FROM cliente WHERE codigoCliente = $1
        `;

        for (let i = 0; i < clientes.length; i++) {
            const resultSelectId_cliente = await pool.query(querySelectId_cliente, [clientes[i].IdentificacionClienteCodigo]);
        if(resultSelectId_cliente.rowCount){
          console.log(`El cliente ${clientes[i].IdentificacionClienteCodigo} ya existe, no se insertará.`); 
        }else{
            if(clientes[i].UsuClEstado != "DES"){
                await pool.query(queryInsert, [clientes[i].IdentificacionClienteCodigo]);
                console.log(`Cliente ${clientes[i].IdentificacionClienteCodigo} insertado correctamente.`);
            }
        }
        }
        console.log("Todos los clientes han sido insertados correctamente.");

    } catch (error) {
        console.error(`Error al insertar cliente`, error);
    }
}
module.exports = crearClienteMasivo;