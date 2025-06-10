const pool = require('../config/db');

const inmueble = async ()=>{
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS inmueble (
                id_inmueble SERIAL PRIMARY KEY,
                codigoInmueble INTEGER UNIQUE NOT NULL
            );
        `);
        console.log("Tabla 'inmueble' creada o ya existe.");
    } catch (error) {
        console.error('Error al crear tabla inmueble:', error);
        throw error;
    }
}
module.exports = inmueble;