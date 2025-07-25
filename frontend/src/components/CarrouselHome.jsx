import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import img1 from "../assets/carrousel-principal/img1.webp"
import img2 from "../assets/carrousel-principal/img2.webp"
import img3 from "../assets/carrousel-principal/img3.webp"

const CarrouselHome = () => {

    const img =[img1, img2, img3]
    return ( 
        <Carousel className="">
            <CarouselContent>
                {img.map((i)=>(<CarouselItem><img src={i} alt="" /></CarouselItem>))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-10 top-1/2 -translate-y-1/2 z-50 p-2 rounded-full" />
            <CarouselNext className="absolute right-10 top-1/2 -translate-y-1/2 z-50 p-2 rounded-full" />
        </Carousel>
     );
}
 
export default CarrouselHome;