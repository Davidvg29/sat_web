const pool = require('../config/db');

const inmueble = async ()=>{
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS inmueble (
                id_inmueble SERIAL PRIMARY KEY,
                codigoInmueble INTEGER UNIQUE NOT NULL,
                nombre varchar(100),
                calle varchar(100), 
                numero varchar(100), 
                piso varchar(100), 
                depto varchar(100), 
                manzana varchar(100), 
                block varchar(100), 
                lote varchar(100), 
                casa varchar(100), 
                barrio varchar(100), 
                localidad varchar(100)
            );
        `);
        console.log("Tabla 'inmueble' creada o ya existe.");
    } catch (error) {
        console.error('Error al crear tabla inmueble:', error);
        throw error;
    }
}
module.exports = inmueble;







