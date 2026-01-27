import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './calendar.css'
import Calendar from './calendar.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Calendar />
  </StrictMode>,
)
