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
import { alertMessage } from "@/redux/action";

import { Trash } from 'lucide-react';
import { useState } from "react";
import { useDispatch } from "react-redux";

const DeleteRelacionUserInmueble = ({idUser, idInmueble, codInmueble, isDelete}) => {
    const dispatch = useDispatch()

    const deleteRelacion = async()=>{
        console.log("PETICION");
        
        console.log(idUser, idInmueble, codInmueble);
        
        try {
        const { data } = await api.delete("/inmueble/desasociar", {
            data: { idUser: idUser, idInmueble: idInmueble },
        });

        if (data.status) {
            console.log("inmueble eliminado");
            // dispatch(alertMessage(false, false, "")); // Reset
            setTimeout(() => {
                dispatch(alertMessage(true, true, "Inmueble eliminado correctamente."));
            }, 50);
            return;
        }
    } catch (error) {
        console.error(error);
        // dispatch(alertMessage(false, false, "")); // Reset
        setTimeout(() => {
            dispatch(alertMessage(true, false, "El inmueble no pudo ser Eliminado, por favor intente mas tarde."));
        }, 50);
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
                    <AlertDialogAction onClick={()=>{deleteRelacion(); isDelete()}}>Si, eliminar.</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
     );
}
 
export default DeleteRelacionUserInmueble;