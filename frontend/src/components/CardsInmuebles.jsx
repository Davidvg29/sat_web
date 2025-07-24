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
import { useEffect, useState } from "react";
import { MapPinHouse } from 'lucide-react';
import { MailPlus } from 'lucide-react';
import { User } from 'lucide-react';

const CardsInmuebles = ({className, ...props}) => {
    const {id, username, inmuebles} = useSelector((state)=>state.user)
    const [isDeleteRelacionUserInmueble, setIsDeleteRelacionUserInmueble] = useState(false)
    console.log(username)

    const isDelete = ()=>{
        setIsDeleteRelacionUserInmueble(true)
    }

    return ( 
        <div className={cn("flex flex-col items-center justify-center flex-wrap", className)}{...props}>
            <div className="flex justify-between items-center w-full sm:w-3/4">
                <h2 className="m-5 text-3xl">Tus inmuebles vinculados</h2>
                <ButtonAddInmueble/>
            </div>
            <div className="flex items-center justify-center flex-wrap">
                {inmuebles && inmuebles.map((i)=>(
                    <Link className="m-3 " to={`/usuario/inmueble/${i.codInmueble}`} key={i.codInmueble}>
                        <Card className="w-80 h-70 overflow-auto">
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <CardTitle className="flex items-center"><MapPinHouse className="mr-2"/>{`Nº: ${i.codInmueble}`}</CardTitle>
                                <div className="flex justify-center items-center">
                                    <MailPlus/>
                                    <div className="ml-5" onClick={(e) => {e.preventDefault();e.stopPropagation();}}>
                                    <DeleteRelacionUserInmueble idUser={id} username={username} idInmueble={i.id_inmueble} codInmueble={i.codInmueble} isDelete={isDelete}/> 
                                    </div>
                                </div>
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
                {/* <AlertMessage/> */}
        </div>
     );
}
 
export default CardsInmuebles;