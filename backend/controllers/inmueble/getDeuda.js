const { connectSSH, leerArchivoRemotoTes, leerArchivoRemotoTxt } = require("../../services/funcionesAccesoRemoto")
const { verifyToken } = require("../../middlewares/jwt");

const getDeuda = async(req, res)=>{
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                status: false,
                message: "Sesion no iniciada, inicie de nuevo.",
                error: "Token no encontrado."
            });
        }
        verifyToken(token)
        const {codInmueble} = req.params
        const conn = await connectSSH()
        const archivoTes = await leerArchivoRemotoTes(`res_estado_de_cuentas${codInmueble}.tes`, conn)
        if(!archivoTes){
            return res.status(500).json({
                status: false,
                message: "Ocurrio un error, intente otra vez."
            })
        }else if(archivoTes === "0001"){
            return res.status(404).json({
                status: true,
                message: "Inmueble sin deuda pendiente."
            })
        }
        const archivoTxt = await leerArchivoRemotoTxt(`res_estado_de_cuentas${codInmueble}.txt`, conn)
        let infoDeuda = []
        for (let i = 0; i < archivoTxt[i].length-1; i++) {
            const añoFIA = archivoTxt[i].substring(74, 78)
			const mesFIA = archivoTxt[i].substring(78, 80)
			const diaFIA = archivoTxt[i].substring(80, 82)
			const fechaInfoActualizada = `${diaFIA}/${mesFIA}/${añoFIA}`

            infoDeuda.push({
                año: archivoTxt[i].substring(0,4),
                periodos: archivoTxt[i].substring(4, 44).trim(),
                importe: Number(parseFloat(archivoTxt[i].substring(44, 54).trim()) / 100).toFixed(2),
                interesMora: Number(parseFloat(archivoTxt[i].substring(54, 64).trim()) / 100).toFixed(2),
                cargosPunitorios: Number(parseFloat(archivoTxt[i].substring(64, 74).trim()) / 100).toFixed(2),
                total: parseFloat(archivoTxt[i].substring(44, 54).trim()/100 + archivoTxt[i].substring(54, 64).trim()/100 + archivoTxt[i].substring(64, 74).trim()/100).toFixed(2),
                fechaBackup: fechaInfoActualizada
            })
        }
        return res.status(200).json({
            status:true,
            informacion: infoDeuda
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Ocurrio un error, intente luego."
        })
    }
}
module.exports = getDeuda