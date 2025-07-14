import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils";
import DrawerQr from "./DrawerQr";
import api from "@/axios/api";
import { useState } from "react";
import { Loader } from "./Loader";

const Factura = ({factura, className, ...props}) => {

    const [message, setMessage] = useState("")
    const [loader, setLoader] = useState(false)

    console.log(factura)

    const getFacturaPdf = async ()=>{
        setLoader(true)
        try {
            const response = await api.get(`/factura/${factura.prefijo}${factura.numFactura}`, {
            responseType: 'blob', 
            });
            const blob = new Blob([response.data], { type: 'application/pdf' });
            const blobUrl = URL.createObjectURL(blob);
            setLoader(false)
            window.open(blobUrl, "_blank");
            // window.location.href = blobUrl;
        } catch (error) {
            setLoader(false)
            if(error.response?.status === 404){
                return setMessage(error.response.data.message)
            }
            setMessage("Ocurrio un error inesperado, intente mas tarde.")
        }
    }

    return ( 
        <Card className={cn("w-80 m-3", className)} {...props}>
            <CardHeader>
                <CardTitle>Nº Factura: {`${factura.prefijo}-${factura.numFactura}`}</CardTitle>
                {/* <CardDescription>Card Description</CardDescription> */}
                {/* <CardAction>Card Action</CardAction> */}
            </CardHeader>
            <CardContent>
                <p>Periodo: {factura.periodo}</p>
                <p>Vencimiento: {factura.vencimiento}</p>
                <b>$ {factura.importe}</b>
            </CardContent>
            {/* <Button>PAGAR CON QR</Button> */}
            <DrawerQr factura={factura}/>
            <Button>CLICK DE PAGO</Button>
            <Button>MERCADO PAGO</Button>
            <Button onClick={getFacturaPdf}>VER PDF</Button>
            {/* <CardFooter>
                <p>Card Footer</p>
            </CardFooter> */}
            <p className="text-center text-red-500">{message}</p>
            {loader ? <Loader text="Cargando PDF..."/> : false}
        </Card>
     );
}
 
export default Factura;