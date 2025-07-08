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
        <div className={cn("flex justify-center", className)}{...props}>
            {inmuebles && inmuebles.map((i)=>(
                <Link to={`/usuario/inmueble/${i}`} key={i}>
                    <Card className={"m-3"}>
                    <CardHeader>
                        <CardTitle>{`Nº de inmueble: ${i}`}</CardTitle>
                        <CardDescription>Card Description</CardDescription>
                        {/* <CardAction>Ver detalles</CardAction> */}
                    </CardHeader>
                    <CardContent>
                        <p>Card Content</p>
                    </CardContent>
                    <CardFooter>
                        <p>Card Footer</p>
                    </CardFooter>
                    </Card>
                </Link>
            ))}
        </div>
     );
}
 
export default CardsInmuebles;