import Header from "@/components/Header"
import { LoginForm } from "@/components/Login-form"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

const Login = ()=>{
    const user = useSelector((state) => state.user)

    if (user.username) {
        return <Navigate to="/usuario" replace />
    }

    return(
        <div className="flex flex-col items-center w-screen h-screen">
            <Header/>
            <LoginForm/>
        </div>
    )
}
export default Login