import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from "./pages/Home"
import Login from './pages/Login'
import Inmuebles from './pages/Inmuebles'
import PageNotFound from './pages/PageNotFound'

function App() {

  return (
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/inmuebles" element={<Inmuebles/>}/>
        <Route path='*' element={<PageNotFound/>}/>
      </Routes>
  )
}

export default App
