const pool = require("../config/db")
const user_cliente = async()=>{
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS user_cliente (
                id_user INTEGER NOT NULL,
                id_cliente INTEGER NOT NULL,
                PRIMARY KEY (id_user, id_cliente),
                FOREIGN KEY (id_user) REFERENCES users(id_user) ON DELETE CASCADE,
                FOREIGN KEY (id_cliente) REFERENCES cliente(id_cliente) ON DELETE CASCADE
            );
        `)
        console.log("Tabla 'user_cliente' creada o ya existe.");
    } catch (error) {
        console.log("Error al crear tabla 'user_cliente':", error)
        throw error;
    }
}
module.exports = user_cliente