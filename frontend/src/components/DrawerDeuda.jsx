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

const DrawerDeuda = () => {
    return ( 
        <Drawer>
            <DrawerTrigger><Button className="w-35 m-1">Ver deuda</Button></DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader>
                    <DrawerTitle>Detalle de deuda</DrawerTitle>
                    <DrawerDescription>This action cannot be undone.</DrawerDescription>
                    </DrawerHeader>
                    <DrawerFooter>
                    <DrawerClose>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
     );
}
 
export default DrawerDeuda;