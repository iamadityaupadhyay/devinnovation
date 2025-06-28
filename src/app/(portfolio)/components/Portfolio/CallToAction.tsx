"use client"
import { Star, ArrowRight, Users, Shield, Zap, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { useState } from 'react';
import RequestQuoteModal from '../Forms/RequestQuote';
function CallToAction() {
    const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div>
        {/* CTA Section */}
      <section className="py-10 px-6 bg-gradient-to-r from-orange-50 to-red-50 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-4 hidden sm:block">
            
            <h2 className="text-2xl md:text-2xl text-gray-800 font-black mb-2">
              Let's Build Your
              <span className="ml-2 bg-gradient-to-r from-orange-400 to-red-500 text-transparent bg-clip-text">
               Digital Empire
              </span>
            </h2>
           
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <Link href="/service/app-development" className="group bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 px-5 py-4 rounded-full font-bold text-white text-base transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center gap-3">
              Start My Project Now
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </Link>
            <button 
  onClick={() => {
    setIsModalOpen(true);
    
  }}
  className="bg-transparent text-gray-800  text-base bg-gradient-to-r  border-2 border-orange-500 px-6 py-4 rounded-full font-bold  hover:text-white hover:from-orange-400 hover:to-red-500 hover:outline-none hover:border-orange-500 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
>
  Book Your Consultation
</button>
          </div>

          <div className="mt-5 sm:flex hidden  items-center justify-center gap-8 text-gray-400">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-orange-400" />
              100% Secure
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-orange-400" />
              Lightning Fast
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-orange-400" />
              Guaranteed Success
            </div>
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