import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router';
import './index.css';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
// import App from './App.jsx'
import Arrival from './components/Arrival.jsx';
import Departure from './components/Departure.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/arrivals" element={<Arrival/>}/>
        <Route path="/departures" element={<Departure/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)

/**
 * Breakpoint	Screen width
  xs	0px+
  sm	600px+
  md	900px+
  lg	1200px+
  xl	1536px+
 */
