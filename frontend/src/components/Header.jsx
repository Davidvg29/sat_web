import { cn } from "@/lib/utils"
import logoSat from "../assets/logo-sat.png"
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const Header = (className, ...props)=>{
    return(
        <header className={cn("flex justify-between items-center w-full bg-white p-2 shadow-md", className)} {...props}>
            <div className="flex justify-center items-center ml-3">
                <Link to="/"><img src={logoSat} alt="SAT - Sociedad aguas del Tucumán" /></Link>
                <Link to="/"><h2 className="text-sm md:text-xl lg:text-3xl font-bold m-3" style={{color:"var(--azul-sat"}}>Sociedad aguas del Tucumán</h2></Link>
            </div>
            <Navbar/>
            
        </header>
    )
}
export default Header