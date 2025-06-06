const pool = require('../config/db');

const Cliente = async ()=>{
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS clientes (
                idCliente SERIAL PRIMARY KEY,
                idUser INTEGER NOT NULL,
                codigoCliente INTEGER NOT NULL);
        `);
        console.log("Tabla 'Cliente' creada o ya existe.");
    } catch (error) {
        console.error('Error al crear tabla cliente:', error);
        throw error;
    }
}
module.exports = Cliente;