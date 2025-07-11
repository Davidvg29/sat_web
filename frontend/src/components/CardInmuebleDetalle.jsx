import api from "@/axios/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Factura from "./Factura";
import { cn } from "@/lib/utils";
import { Loader } from "./Loader";
import PageNotFound from "@/pages/PageNotFound";


const CardInmuebleDetalle = ({className, ...props}) => {
    const {codInmueble} = useParams()
    const [loader, setLoader] = useState(false)
    const [error, setError] = useState(false)
    const [message, setMessage] = useState("")
    const [inmueble, setInmueble] = useState({
  nombre: "",
  direccion: {
    calle: "",
    numero: "",
    piso: "",
    depto: "",
    manzana: "",
    block: "",
    lote: "",
    casa: "",
    barrio: "",
    localidad: ""
  },
  facturas_vigentes: []
});

    useEffect(()=>{
        const getInfoInmueble = async()=>{
            try {
                setLoader(true)
                const {data} = await api(`/inmueble/${codInmueble}`)
                setInmueble(data.informacion)
                if(data.status === true){
                    setLoader(false)
                    setError(false)
                }
            } catch (error) {
                console.log("error en get info inmueble")
                console.log(error)
                if(error.status === 404){
                    setLoader(false)
                    setError(true)
                    setMessage(error.response.data.message)
                }
                if(error){
                    setLoader(false)
                    setError(true)
                    setMessage("Ocurrio un error inesperado, intente mas tarde.")
                }
            }
        }
        getInfoInmueble()
    }, [])

    const {
    nombre,
    direccion: { calle, numero, piso, depto, manzana, block, lote, casa, barrio, localidad },
    facturas_vigentes
} = inmueble;

    return ( 
        <div className={cn("", className)} {...props}>
            {error ? <p>{message}</p> : (
                <div>
                    <div>
                        <h2>Información  de inmueble</h2>
                        <p><b>N.º de inmueble:</b> {codInmueble}</p>
                        {nombre.length>0 ? (<p><b>Nombre:</b> {nombre}</p>): ""}
                    </div>
                    <div>
                        {calle ? (<h2>Dirección: </h2>) : ""}
                        <div>
                            {calle ? (<p><b>Calle:</b>{calle} {numero!=="00000" ? numero : ""}</p>): ""}
                             {/* <p><b>Calle:</b> {calle} {numero!=="00000" ? numero : ""}</p> */}
                            {piso ? (<p><b>Piso:</b> {piso} </p>) : ""}
                            {depto ? (<p><b>Departamento:</b> {depto} </p>) : ""}
                            {manzana ? (<p><b>Manzana:</b> {manzana} </p>) : ""}
                            {block ? (<p><b>Block:</b> {block} </p>) : ""}
                            {lote ? (<p><b>Lote:</b> {lote} </p>) : ""}
                            {casa ? (<p><b>Casa:</b> {casa} </p>) : ""}
                            {barrio ? (<p><b>Barrio:</b> {barrio} </p>) : ""}
                            {localidad ? (<p><b>Localidad:</b> {localidad} </p>) : ""}
                        </div>
                    </div>
                    {/* <p>{`Información actualizada al ${facturas_vigentes && facturas_vigentes[0].fechaBackup}. Demora hasta 72h hábiles en reflejar pagos por canales externos.`}</p> */}
                    <div className="flex flex-wrap justify-center">
                        {facturas_vigentes && facturas_vigentes.map((f)=>(
                                <Factura factura={f} key={f.numFactura}/>
                            ))}
                    </div>
                </div>
            )}
            {loader ? <Loader text={"Cargando facturas.."}/> : false}
        </div >
     );
}
 
export default CardInmuebleDetalle;