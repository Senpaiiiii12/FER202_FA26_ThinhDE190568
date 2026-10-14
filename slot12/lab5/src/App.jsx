import { Route, Routes } from 'react-router-dom'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Home from './pages/Home.jsx'
import New from './pages/New.jsx'
import Footer from './components/Footer.jsx'
import Navbar from './components/Navbar.jsx'
import MyCarousel from './components/MyCarousel.jsx'

function App() {
  return (
    <>
      <Navbar />
      <MyCarousel />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/new" element={<New />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
