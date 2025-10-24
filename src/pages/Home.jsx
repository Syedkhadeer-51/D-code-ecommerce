import React from 'react'
import Hero from '../components/Hero'
import ProductList from '../components//ProductList'
import Navbar from '../components/Navbar'
import CategoryList from '../components/CategoryList'

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <CategoryList />
      {/* Products-section */}
      <h2 className="text-2xl text-blue-300 text-center p-2">
      </h2>
      {/* <ProductList/> */}
    </>
  )
}

export default Home