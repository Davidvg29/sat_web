const app = require('./app');
const crearClienteMasivo = require('./crearClienteMasivo');
const crearRelacionUser_cliente = require('./crearRelacionUser_cliente');
const crearUserMasivo = require('./crearUserMasivo');
const alterTable = require('./models/alterTable');

const initDB = require('./models/initDB');

initDB()
    .then(()=>{
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Conexion exitosa a la base de datos`);
            console.log(`Servidor escuchando en http://localhost:${PORT}`);
             //crearUserMasivo()
             //crearClienteMasivo()
             crearRelacionUser_cliente()
        });
    })
    .catch((error) => {
        console.error('Error al inicializar la base de datos:', error);
        process.exit(1); // Salir del proceso si hay un error
    });