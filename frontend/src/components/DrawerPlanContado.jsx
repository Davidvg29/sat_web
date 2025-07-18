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

const DrawerPlanContado = () => {
    return ( 
        <Drawer>
            <DrawerTrigger asChild><Button className="w-35 m-1">Plan financiacion</Button></DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader>
                    <DrawerTitle>Plan de contado.</DrawerTitle>
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
 
export default DrawerPlanContado;