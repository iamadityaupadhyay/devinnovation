"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Smartphone, Code, Zap, Shield, Users, Star, CheckCircle, Play, ChevronDown } from "lucide-react";
import RequestQuoteModal from "../Forms/RequestQuote";
function HeroSection() {
     const [isVisible, setIsVisible] = useState(true);
      const [activeSection, setActiveSection] = useState(0);
       const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div>{/* Hero Section */}
      <section className="relative py-10   flex items-center justify-center px-6">
        <div className={` text-center transition-all duration-2000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <div className="mb-8">
            <span className="inline-block bg-gradient-to-r from-orange-400 to-red-500 text-transparent bg-clip-text text-sm font-bold tracking-wider uppercase mb-4">
              ✨ Premium App Development
            </span>
            <h1 className="text-3xl  md:text-4xl font-black mb-6 text-gray-800 leading-tight">
              <span>
BUILD THE 
              </span>
              
              <span className="ml-2 mr-2 bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 text-transparent bg-clip-text">
                FUTURE
              </span>
              <span>
OF DEVELOPMENT
              </span>
              
            </h1>
            <p className="text-xl md:text-2xl text-gray-800 mb-8 max-w-4xl mx-auto leading-relaxed">
              We craft extraordinary mobile experiences that don't just meet expectations—they 
              <span className="text-orange-400 font-semibold"> shatter them</span>. 
              From concept to global success.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12">
            <Link href="/service/app-development" className="group bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 px-5 py-4 rounded-full font-black text-white text-base transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center gap-3">
              START YOUR PROJECT
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </Link>
            <button 
  onClick={() => {
    setIsModalOpen(true);
    
  }}
  className="group border-2 text-gray-800 border-orange-400 hover:bg-orange-400 hover:text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-3"
> <Play className="w-5 h-5" />
  Consult Experts
</button>
            
          
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { number: "10+", label: "Apps Launched" },
              { number: "10M+", label: "Webapps Launched" },
              { number: "99%", label: "Success Rate" },
              { number: "24/7", label: "Support" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-black text-orange-400 mb-2">{stat.number}</div>
                <div className="text-gray-400 text-sm uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-orange-400" />
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

export default HeroSection