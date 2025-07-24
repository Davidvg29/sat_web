import api from "@/axios/api";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Factura from "./Factura";
import { cn } from "@/lib/utils";
import { Loader } from "./Loader";
import PageNotFound from "@/pages/PageNotFound";
import { Button } from "./ui/button";
import { ArrowBigDown  } from 'lucide-react';
import DrawerDeuda from "./DrawerDeuda";
import DrawerPlanContado from "./DrawerPlanContado";
import { ArrowLeft } from 'lucide-react';

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
                console.log(data)
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
        <div className={cn("flex flex-col justify-center m-5", className)} {...props}>
            <div className=" flex mb-3"> 
                <Link to="/usuario" className="flex"><ArrowLeft/>volver</Link>
            </div>
            {error ? <p>{message}</p> : (
                <div className="flex flex-col justify-center items-center">
                    <div className="flex flex-col justify-center items-center">
                        <h2 className="text-3xl text-center">Información  de inmueble Nº <b>{codInmueble}</b></h2>
                        <p className="mb-3 text-center">{`Información actualizada al ${facturas_vigentes.length>0 && facturas_vigentes[0].fechaBackup}. Demora hasta 72h hábiles en reflejar pagos por canales externos.`}</p>
                            {nombre.length>0 ? (<p><b>Titular:</b> {nombre}</p>): ""}
                    </div>
                        <div className="flex flex-wrap gap-x-2 justify-center items-center">
                        {calle && <p><b>Dirección:</b></p>}
                            {calle && <p>{calle} {numero !== "00000" ? numero : ""},</p>}
                            {piso && <p>Piso: {piso},</p>}
                            {depto && <p>Departamento: {depto},</p>}
                            {manzana && <p>Manzana: {manzana},</p>}
                            {block && <p>Block: {block},</p>}
                            {lote && <p>Lote: {lote},</p>}
                            {casa && <p>Casa: {casa},</p>}
                            {barrio && <p>Barrio: {barrio},</p>}
                            {localidad && <p>Localidad: {localidad}.</p>}
                        </div>
                    <div className="w-full flex justify-around items-center mt-5">
                        <p className="text-3xl" >Facturas a vencer:</p>
                        <div className="flex flex-col justify-end items-end">
                            <DrawerDeuda codInmueble={codInmueble}/>
                            <DrawerPlanContado/>
                        </div>
                    </div>
                    <div className="flex flex-wrap justify-center mt-5">
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