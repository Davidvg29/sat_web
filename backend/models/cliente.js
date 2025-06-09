const pool = require('../config/db');

const cliente = async ()=>{
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS cliente (
                id_cliente SERIAL PRIMARY KEY,
                codigoCliente INTEGER UNIQUE NOT NULL
            );
        `);
        console.log("Tabla 'cliente' creada o ya existe.");
    } catch (error) {
        console.error('Error al crear tabla cliente:', error);
        throw error;
    }
}
module.exports = cliente;