import CarrouselHome from "@/components/CarrouselHome"
import Header from "@/components/Header"
import { cn } from "@/lib/utils"

const Home = ()=>{
    return(
        <div className={cn("w-full flex flex-col")}>
            <Header/>
            <CarrouselHome/>
        </div>
    )
}
export default Home