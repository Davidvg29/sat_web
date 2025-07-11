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

const Factura = ({factura, className, ...props}) => {

    console.log(factura)
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
            <Button>VER PDF</Button>
            {/* <CardFooter>
                <p>Card Footer</p>
            </CardFooter> */}
        </Card>
     );
}
 
export default Factura;