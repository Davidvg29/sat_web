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
import { FileText } from 'lucide-react';
import { Eye, FileDown } from 'lucide-react';

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
                <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center"><FileText className="mr-1"/>Nº {`${factura.prefijo}-${factura.numFactura}`}</CardTitle>
                {/* <CardDescription>Card Description</CardDescription> */}
                {/* <CardAction>Card Action</CardAction> */}
                    <div className="w-20 flex flex-col shadow-md justify-center items-center bg-sky-50 hover:bg-sky-100 cursor-pointer rounded-lg p-px" onClick={getFacturaPdf}>
                        <Eye/>
                        <p className="text-xs">ver</p>
                    </div>
                    {/* <div className="w-20 flex flex-col justify-center items-center hover:bg-sky-100 cursor-pointer rounded-lg p-px">
                        <FileDown/>
                        <p className="text-xs">descargar</p>
                    </div> */}
                </div>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center">
                <div className="flex justify-around">
                    <div className="shadow p-2 m-1 w-30 rounded-sm">
                        <p className="text-xs">Periodo</p>
                        <p className="text-lg">{factura.periodo}</p>
                    </div>
                    <div className="shadow p-2 m-1 bg-red-50 w-30 rounded-sm">
                        <p className="text-xs">Vencimiento</p>
                        <p className="text-lg">{factura.vencimiento}</p>
                    </div>
                </div>
                <div className="shadow w-50 p-2 m-1 rounded-sm">
                    <p className="text-xs">Total</p>
                    <p className="text-2xl text-center"><b >$ {factura.importe}</b></p>
                </div>
            </CardContent>
            {/* <Button>PAGAR CON QR</Button> */}
            <div className=" flex flex-col items-center">
                <DrawerQr factura={factura}/>
                <Button className="w-65 mt-2 cursor-pointer">CLICK DE PAGO</Button>
                <Button className="w-65 mt-2 cursor-pointer">MERCADO PAGO</Button>
                {/* <Button className="w-65 mt-2" onClick={getFacturaPdf}>VER PDF</Button> */}
            </div>
            {/* <CardFooter>
                <p>Card Footer</p>
            </CardFooter> */}
            <p className="text-center text-red-500">{message}</p>
            {loader ? <Loader text="Cargando PDF..."/> : false}
        </Card>
     );
}
 
export default Factura;