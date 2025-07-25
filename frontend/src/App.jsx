import './App.css'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Home from "./pages/Home"
import Login from './pages/Login'
import PageNotFound from './pages/PageNotFound'
import User from './pages/User/User'
import Inmueble from './pages/User/Inmueble'
import { useEffect } from 'react'
import api from './axios/api'
import { useDispatch } from 'react-redux'
import { setUser } from './redux/action'

function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
  const verifyUser = async () => {
    try {
      const { data } = await api.get("/user/verify", { withCredentials: true });
      console.log(data);
      dispatch(setUser({username: data}))
    } catch (error) {
      console.log("no anda token");
      navigate("/login")
    }
  };
  verifyUser();
}, []);


  return (
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>

        <Route path='/usuario' element={<User/>}/>
        <Route path='/usuario/inmueble/:codInmueble' element={<Inmueble/>}/>

        <Route path='*' element={<PageNotFound/>}/>
      </Routes>
  )
}

export default App
