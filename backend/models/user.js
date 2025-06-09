const pool = require('../config/db');

const user = async()=>{
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id_user SERIAL PRIMARY KEY,
                name VARCHAR(50) NOT NULL,
                username VARCHAR(50) UNIQUE NOT NULL,
                password VARCHAR(100) NOT NULL,
                email VARCHAR(50) UNIQUE NOT NULL,
                created_at TIMESTAMP DEFAULT NOW()
            );
        `);
        console.log("Tabla 'user' creada o ya existe.");
    } catch (error) {
        console.error('Error al crear tabla User:', error);
        throw error;
    }
}
module.exports = user;