const pool = require("../config/db");
const user = require("./user");
const alterTable = require("./alterTable");
const inmueble = require("./inmueble");
const user_inmueble= require("./user_inmueble")

const initDB = async ()=>{
    try {
        // await alterTable("users", "password"); // Descomentar si se necesita alterar alguna tabla existente y cambiar parametros
        await user();
        await inmueble();
        await user_inmueble();
        console.log('Tablas verificadas/creadas correctamente')
    } catch (error) {
        console.error('Error al crear tablas:', error);
        throw error;
    }
}
module.exports = initDB;