const pool = require('../config/db');

const user = async()=>{
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id_user SERIAL PRIMARY KEY,
                name TEXT NOT NULL,
                username TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
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