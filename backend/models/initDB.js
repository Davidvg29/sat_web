const pool = require("../config/db");
const User = require("./user");
const alterTable = require("./alterTable");
const Cliente = require("./cliente");

const initDB = async ()=>{
    try {
        // await alterTable("users", "password"); // Descomentar si se necesita alterar alguna tabla existente y cambiar parametros
        await User();
        await Cliente();
        console.log('Tablas verificadas/creadas correctamente')
    } catch (error) {
        console.error('Error al crear tablas:', error);
        throw error;
    }
}
module.exports = initDB;