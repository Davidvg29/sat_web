import Header from "@/components/Header"
import { cn } from "@/lib/utils"

const Home = ()=>{
    return(
        <div className={cn("w-full flex")}>
            <Header/>
        </div>
    )
}
export default Home