"use client"
import { Star, ArrowRight, Users, Shield, Zap, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { useState } from 'react';
import RequestQuoteModal from '../Forms/RequestQuote';
function CallToAction() {
    const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className=''>
        {/* CTA Section */}
      <section className="py-8 px-6 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-4 hidden sm:block">
            
            <h2 className="text-2xl md:text-2xl text-gray-800 font-black mb-2">
              Let's Build Your
              <span className="ml-2 bg-gradient-to-r from-orange-400 to-red-500 text-transparent bg-clip-text">
               Digital Empire
              </span>
            </h2>
           
          </div>

          
          <div className="mb-5 sm:flex hidden  items-center justify-center gap-8 text-gray-400">
            <div className="flex items-center text-sm ">
              <Shield className="w-5 h-5 text-orange-400" />
              100% Secure
            </div>
            <div className="flex items-center text-sm gap-2">
              <Zap className="w-5 h-5 text-orange-400" />
              Lightning Fast
            </div>
            <div className="flex items-center text-sm gap-2">
              <CheckCircle className="w-5 h-5 text-orange-400" />
              Guaranteed Success
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            
            {/* <button 
  onClick={() => {
    setIsModalOpen(true);
    
  }}
  className="bg-transparent text-gray-800  text-base bg-gradient-to-r  border-orange-600 px-6 py-4 rounded-full font-bold  hover:text-white hover:from-orange-500 hover:to-red-500 border-2  transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
>
  Book Your Consultation
</button> */}
          </div>

        </div>
      </section>
 <RequestQuoteModal
  isOpen={isModalOpen} 
  onClose={() => {
    setIsModalOpen(false);
    // Resume carousel
  }} 
/>
    </div>
  )
}

export default CallToAction