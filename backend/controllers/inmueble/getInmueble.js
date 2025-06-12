const { crearArchivoRemoto, leerArchivoRemotoTes, leerArchivoRemotoTxt } = require("../../services/funcionesAccesoRemoto");
const validarCodInmueble = require("../../validations/validarCodInmueble");

const getInmueble = async (req, res) => {
    try {
        const { codInmueble } = req.params;

        const validar = validarCodInmueble(codInmueble)
        if(!validar){
            return res.status(404).json({
                status: false,
                message: "Inmueble no encontrado",
            });
        }

        const archivoRemoto = await crearArchivoRemoto(codInmueble);
        if (!archivoRemoto) {
            return res.status(500).json({
                status: false,
                message: "Error al crear el archivo remoto",
            });
        }

        const archivoTest = await leerArchivoRemotoTes(`res_ident_de_clientes${codInmueble}.tes`);
        if (archivoTest === "0001") {
            return res.status(204).json({
                status: false,
                message: "Inmueble sin facturas pendientes",
            });
        }
        if (!archivoTest) {
            return res.status(404).json({
                status: false,
                message: "Inmueble no encontrado",
            });
        }

        const archivoTxt = await leerArchivoRemotoTxt(`res_ident_de_clientes${codInmueble}.txt`);
        return res.status(200).json({
            status: true,
            message: "Inmueble encontrado",
            informacion: archivoTxt,
        });

    } catch (error) {
        console.error("❌ Error en getInmueble:", error);
        return res.status(500).json({
            status: false,
            message: "Error interno del servidor al obtener inmueble",
        });
    }
};
module.exports = getInmueble;