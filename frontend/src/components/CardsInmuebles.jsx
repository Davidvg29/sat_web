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
import DeleteRelacionUserInmueble from "./DeleteRelacionUserInmueble";
import { Alert } from "./ui/alert";
import AlertMessage from "./AlertMessage";
import { useState } from "react";

const CardsInmuebles = ({className, ...props}) => {
    const inmuebles = useSelector((state)=>state.user.inmuebles)
    const idUser = useSelector((state)=>state.user.id)
    const [isDeleteRelacionUserInmueble, setIsDeleteRelacionUserInmueble] = useState(false)
    console.log(inmuebles)

    const isDelete = ()=>{
        setIsDeleteRelacionUserInmueble(true)
    }

    return ( 
        <div className={cn("flex flex-col items-center justify-center flex-wrap", className)}{...props}>
            <div className="flex justify-between items-center w-3/4">
                <h2 className="m-5 text-3xl">Tus inmuebles vinculados</h2>
                <ButtonAddInmueble/>
            </div>
            <div className="flex items-center justify-center flex-wrap">
                {inmuebles && inmuebles.map((i)=>(
                    <Link className="m-3 w-80" to={`/usuario/inmueble/${i.codInmueble}`} key={i.codInmueble}>
                        <Card>
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <CardTitle>{`Nº de inmueble: ${i.codInmueble}`}</CardTitle>
                                <button className="hover:bg-red-300 p-1 rounded-xs cursor-pointer" onClick={(e) => {e.preventDefault();e.stopPropagation();}}>
                                   <DeleteRelacionUserInmueble idUser={idUser} idInmueble={i.id_inmueble} codInmueble={i.codInmueble} isDelete={isDelete}/> 
                                </button>
                            </div>
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
            {isDeleteRelacionUserInmueble ? (<AlertMessage/>) : false}
        </div>
     );
}
 
export default CardsInmuebles;