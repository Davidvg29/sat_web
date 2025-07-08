import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from "./pages/Home"
import Login from './pages/Login'
import PageNotFound from './pages/PageNotFound'
import User from './pages/User/User'
import Inmueble from './pages/User/Inmueble'

function App() {

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
