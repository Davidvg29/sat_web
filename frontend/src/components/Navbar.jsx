import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { Menu } from 'lucide-react';
import { CircleUserRound } from 'lucide-react';
import { Link } from "react-router-dom";

const Navbar = (className, ...props) => {
    return ( 
        <div className="flex justify-center items-center mr-3">
                
                <div className={cn("hidden lg:flex cursor-pointer", className)} {...props}>
            <NavigationMenu >
                    <NavigationMenuList>
                        <NavigationMenuItem>
                        {/* <NavigationMenuTrigger>Inicio</NavigationMenuTrigger> */}
                            <NavigationMenuLink>Inicio</NavigationMenuLink>
                        {/* <NavigationMenuContent>
                        </NavigationMenuContent> */}
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>

                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                        {/* <NavigationMenuTrigger>Inicio</NavigationMenuTrigger> */}
                            <NavigationMenuLink>Noticias</NavigationMenuLink>
                        {/* <NavigationMenuContent>
                        </NavigationMenuContent> */}
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>

                <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                    <NavigationMenuTrigger>Obras</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <NavigationMenuLink className="w-50 cursor-pointer">Plan Director de Agua</NavigationMenuLink>
                        <NavigationMenuLink className="w-50 cursor-pointer">Plan Director de Cloacas</NavigationMenuLink>
                        <NavigationMenuLink className="w-50 cursor-pointer">Otras obras en ejecución</NavigationMenuLink>
                    </NavigationMenuContent>
                    </NavigationMenuItem>
                </NavigationMenuList>
                </NavigationMenu>

                <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                    <NavigationMenuTrigger>Otros</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <NavigationMenuLink className="w-50 cursor-pointer">Centros de atención</NavigationMenuLink>
                        <NavigationMenuLink className="w-50 cursor-pointer">Guía de trámites</NavigationMenuLink>
                        <NavigationMenuLink className="w-50 cursor-pointer">Pedidos de factibilidades</NavigationMenuLink>
                        <NavigationMenuLink className="w-50 cursor-pointer">Presentación de proyectos</NavigationMenuLink>
                        <NavigationMenuLink className="w-50 cursor-pointer">Regularizaciones de emprendimientos</NavigationMenuLink>
                    </NavigationMenuContent>
                    </NavigationMenuItem>
                </NavigationMenuList>
                </NavigationMenu>

                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                        {/* <NavigationMenuTrigger>Inicio</NavigationMenuTrigger> */}
                            <NavigationMenuLink>Nosotros</NavigationMenuLink>
                        {/* <NavigationMenuContent>
                        </NavigationMenuContent> */}
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
        </div>
                <Link to="/login"><CircleUserRound size={30} className="m-3"/></Link>
                <Sheet className="m-3">
                <SheetTrigger className=" block lg:hidden"><Menu size={30}/></SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                    <SheetTitle>Menu</SheetTitle>
                    <SheetDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </SheetDescription>
                    </SheetHeader>
                </SheetContent>
                </Sheet>
            </div>
        
     );
}
 
export default Navbar;