
const { verifyToken } = require("../../middlewares/jwt");
const { connectSSH, getFacturasVigentesSAT } = require("../../services/funcionesAccesoRemoto")
const path = require("path")
const fs = require("fs").promises

const getFacturaPdf = async(req, res)=>{
    try {
        // const token = req.cookies.token;
        // console.log(token)
        // if (!token) {
        //     return res.status(404).json({
        //         status: false,
        //         message: "Sesion no iniciada, inicie de nuevo.",
        //         error: "Token no encontrado."
        //     });
        // }
        // verifyToken(token) 
        const {numFactura} = req.params
        const nombreArchivo = `res_facturas_vigentes${numFactura}.pdf`
        const conn = await connectSSH()
        const getPdf = await getFacturasVigentesSAT(nombreArchivo, conn)
        console.log(getPdf)
        if(!getPdf){
            return res.status(404).json({
                status: false,
                message: "Sin facturas vigentes o no se pudo obtener factura en formato PDF, intente mas tarde. "
            })
        }
        const filePath = path.join(__dirname, "../../cache", nombreArchivo);
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "inline; filename=" + nombreArchivo);
        res.sendFile(filePath, (err)=>{
           if (err) {
                console.error("Error al enviar el archivo:", err);
                return res.status(404).json({
                    status: false,
                    message: "Error al enviar PDF."
                })
            }

            fs.unlink(filePath)
                .then(() => console.log("PDF eliminado correctamente."))
                .catch((err) => console.error("Error al eliminar el PDF:", err));
        });
        // fs.unlink(filePath)
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Error al obtener PDF de factura, intente mas tarde."
        })
    }
}
module.exports = getFacturaPdf