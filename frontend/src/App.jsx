import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from "./pages/Home"
import FormLogin from "./components/FormLogin.jsx"

function App() {

  return (
      <Routes>
        <Route path='/' element={<FormLogin/>}/>
      </Routes>
  )
}

export default App
