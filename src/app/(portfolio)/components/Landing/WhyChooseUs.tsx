"use client"
import React from 'react';
import RequestQuoteModal from '../Forms/RequestQuote';
import { useState } from 'react';
const WhyChooseUs = () => {
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
      bgColor: "bg-orange-50",
      iconBg: "bg-orange-100",
      textColor: "text-orange-600"
    }
  ];

  return (
    <section className=" py-8 bg-gradient-to-r from-orange-50 via-yellow-50  to-orange-50  px-4 ">
      <div className="max-w-7xl  mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-6 leading-tight">
            Why Choose <span className="text-orange-600">Us for</span>
            <span className="text-orange-600 ml-2">App Development</span>
          </h2>
          
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`rounded-2xl p-4 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border bg-white border-white group cursor-pointer ${
  index === 0 ? 'hover:bg-amber-50 hover:text-amber-600' :
  index === 1 ? 'hover:bg-yellow-50 hover:text-yellow-600' :
  index === 2 ? 'hover:bg-green-50 hover:text-green-600' :
  index === 3 ? 'hover:bg-orange-50 hover:text-orange-600' :
  index === 4 ? 'hover:bg-purple-50 hover:text-purple-600' :
  index === 5 ? 'hover:bg-pink-50 hover:text-pink-600' :
  index === 6 ? 'hover:bg-emerald-50 hover:text-emerald-600' :
  'hover:bg-orange-50 hover:text-orange-600'
}`}
            >
              {/* Icon */}
              

              {/* Content */}
              <div className='flex flex-row items-center text-center'>
                <div className="w-12 h-10 md:w-10 lg:w-14 md:h-10 lg:h-14  rounded-full flex items-center justify-center">
                          <img src={feature.icon} alt={feature.title} className='w-16  rounded-full' />
                        </div>
                <h3 className={`ml-2 font-bold text-md leading-tight`}>
                  {feature.title}
                </h3>
                
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
             <button 
  onClick={() => {
    setIsModalOpen(true);
    
  }}
  className="border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300">

  Schedule Free Consultation
</button>
           
          </div>
        </div>
      </div>
       <RequestQuoteModal
  isOpen={isModalOpen} 
  onClose={() => {
    setIsModalOpen(false);
    // Resume carousel
  }} 
/>
    </section>
  );
};

export default WhyChooseUs;