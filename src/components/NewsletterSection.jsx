import React from 'react'

const NewsletterSection = () => {
  return (
    <section>
        <div className='container mx-w-80 md:max-w-full mx-auto mb-4'>
            <div className='grid grid-cols-1 md:grid-cols-2 bg-red-100 px-5 py-2 rounded-md m-2'>
                <div className='py-4'>
                    <h2 className='text-2xl font-semibold mb-2'>Subscribe to our Newsletter</h2>
                    <p className='text-gray-600'>Stay updated with our latest news and offers. Join our newsletter today!</p>
                </div>
                <div className='flex justify-center md:justify-end items-center'>
                    <button className='border border-red-800 hover:border-red-950 hover:bg-red-300 pointer-events-auto hover:text-white transition text-slate-100 rounded-md p-2 bg-red-700 '>Subscribe Now</button>
                </div>
            </div>
        </div>
    </section>
  )
}

export default NewsletterSection