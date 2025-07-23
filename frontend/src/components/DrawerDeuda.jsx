import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import api from "@/axios/api";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { CircleX } from 'lucide-react';

const DrawerDeuda = ({codInmueble}) => {

    const [deudas, setDeudas] = useState([])

    useEffect(()=>{
        const data = async()=>{
            try {
                const {data} = await api.get(`/inmueble/deuda/${codInmueble}`)
                console.log(data)
                setDeudas(data.informacion)
            } catch (error) {
                console.log("ERRRORR")
            }
        }
        data()
    },[])

    return ( 
        <Drawer>
            <DrawerTrigger asChild><Button className="w-35 m-1">Ver deuda</Button></DrawerTrigger>
                <DrawerContent>
                        <DrawerClose className="flex justify-end mr-3">
                            <Button variant="outline"><CircleX/></Button>
                        </DrawerClose>
                        <DrawerHeader className="p-0">
                            <DrawerTitle>Detalle de deuda</DrawerTitle>
                        </DrawerHeader>
                    <TableCaption className="m-3">Informacion actualizada al {deudas.length>0 && deudas[0].fechaBackup}. Demora hasta 72h hábiles en reflejar pagos por canales externos. No incluye planes de deuda, facturas en gestión judicial ni en gestión extra judicial</TableCaption>
                    <DrawerDescription >
                        <div className="overflow-x-auto max-h-[50vh] flex justify-center">
                            <table className="w-300 text-sm ">
                                <thead className="bg-gray-100 sticky top-0 z-10">
                                <tr>
                                    <th className="text-center px-2 py-2 whitespace-nowrap">Año</th>
                                    <th className="text-center px-2 py-2 whitespace-nowrap">Periodos</th>
                                    <th className="text-center px-2 py-2 whitespace-nowrap hidden sm:table-cell">Importe</th>
                                    <th className="text-center px-2 py-2 whitespace-nowrap hidden md:table-cell">Interés por mora</th>
                                    <th className="text-center px-2 py-2 whitespace-nowrap hidden md:table-cell">Cargos punitorios</th>
                                    <th className="text-center px-2 py-2 whitespace-nowrap">Total</th>
                                </tr>
                                </thead>
                                <tbody>
                                {deudas && deudas.map((deuda, index) => (
                                    <tr key={index} className="border-t">
                                    <td className="text-center px-2 py-2">{deuda.año}</td>
                                    <td className="text-center px-2 py-2">{deuda.periodos}</td>
                                    <td className="text-center px-2 py-2 hidden sm:table-cell">{deuda.importe}</td>
                                    <td className="text-center px-2 py-2 hidden md:table-cell">{deuda.interesMora}</td>
                                    <td className="text-center px-2 py-2 hidden md:table-cell">{deuda.cargosPunitorios}</td>
                                    <td className="text-center px-2 py-2">${deuda.total}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </DrawerDescription>
                    <DrawerFooter>
                    {/* <DrawerClose>
                        <Button variant="outline">Cancelar</Button>
                    </DrawerClose> */}
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
     );
}
 
export default DrawerDeuda;