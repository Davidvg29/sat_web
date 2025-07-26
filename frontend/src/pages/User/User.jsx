import api from "@/axios/api"
import CardsInmuebles from "@/components/CardsInmuebles"
import Header from "@/components/Header"
import { alertMessage, setUser } from "@/redux/action"
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
                const {data} = await api.get(`user/?username=${user.username}`,{withCredentials: true})
                if(data.status){
                    dispatch(setUser(data.data))
                }
                console.log(data)
            } catch (error) {
                console.log(error.response)
                console.log("error al obtener informacion de usuario, intente mas tarde.")
                if(error.response.status === 401){
                    // console.log(error.response.data.message)
                    dispatch(alertMessage(true, false, error.response.data.message))
                    
                }
                if(error.status === 404){
                    setMessage(error.response.data.message)
                }
                if(error.status === 500){
                    setMessage(error.response.data.message)
                }
            }
        }
        if (user.username) {
      getInfoUser()
    }
    },[user.username])

    return(
        <>
            <Header/>
            <CardsInmuebles/>
        </>
    )
}
export default User