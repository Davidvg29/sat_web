const pool = require("./config/db");
const fs = require('fs');
const path = require('path');

const crearUnUsuario = async () => {
  let users;
  let i ;
  try {
    const filePath = path.join(__dirname, './migrations/sat_users.json');
    const data = fs.readFileSync(filePath, 'utf8');
    users = JSON.parse(data);

    const queryInsert = `
      INSERT INTO users (id_user, name, username, password, email)
      VALUES ($1, $2, $3, $4, $5)
    `;
    const querySelectName = `
    SELECT name FROM users WHERE email = $1`
   
    for(i=0; i < users.length; i++) {
      // if(users[i].name.length > 50 || users[i].username.length > 50 || users[i].email.length > 50) {
      //     try {
      //       fs.appendFileSync('usuarioMalos.txt', `${users[i].id}\n${users[i].name}\n${users[i].username}\n`);
      //       console.log(`El usuario ${users[i].email} es un usuario malo y se agrego en usuarioMalos.txt`);
      //     } catch (err) {
      //       console.error('Error al agregar línea en txt:', err);
      //     }
      // }else{
        const resultSelectName = await pool.query(querySelectName, [users[i].email]);
        if(resultSelectName.rowCount){
          console.log(`El usuario ${users[i].email} ya existe, no se insertará.`); 
        }else{
          const values = [users[i].id, users[i].name, users[i].username, users[i].password, users[i].email];
          const result = await pool.query(queryInsert, values);
          if(result.rowCount > 0) {
            console.log(`Usuario ${users[i].username} insertado correctamente.`);
          }else{
            console.log("No se pudo insertar el usuario:", users[i].username);
          }
        }
      // }
    }
  } catch (error) {
    console.error(`Error al insertar el usuario: ${users[i].email}`, error);
  }
};
module.exports = crearUnUsuario;