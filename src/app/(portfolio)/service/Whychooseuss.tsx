"use client"
import React from 'react';
import RequestQuoteModal from '../components/Forms/RequestQuote';
import { useState } from 'react';
import { Shield, Users, Target, Zap, Globe, Clock, CheckCircle } from 'lucide-react';
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
const features2 = [
    {
      icon: Shield,
      title: "Security & Privacy Assured",
      description: "NDA documents are handled with utmost confidentiality and security protocols are strictly maintained.",
      bgImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    {
      icon: Users,
      title: "Expert Team Deployed",
      description: "Seasoned professionals with extensive experience are assigned to every project for optimal results.",
      bgImage: "https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80"
    },
    {
      icon: Target,
      title: "Client Satisfaction Guaranteed",
      description: "Solutions are tailored to exceed expectations and ensure complete client satisfaction.",
      bgImage: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80"
    },
    {
      icon: Zap,
      title: "Innovative Processes",
      description: "Cutting-edge development methodologies and agile processes are utilized for superior outcomes.",
      bgImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80"
    },
    {
      icon: Globe,
      title: "Market Compatibility Ensured",
      description: "Strategic planning and market analysis are conducted to ensure perfect market alignment.",
      bgImage: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1174&q=80"
    },
    {
      icon: Clock,
      title: "Timeline Adherence Maintained",
      description: "Cost-effective delivery schedules are established and strictly followed for optimal project completion.",
      bgImage: "https://images.unsplash.com/photo-1501139083538-0139583c060f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    
  ];

  return (
    <section className=" py-8 bg-gradient-to-r from-white via-gray-50 to-gray-50  px-4 ">
      <div className="max-w-6xl  mx-auto">
        {/* Header */}
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

        {/* Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 py-5 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`rounded-2xl p-4 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border bg-gray-100 border-white group cursor-pointer ${
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
                <h3 className={`ml-2 font-bold text-sm leading-tight`}>
                  {feature.title}
                </h3>
                
              </div>
            </div>
          ))}
        </div>
        <div className="gap-12 items-center">
          

          {/* Right Side - Why Choose Us Content */}
          <div className="space-y-8">
            

            <div className="mt-5">
              
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {features2.map((feature, index) => (
                  <div 
                    key={index} 
                    className="relative flex items-start space-x-3 py-4 rounded-lg hover:bg-orange-50 transition-colors duration-300 group overflow-hidden"
                  >
                    {/* Background image that appears on hover */}
                    <div className="absolute backdrop-blur-lg inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-20">
                      <img 
                        src={feature.bgImage} 
                        alt="" 
                        className="w-full h-full  object-cover"
                      />
                    </div>
                    

                    <div className="flex-0 z-10">
                      <h4 className="font-semibold text-gray-900 text-base mb-1">
                        {feature.title}
                      </h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                                        <div className="flex-1 px-6 z-10">
                      <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <feature.icon className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            
          </div>
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