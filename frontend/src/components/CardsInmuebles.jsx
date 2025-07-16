import { useSelector } from "react-redux";
import {Link} from "react-router-dom"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils";
import { ButtonAddInmueble } from "./ButtonAddInmueble";

const CardsInmuebles = ({className, ...props}) => {
    const inmuebles = useSelector((state)=>state.user.inmuebles)
    console.log(inmuebles)
    return ( 
        <div className={cn("flex flex-col items-center justify-center flex-wrap", className)}{...props}>
            <div className="flex justify-between items-center w-3/4">
                <h2 className="m-5 text-3xl">Tus inmuebles asociados</h2>
                <ButtonAddInmueble/>
            </div>
            <div className="flex items-center justify-center flex-wrap">
                {inmuebles && inmuebles.map((i)=>(
                    <Link className="m-3 w-80" to={`/usuario/inmueble/${i.codInmueble}`} key={i.codInmueble}>
                        <Card>
                        <CardHeader>
                            <CardTitle>{`Nº de inmueble: ${i.codInmueble}`}</CardTitle>
                            {/* <CardDescription>Card Description</CardDescription> */}
                        </CardHeader>
                        <CardContent>
                            <p><b>Titular:</b> {i.titular}</p>
                            <p><b>Direccion: </b>{i.direccion}</p>
                        </CardContent>
                        {/* <CardFooter>
                            <p>Card Footer</p>
                        </CardFooter> */}
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
     );
}
 
export default CardsInmuebles;