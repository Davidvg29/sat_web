const pool = require("./config/db");
const fs = require('fs');
const path = require('path');

const crearClienteMasivo = async ()=>{
    try {
        const filePath = path.join(__dirname, './migrations/sat_usuariosweb_clientes.json');
        const data = fs.readFileSync(filePath, 'utf8');
        clientes = JSON.parse(data);

        const queryInsert = `
            INSERT INTO inmueble (id_inmueble, codigoInmueble)
            VALUES ($1, $2)
        `;
        const querySelectId_cliente = `
            SELECT codigoInmueble FROM inmueble WHERE codigoInmueble = $1
        `;

        for (let i = 0; i < clientes.length; i++) {
            const resultSelectId_cliente = await pool.query(querySelectId_cliente, [clientes[i].IdentificacionClienteCodigo]);
        if(resultSelectId_cliente.rowCount){
          console.log(`inmueble ${clientes[i].IdentificacionClienteCodigo} ya existe, no se insertará.`); 
        }else{
            if(clientes[i].UsuClEstado != "DES"){
                await pool.query(queryInsert, [clientes[i].id, clientes[i].IdentificacionClienteCodigo]);
                console.log(`inmueble ${clientes[i].IdentificacionClienteCodigo} insertado correctamente.`);
            }
        }
        }
        console.log("Todos los inmuebles han sido insertados correctamente.");

    } catch (error) {
        console.error(`Error al insertar inmueble`, error);
    }
}
module.exports = crearClienteMasivo;