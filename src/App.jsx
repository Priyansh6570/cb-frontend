import React from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './components/Home'
import CarDetail from './components/CarDetail'
import Navbar from './components/Navbar'
import NewCar from './components/NewCar'
import Footer from './components/Footer'
import NavbarMobile from './components/NavbarMobile'
import FooterMobile from './components/FooterMobile'

function App() {

  return (
    <Router>
      <Navbar/>
      <NavbarMobile/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/newCar" element={<NewCar />} />
        <Route path="/car/:id" element={<CarDetail />} />
      </Routes>
      <Footer />
      <FooterMobile />
    </Router>
  )
}

export default App
