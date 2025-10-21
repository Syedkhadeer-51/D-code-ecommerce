import React from 'react'

import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/Product";

function App() {
  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<Product />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
