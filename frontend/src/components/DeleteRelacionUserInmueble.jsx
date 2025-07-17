import api from "@/axios/api";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { Trash } from 'lucide-react';

const DeleteRelacionUserInmueble = ({idUser, idInmueble, codInmueble, isDelete}) => {
    const deleteRelacion = async()=>{
        console.log(idUser, idInmueble, codInmueble);
        
        try {
          const {data} = await api.delete("/inmueble/desasociar",{data: {idUser: idUser, idInmueble: idInmueble}})
          if(data.status){
            console.log("inmueble eliminado");
            return true
          }  
        } catch (error) {
            console.log(error)
        }
    }

    return ( 
        <AlertDialog>
            <AlertDialogTrigger><Trash/></AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>¿Seguro deseas eliminar el inmueble de tu cuenta?</AlertDialogTitle>
                    {/* <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </AlertDialogDescription> */}
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>No</AlertDialogCancel>
                    <AlertDialogAction onClick={()=>{deleteRelacion(); isDelete();}}>Si, eliminar.</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
     );
}
 
export default DeleteRelacionUserInmueble;