import api from "@/axios/api"
import CardsInmuebles from "@/components/CardsInmuebles"
import { setUser } from "@/redux/action"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

const User = ()=>{
    const user = useSelector(state=>state.user)
    console.log(user)
    const dispatch = useDispatch()
    const [message, setMessage] = useState("")

    useEffect(()=>{
        const getInfoUser = async()=>{
            try {
                const {data} = await api.get(`user/?username=${user.username}`)
                if(data.status){
                    dispatch(setUser(data.data))
                }
                console.log(data)
            } catch (error) {
                console.log("error al obtener informacion de usuario, intente mas tarde.")
                if(error.status === 404){
                    setMessage(error.response.data.message)
                }
                if(error.status === 500){
                    setMessage(error.response.data.message)
                }
            }
        }
        getInfoUser()
    },[])

    return(
        <>
            <CardsInmuebles/>
        </>
    )
}
export default User