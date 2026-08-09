import { Routes, Route, BrowserRouter } from "react-router-dom";
import './App.css'
import Navbar from './Components/Navbar'
import About from "./pages/About"
import Landingpage from './pages/Landingpage'
import Resource from './pages/Resource'
import Contact from "./pages/Contact";
import Footer from "./Components/Footer";
import Chatbot from "./pages/Chatbot"; 

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landingpage/>} />
          <Route path="/about" element={<About/>}/>
          <Route path="/resource" element={<Resource/>}/>
          <Route path="/contact" element={<Contact/>}/>
        </Routes>

        <Chatbot />
        
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App;
