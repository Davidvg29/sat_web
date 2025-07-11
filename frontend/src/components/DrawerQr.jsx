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
import qr from "../assets/qr.png"

const DrawerQr = () => {
    return ( 
        <Drawer>
  <DrawerTrigger>PAGAR CON QR</DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Pagar con codigo QR.</DrawerTitle>
      <DrawerDescription>Con tu billetera favorita escanea y paga!</DrawerDescription>
    </DrawerHeader>
    <div className="flex justify-center">
        <img src={qr} alt="" />
    </div>
    <DrawerFooter>
      <DrawerClose asChild>
        <Button variant="outline">Cancel</Button>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>
     );
}
 
export default DrawerQr;