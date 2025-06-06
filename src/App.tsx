import { Routes, Route } from 'react-router-dom'
import Home from './Home'
import Portfolio from './Portfolio'
// import Resume from './pages/Resume'
// import Contact from './pages/Contact'
// import NotFound from './pages/NotFound'

function App() {
  return (
    <div className="outside-window">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        {/*<Route path="/resume" element={<Resume />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </div>
  )
}

export default App