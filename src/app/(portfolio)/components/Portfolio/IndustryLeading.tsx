"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, Smartphone, Code, Zap, Shield, Users, Star, CheckCircle, Play, ChevronDown } from "lucide-react";
import Link from "next/link";

const services = [
    {
      title: "Fintech Revolution",
      subtitle: "Next-Gen Financial Solutions",
      features: ["Biometric Security", "AI-Powered Insights", "Real-time Analytics", "Blockchain Integration"],
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=500&h=600&fit=crop"
    },
    {
      title: "Grocery Delivery",
      subtitle: "Lightning-Fast Commerce",
      features: ["10-Minute Delivery", "Smart Inventory", "Geo-Location Magic", "Voice Shopping"],
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&h=600&fit=crop"
    },
    {
      title: "Healthcare Ecosystem",
      subtitle: "Digital Health Revolution",
      features: ["Telemedicine", "AI Diagnosis", "Smart Prescriptions", "Health Monitoring"],
      image: "https://plus.unsplash.com/premium_photo-1661670175393-a0c1d2e8bdc3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGhlYWx0aGNhcmUlMjBhcHB8ZW58MHx8MHx8fDA%3D"
    },
    {
      title: "Mobility Solutions",
      subtitle: "Smart Transportation",
      features: ["Real-time Tracking", "Dynamic Pricing", "Multi-modal Transport", "Carbon Footprint"],
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=500&h=600&fit=crop"
    }
  ];
function IndustryLeading() {
    const [isVisible, setIsVisible] = useState(false);
    const [activeSection, setActiveSection] = useState(0);
  return (
    <div>
        {/* Services Showcase */}
      <section className="py-16 px-6 relative">
        <div className=" mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl text-gray-800 font-black mb-6">
              INDUSTRY-LEADING
              <span className="ml-2 bg-gradient-to-r from-orange-400 to-red-500 text-transparent bg-clip-text">
                SOLUTIONS
              </span>
            </h2>
            <p className="text-xl text-gray-800 max-w-3xl mx-auto">
              We don't just build apps—we create digital empires that dominate markets and redefine user experiences.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className={`group relative  backdrop-blur-xl rounded-lg p-8 border transition-all duration-500 transform hover:scale-100 ${
                  activeSection === index ? 'ring-2 ring-orange-400/50 shadow-2xl shadow-orange-500/20' : ''
                }`}
              >
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-3 h-3 bg-gradient-to-r from-orange-400 to-red-500 rounded-full"></div>
                      <span className="text-sm font-bold text-orange-400 uppercase tracking-wider">
                        {service.subtitle}
                      </span>
                    </div>
                    <h3 className="text-3xl font-black text-gray-800 mb-4 group-hover:text-orange-400 transition-colors">
                      {service.title}
                    </h3>
                    <div className="space-y-3 mb-6">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-orange-400 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Link href={`/service/${service.title.replaceAll(" ","-").toLowerCase()}`}
                    className="bg-gradient-to-r text-white from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 px-6 py-3 rounded-full font-bold transition-all duration-300 transform group-hover:scale-105 flex items-center gap-2">
                      BUILD NOW
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="relative w-64 h-80 rounded-lg overflow-hidden transform rotate-3 group-hover:rotate-0 transition-transform duration-500">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Call to Action */}
        <div className="text-center mt-5">
          <div className="inline-flex flex-col sm:flex-row gap-4">
            {/* <button className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-8 py-4 rounded-xl transition-colors duration-300 shadow-lg hover:shadow-xl">
              Get Started Today (not set)
            </button> */}
             <Link 
  href="/service"
  className="border-2 block border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white font-semibold px-6 py-2 lg:text-lg rounded-xl transition-all duration-300">

  View All Services
 
</Link>
           
          </div>
        </div>
        </div>
      </section>
    </div>
  )
}

export default IndustryLeading