import Header from "@/components/Header"
import { LoginForm } from "@/components/Login-form"

const Login = ()=>{
    return(
        <div className="flex flex-col items-center w-screen h-screen">
            <Header/>
            <LoginForm/>
        </div>
    )
}
export default Login