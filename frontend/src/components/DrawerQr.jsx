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
import { CircleX } from 'lucide-react';
import { QrCode } from 'lucide-react';

const DrawerQr = () => {
    return ( 
        <Drawer>
  <DrawerTrigger><Button className="w-65 mt-2 cursor-pointer">PAGAR CON QR <QrCode/></Button></DrawerTrigger>
  <DrawerContent>
    <DrawerClose className="flex justify-end mr-3">
      <Button variant="outline"><CircleX/></Button>
    </DrawerClose>
    <DrawerHeader>
      <DrawerTitle>Pagar con codigo QR.</DrawerTitle>
      <DrawerDescription>Con tu billetera favorita escanea y paga!</DrawerDescription>
    </DrawerHeader>
    <div className="flex justify-center">
        <img src={qr} alt="" />
    </div>
    <DrawerFooter>
      {/* <DrawerClose asChild>
        <Button variant="outline">Cancel</Button>
      </DrawerClose> */}
    </DrawerFooter>
  </DrawerContent>
</Drawer>
     );
}
 
export default DrawerQr;