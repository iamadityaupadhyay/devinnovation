"use client"
import React from 'react';
import { useState } from 'react';
import { Shield, Zap, CheckCircle } from 'lucide-react';

const ClassyFeaturesSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const features = [
    {
      title: "100% Customer Satisfaction",
      description: "We guarantee complete satisfaction with our services and deliver excellence in every project.",
      icon: "/icons/like.gif",
      bgColor: "bg-amber-50",
      iconBg: "bg-amber-100",
      textColor: "text-amber-600"
    },
    {
      title: "Quality Assurance",
      description: "Rigorous testing and quality control processes ensure flawless performance.",
      icon: "/icons/badge.gif",
      bgColor: "bg-yellow-50",
      iconBg: "bg-yellow-100",
      textColor: "text-yellow-600"
    },
    {
      title: "Deliver on Time",
      description: "We respect deadlines and ensure timely delivery of all projects without compromising quality.",
      icon: "/icons/delivery-truck.gif",
      bgColor: "bg-green-50",
      iconBg: "bg-green-100",
      textColor: "text-green-600"
    },
    {
      title: "24*7 Support & Maintenance",
      description: "Round-the-clock support and maintenance services to keep your applications running smoothly.",
      icon: "/icons/24-7.gif",
      bgColor: "bg-orange-50",
      iconBg: "bg-orange-100",
      textColor: "text-orange-600"
    },
    {
      title: "Free Consultation",
      description: "Get expert advice and consultation for your project requirements at no cost.",
      icon: "/icons/medical-consultation.gif",
      bgColor: "bg-purple-50",
      iconBg: "bg-purple-100",
      textColor: "text-purple-600"
    },
    {
      title: "Trendy Design & Technologies",
      description: "Stay ahead with cutting-edge designs and latest technology implementations.",
      icon: "/icons/digital-art.gif",
      bgColor: "bg-pink-50",
      iconBg: "bg-pink-100",
      textColor: "text-pink-600"
    },
    {
      title: "Cost Effective",
      description: "Premium quality services at competitive prices that fit your budget perfectly.",
      icon: "/icons/reduce-cost.gif",
      bgColor: "bg-emerald-50",
      iconBg: "bg-emerald-100",
      textColor: "text-emerald-600"
    },
    {
      title: "Time to Time Upgradation",
      description: "Regular updates and improvements to keep your solutions current and efficient.",
      icon: "/icons/hourglass.gif",
      bgColor: "bg-blue-50",
      iconBg: "bg-blue-100",
      textColor: "text-blue-600"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-gray-50 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="mb-6">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 leading-tight">
              Let's Build Your
              <span className="ml-3 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-transparent bg-clip-text">
                Digital Empire
              </span>
            </h2>
            <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto">
              Transform your vision into reality with our world-class development services
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-gray-500 mb-8">
            <div className="flex items-center gap-2 text-sm font-medium">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              100% Secure
            </div>
            <div className="flex items-center gap-2 text-sm font-medium">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              Lightning Fast
            </div>
            <div className="flex items-center gap-2 text-sm font-medium">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
              Guaranteed Success
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group relative bg-white rounded-2xl p-6 shadow-lg shadow-gray-100 border border-gray-100 transition-all duration-500 hover:shadow-xl hover:shadow-gray-200 hover:-translate-y-2 cursor-pointer overflow-hidden ${
                index === 0 ? 'hover:bg-gradient-to-br hover:from-amber-50 hover:to-amber-100' :
                index === 1 ? 'hover:bg-gradient-to-br hover:from-yellow-50 hover:to-yellow-100' :
                index === 2 ? 'hover:bg-gradient-to-br hover:from-green-50 hover:to-green-100' :
                index === 3 ? 'hover:bg-gradient-to-br hover:from-orange-50 hover:to-orange-100' :
                index === 4 ? 'hover:bg-gradient-to-br hover:from-purple-50 hover:to-purple-100' :
                index === 5 ? 'hover:bg-gradient-to-br hover:from-pink-50 hover:to-pink-100' :
                index === 6 ? 'hover:bg-gradient-to-br hover:from-emerald-50 hover:to-emerald-100' :
                'hover:bg-gradient-to-br hover:from-blue-50 hover:to-blue-100'
              }`}
            >
              {/* Decorative gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%]"></div>
              
              {/* Icon */}
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 group-hover:from-white group-hover:to-white flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                  <img src={feature.icon} alt={feature.title} className="w-10 h-10 object-contain" />
                </div>
              </div>

              {/* Content */}
              <div className="text-center">
                <h3 className={`font-bold text-sm md:text-base text-gray-900 mb-2 leading-tight transition-colors duration-300 ${
                  index === 0 ? 'group-hover:text-amber-700' :
                  index === 1 ? 'group-hover:text-yellow-700' :
                  index === 2 ? 'group-hover:text-green-700' :
                  index === 3 ? 'group-hover:text-orange-700' :
                  index === 4 ? 'group-hover:text-purple-700' :
                  index === 5 ? 'group-hover:text-pink-700' :
                  index === 6 ? 'group-hover:text-emerald-700' :
                  'group-hover:text-blue-700'
                }`}>
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-xs md:text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/40 transition-all duration-300 transform hover:scale-105 overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative">Schedule Free Consultation</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%]"></div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ClassyFeaturesSection;