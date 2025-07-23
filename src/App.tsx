import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Home from './Home'
import Portfolio from './Portfolio'
import Resume from './Resume'
import Contact from './Contact'
// import Resume from './pages/Resume'
// import Contact from './pages/Contact'
// import NotFound from './pages/NotFound'

function App() {
  const [windowPosition, setWindowPosition] = useState({ x: 0, y: 0 });
  
  return (
    <div className="outside-window">
      <Routes>
        <Route path="/" element={<Home position={windowPosition} setPosition={setWindowPosition} />} />
        <Route path="/portfolio" element={<Portfolio position={windowPosition} setPosition={setWindowPosition} />} />
        <Route path="/resume" element={<Resume position={windowPosition} setPosition={setWindowPosition} />} />
        <Route path="/contact" element={<Contact position={windowPosition} setPosition={setWindowPosition} />} />
        {/*<Route path="/resume" element={<Resume />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </div>
  )
}

export default App