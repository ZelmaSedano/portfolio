import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Home from './Home'
import Portfolio from './Portfolio'
import Resume from './Resume'
import Contact from './Contact'
import Sublink1 from './Sublink1'
import Sublink2 from './Sublink2'
import Sublink3 from './Sublink3'
import Sublink4 from './Sublink4'

function App() {
  const [windowPosition, setWindowPosition] = useState({ x: 0, y: 0 });

  return (
    <div className="outside-window">
      <Routes>
        <Route path="/" element={<Home position={windowPosition} setPosition={setWindowPosition} />} />
        <Route path="/portfolio" element={<Portfolio position={windowPosition} setPosition={setWindowPosition} />} />

        {/* portfolio sublinks*/}
        <Route path="/sublink1" element={<Sublink1 position={windowPosition} setPosition={setWindowPosition} />} />
        <Route path="/sublink2" element={<Sublink2 position={windowPosition} setPosition={setWindowPosition} />} />
        <Route path="/sublink3" element={<Sublink3 position={windowPosition} setPosition={setWindowPosition} />} />
        <Route path="/sublink4" element={<Sublink4 position={windowPosition} setPosition={setWindowPosition} />} />


        <Route path="/resume" element={<Resume position={windowPosition} setPosition={setWindowPosition} />} />
        <Route path="/contact" element={<Contact position={windowPosition} setPosition={setWindowPosition} />} />
      </Routes>
    </div>
  )
}

export default App