import { useSelector } from "react-redux";

const CardsInmuebles = () => {
    const inmuebles = useSelector((state)=>state.user.inmuebles)
    console.log(inmuebles)
    return ( 
        <>
            cards inmuebles
        </>
     );
}
 
export default CardsInmuebles;