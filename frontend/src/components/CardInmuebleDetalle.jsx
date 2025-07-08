import api from "@/axios/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const CardInmuebleDetalle = () => {
    const {codInmueble} = useParams()
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
                const {data} = await api(`/inmueble/${codInmueble}`)
                setInmueble(data.informacion)
            } catch (error) {
                console.log("error en get info inmueble")
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
        <>
            <div>
                        <h2>Información  de inmueble</h2>
                        <p><b>N.º de inmueble:</b> {codInmueble}</p>
                        <p><b>Nombre:</b> {nombre}</p>
                    </div>
                    <div>
                        <h2>Dirección: </h2>
                        <div>
                            <p><b>Calle:</b> {calle} {numero!=="00000" ? numero : ""}</p>
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
        </>
     );
}
 
export default CardInmuebleDetalle;