const app = require('./app');
const crearUserMasivo = require('./crearUserMasivo');

const initDB = require('./models/initDB');

initDB()
    .then(()=>{
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Conexion exitosa a la base de datos`);
            console.log(`Servidor escuchando en http://localhost:${PORT}`);
            crearUserMasivo()
        });
    })
    .catch((error) => {
        console.error('Error al inicializar la base de datos:', error);
        process.exit(1); // Salir del proceso si hay un error
    });