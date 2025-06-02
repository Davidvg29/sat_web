const pool = require("./config/db");
const fs = require('fs');
const path = require('path');

const crearUnUsuario = async () => {
  try {
    const filePath = path.join(__dirname, './migrations/sat_users.json');
    const data = fs.readFileSync(filePath, 'utf8');
    const users = JSON.parse(data);

    const user = users[0]; // Solo el primero

    const query = `
      INSERT INTO users (name, username, password, email)
      VALUES ($1, $2, $3, $4)
    `;
    const values = [user.name, user.username, user.password, user.email];

    const result = await pool.query(query, values);
    console.log('Usuario insertado correctamente:', user.name);
  } catch (error) {
    console.error('Error al insertar el usuario:', error);
  }
};
module.exports = crearUnUsuario;