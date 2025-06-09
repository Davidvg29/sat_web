const pool = require("../config/db");
const user = require("./user");
const alterTable = require("./alterTable");
const cliente = require("./cliente");
const user_cliente= require("./user_cliente")

const initDB = async ()=>{
    try {
        // await alterTable("users", "password"); // Descomentar si se necesita alterar alguna tabla existente y cambiar parametros
        await user();
        await cliente();
        await user_cliente();
        console.log('Tablas verificadas/creadas correctamente')
    } catch (error) {
        console.error('Error al crear tablas:', error);
        throw error;
    }
}
module.exports = initDB;