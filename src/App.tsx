import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Home from './Home'
import Portfolio from './Portfolio'
import Resume from './Resume'
import Contact from './Contact'
import About from './About'

function App() {
  const [windowPosition, setWindowPosition] = useState({ x: 0, y: 0 });

  return (
    <div className="outside-window">
      <Routes>
        <Route path="/" element={<Home position={windowPosition} setPosition={setWindowPosition} />} />
        <Route path="/portfolio" element={<Portfolio position={windowPosition} setPosition={setWindowPosition} />} />
        <Route path="/resume" element={<Resume position={windowPosition} setPosition={setWindowPosition} />} />
        <Route path="/about" element={<About position={windowPosition} setPosition={setWindowPosition} />} />
        <Route path="/contact" element={<Contact position={windowPosition} setPosition={setWindowPosition} />} />
      </Routes>
    </div>
  )
}

export default App