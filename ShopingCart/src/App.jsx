import { Route, Router, Routes } from "react-router"
import './output.css'
import Home from "./components/Home"
import NavBar from "./components/NavBar"
import Product from "./components/Product"
import Register from "./components/Register"
import Login from './components/Login'
import ShowCart from './components/ShowCart'
function App() {
  
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} ></Route>
        <Route path="/home" element={<Home />} ></Route>
        <Route path="/product/:id" element={<Product />} ></Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<ShowCart />} />

      </Routes>
    </>
  )
}

export default App
