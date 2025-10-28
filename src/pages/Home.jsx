import React from 'react'
import Hero from '../components/Hero'
import Navbar from '../components/Navbar'
import CategoryList from '../components/CategoryList'
import ProductCarousel from '../components/productCarousel'
import FeaturedProduct from '../components/FeaturedProduct'
import NewsletterSection from '../components/NewsletterSection'
import TrendyCollectionCarousel from '../components/TrendyCollectionCarousel'
import BrandEngagement from '../components/BrandEngagement'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <>
    <Navbar />
    <main>
        <Hero />
        <CategoryList />
        <TrendyCollectionCarousel/>
        <FeaturedProduct/>
        <ProductCarousel/>
        <NewsletterSection/>
        <BrandEngagement/>
        <Footer/>
      </main>
    </>
  )
}

export default Home