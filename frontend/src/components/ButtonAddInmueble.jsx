import api from "@/axios/api"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import validarCodInmueble from "../validations/validarCodInmueble"
import { Loader } from "./Loader"

export function ButtonAddInmueble() {
  
  const [open, setOpen] = useState(false);
  const [codInmueble, setCodInmueble] = useState("")
  const [inmueble, setInmueble] = useState({
    codInmueble : "",
    nombre : "",
    direccion: {
      calle: "",
      numero: "",
      piso: "",
      depto: "",
      manzana: "",
      block: "",
      lote: "",
      casa: "",
      barrio: "",
      localidad: ""
    }
  })
  const [message, setMessage] = useState("")
  const [btnVincular, setBtnVincular] = useState(true)
  const [btnBuscar, setBtnBuscar] = useState(false)
  const [loader, setLoader] = useState(false)

  const onChangeCodInmueble = (e)=>{
    setCodInmueble(e.target.value)
    clear()
  }

  const searchInfoInmueble = async ()=>{
    try {
      setLoader(true)
      const validation = validarCodInmueble(codInmueble)
      if(!validation){
        setLoader(false)
        return setMessage("Ingrege un codigo de cliente valido.")
      }
      const {data} = await api.get(`/inmueble/${codInmueble}`)
      if(data.status){
        setBtnVincular(false)
        setBtnBuscar(true)
        setInmueble({
          codInmueble : data.informacion.codInmueble,
          nombre : data.informacion.nombre,
          direccion: {
            calle: data.informacion.direccion.calle,
            numero: data.informacion.direccion.numero,
            piso: data.informacion.direccion.piso,
            depto: data.informacion.direccion.depto,
            manzana: data.informacion.direccion.manzana,
            block: data.informacion.direccion.block,
            lote: data.informacion.direccion.lote,
            casa: data.informacion.direccion.casa,
            barrio: data.informacion.direccion.barrio,
            localidad: data.informacion.direccion.localidad
          }
        })
        setLoader(false)
      }
      console.log(data)
    } catch (error) {
      console.log(error)
      if(error?.response?.status === 404){return setMessage(error.response.data.message)}
      setMessage("Ocurrio un error, intente luego.")
    }
  }

  const clear = ()=>{
    setMessage("")
    setBtnVincular(true)
    setBtnBuscar(false)
    setInmueble({
    codInmueble : "",
    nombre : "",
    direccion: {
      calle: "",
      numero: "",
      piso: "",
      depto: "",
      manzana: "",
      block: "",
      lote: "",
      casa: "",
      barrio: "",
      localidad: ""
    }
  })
  }

  const {
    nombre,
    direccion: { calle, numero, piso, depto, manzana, block, lote, casa, barrio, localidad },
  } = inmueble;

  console.log(inmueble)

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {setOpen(isOpen);if (!isOpen) clear();}}>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline" className="cursor-pointer">Vincular Inmueble</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{inmueble.codInmueble !== "" ? ("Vincular inmueble:") : "Ingrese codigo de cliente"}</DialogTitle>
            <DialogDescription>
              {inmueble.codInmueble !== "" ? (
                <div>
                  {codInmueble && <p><b>Nº inmueble: {codInmueble}</b></p>}
                  {nombre && <p><b>Titular: {nombre}</b></p>}
                  <div className="flex flex-wrap gap-x-2  items-center">
                    {calle && <p><b>Dirección:</b></p>}
                    {calle && <p>{calle} {numero !== "00000" ? numero : ""},</p>}
                    {piso && <p>Piso: {piso},</p>}
                    {depto && <p>Departamento: {depto},</p>}
                    {manzana && <p>Manzana: {manzana},</p>}
                    {block && <p>Block: {block},</p>}
                    {lote && <p>Lote: {lote},</p>}
                    {casa && <p>Casa: {casa},</p>}
                    {barrio && <p>Barrio: {barrio},</p>}
                    {localidad && <p>Localidad: {localidad}.</p>}
                  </div>
                </div>) : "El codigo de cliente de 8 digitos se encuentra en la parte superior derecha de la factura."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Input id="name-1" name="name" onChange={onChangeCodInmueble} maxLength={8} defaultValue="" placeholder="Ej: 16400000" />
              <p className="text-center text-red-500">{message}</p>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onClick={clear}>Cancelar</Button>
            </DialogClose>
            <Button type="submit" disabled={btnVincular}>Vincular</Button>
            <Button type="submit" onClick={searchInfoInmueble} disabled={btnBuscar}>Buscar</Button>
          </DialogFooter>
          {loader ? (<Loader text="Buscando inmueble..." />) : false}
        </DialogContent>
      </form>
    </Dialog>
  )
}
