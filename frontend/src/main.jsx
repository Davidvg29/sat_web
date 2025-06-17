import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRoter} from "react-router-dom"
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRoter>
    <StrictMode>
      <App />
    </StrictMode>
  </BrowserRoter>
)
