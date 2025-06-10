const pool = require("../config/db")
const user_inmueble = async()=>{
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS user_inmueble (
                id_user INTEGER NOT NULL,
                id_inmueble INTEGER NOT NULL,
                PRIMARY KEY (id_user, id_inmueble),
                FOREIGN KEY (id_user) REFERENCES users(id_user) ON DELETE CASCADE,
                FOREIGN KEY (id_inmueble) REFERENCES inmueble(id_inmueble) ON DELETE CASCADE
            );
        `)
        console.log("Tabla 'user_inmueble' creada o ya existe.");
    } catch (error) {
        console.log("Error al crear tabla 'user_inmueble':", error)
        throw error;
    }
}
module.exports = user_inmueble