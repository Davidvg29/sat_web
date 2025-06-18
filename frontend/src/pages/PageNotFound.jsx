import { cn } from "@/lib/utils"

const PageNotFound = ()=>{
    return(
        <div className={cn("flex flex-col justify-center items-center w-screen h-screen")}>
            <p>404</p>
            <p>Página no encontrada.</p>
        </div>
    )
}
export default PageNotFound