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

const CardsInmuebles = ({className, ...props}) => {
    const inmuebles = useSelector((state)=>state.user.inmuebles)
    console.log(inmuebles)
    return ( 
        <div className={cn("flex justify-center flex-wrap", className)}{...props}>
            {inmuebles && inmuebles.map((i)=>(
                <Link to={`/usuario/inmueble/${i.codInmueble}`} key={i.codInmueble}>
                    <Card className={"m-3"}>
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
     );
}
 
export default CardsInmuebles;