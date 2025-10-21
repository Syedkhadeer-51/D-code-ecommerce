import React from 'react'
import Hero from '../components/Hero'
import ProductList from '../components//ProductList'
import Navbar from '../components/Navbar'

const Home = () => {
  return (
    <>
    <Navbar />
    <Hero/>
    {/* Products-section */}
     <h2 className="text-2xl text-blue-300 text-center p-2">
          <span className='font-bold text-slate-900 text-2xl'>Featured Products</span>
        </h2>
        <ProductList/>
    </>
  )
}

export default Home