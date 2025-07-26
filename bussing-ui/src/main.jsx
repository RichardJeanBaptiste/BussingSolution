import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router';
import './index.css';
import Login from './components/Login';
// import App from './App.jsx'
// import Arrival from './components/Arrival.jsx';
// import Departure from './components/Departure.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
