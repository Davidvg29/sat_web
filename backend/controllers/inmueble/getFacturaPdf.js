const { connectSSH, getFacturasVigentesSAT } = require("../../services/funcionesAccesoRemoto")
const path = require("path")

const getFacturaPdf = async(req, res)=>{
    try {
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
        res.sendFile(filePath);
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Error al obtener PDF de factura, intente mas tarde."
        })
    }
}
module.exports = getFacturaPdf