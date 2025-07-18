import { cn } from "@/lib/utils"
import logoSat from "../assets/logo-sat.png"

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

const Header = (className, ...props)=>{
    return(
        <header className={cn("flex justify-between items-center w-full bg-white p-2 shadow-md", className)} {...props}>
            <div className="flex ml-3">
                <Link to="/"><img src={logoSat} alt="SAT - Sociedad aguas del Tucumán" /></Link>
                <Link to="/"><h2 className="text-sm md:text-xl lg:text-3xl font-bold m-3" style={{color:"var(--azul-sat"}}>Sociedad aguas del Tucumán</h2></Link>
            </div>
            <div className="flex justify-center items-center mr-3">
                <Link to="/login"><CircleUserRound size={30} className="m-3"/></Link>
                <Sheet className="m-3">
                <SheetTrigger><Menu size={30}/></SheetTrigger>
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
        </header>
    )
}
export default Header