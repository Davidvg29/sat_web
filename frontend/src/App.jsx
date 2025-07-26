import './App.css'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Home from "./pages/Home"
import Login from './pages/Login'
import PageNotFound from './pages/PageNotFound'
import User from './pages/User/User'
import Inmueble from './pages/User/Inmueble'
import PrivateRoute from './components/PrivateRoute'


function App() {

  return (
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>

        <Route path='/usuario' element={<PrivateRoute><User/></PrivateRoute>}/>
        <Route path='/usuario/inmueble/:codInmueble' element={<PrivateRoute><Inmueble/></PrivateRoute>}/>

        <Route path='*' element={<PageNotFound/>}/>
      </Routes>
  )
}

export default App
