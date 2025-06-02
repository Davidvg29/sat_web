// esto alterna alguna tabla que modifiquemos, hay que importar el modelo que queremos alternar
const pool = require("../config/db");

async function alterTable(tableName, columnName) {
  try {
    await pool.query(`
      ALTER TABLE ${tableName}
      ADD COLUMN IF NOT EXISTS ${columnName} VARCHAR(50) DEFAULT 'user';
    `);
    console.log("Columna 'password' agregada (si no existía).");
  } catch (error) {
    console.error("Error al modificar la tabla:", error);
  }
}

module.exports = alterTable;
