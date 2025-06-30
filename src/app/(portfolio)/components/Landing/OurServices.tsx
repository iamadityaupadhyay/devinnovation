"use client";
import React, { useState } from "react";
import { Quote, Star, Smartphone, Phone, TabletSmartphone, Watch, Palette, CheckCircle, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Service {
  title: string;
  description: string;
  icon: string;
  bgColor: string;
  hoverImage: string;
}

const services: Service[] = [
  {
    title: "Mobile App Consultancy",
    description: "We offer expert consulting services to craft robust monetization and marketing strategies, ensuring your mobile applications achieve maximum impact.",
    icon: "/icons/digital-art.gif",
    bgColor: "bg-orange-500",
    hoverImage: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "iOS App Development",
    description: "Our team delivers scalable, high-performance iPhone applications tailored to your business needs, with seamless experiences across Apple devices.",
    icon: "/icons/payment-app.gif",
    bgColor: "bg-orange-500",
    hoverImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Android App Development",
    description: "We create innovative Android apps with cutting-edge technology, designed to meet diverse business requirements and engage a global audience.",
    icon: "/icons/mobile-apps.gif",
    bgColor: "bg-orange-500",
    hoverImage: "https://plus.unsplash.com/premium_photo-1661326290415-2bfb306b35d5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YW5kcm9pZCUyMGFwcHxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    title: "Wearable App Development",
    description: "Our developers build high-quality wearable apps for all major platforms, enhancing user engagement through innovative solutions.",
    icon: "/icons/smart-watch.gif",
    bgColor: "bg-orange-500",
    hoverImage: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "UI UX Design",
    description: "We design visually stunning and intuitive interfaces using advanced tools, creating seamless and engaging experiences for users.",
     icon: "/icons/digital-art.gif",
    bgColor: "bg-orange-500",
    hoverImage: "https://images.unsplash.com/photo-1541462608143-67571c6738dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Software Quality Assurance",
    description: "Quality is our priority. We implement rigorous QA processes to ensure flawless performance and reliability across all development stages.",
     icon: "/icons/badge.gif",
    bgColor: "bg-orange-500",
    hoverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
];

const ServiceCard = ({ service, index }: { service: Service; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative  group cursor-pointer h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Hover Image Overlay */}
      <div className={`
        absolute inset-0 rounded-sm overflow-hidden transition-all duration-500
        ${isHovered ? 'opacity-100' : 'opacity-0'}
      `}>
        <Image
          src={service.hoverImage}
          alt={service.title}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-700 group-hover:scale-110"
        />
        {/* <div className="absolute inset-0 bg-gradient-to-t from-orange-600/70 via-orange-500/30 to-transparent" /> */}
      </div>

      <div
        className={`
          relative bg-white rounded-sm py-5 px-4 shadow-lg transition-all duration-500 ease-out h-full
          ${isHovered 
            ? 'transform  shadow-2xl bg-white/80 ' 
            : 'transform translate-y-0 shadow-lg'
          }
        `}
        style={{
          transitionDelay: `${index * 50}ms`
        }}
      >
        {/* Icon */}
        
        <div className={`
          relative z-10    flex items-center justify-between mb-6 
          transition-all duration-300 ${isHovered ? 'scale-105' : 'scale-105'}
        `}>
          <div>
             <img src={service.icon? service.icon:"hello.png"} className='w-14 rounded-full'></img>
            </div>
          
           <div className={`transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <Link href={`/service/${service.title.replaceAll(" ","-").toLowerCase()}`} className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-1.5 rounded-full text-sm  font-medium transition-all duration-300 flex items-center justify-center gap-2 group">
              More Info
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
        
        {/* Content */}
        <div className="relative z-10">
          <h3 className={`font-bold text-xl mb-4 transition-colors duration-300 ${isHovered ? 'text-gray-700' : 'text-gray-800'}`}>
            {service.title}
          </h3>
          <p className={`leading-relaxed mb-6 text-sm transition-colors duration-300 ${isHovered ? 'text-gray-700' : 'text-gray-600'}`}>
            {service.description}
          </p>
          
          {/* More Info Button - appears on hover */}
          
        </div>
      </div>
    </div>
  );
};

export const OurServices = () => {
  return (
    <div id="services" className="w-full  px-4 py-16 bg-gradient-to-r from-orange-50 to-yellow-50  relative overflow-hidden">
      {/* Interactive background elements */}
      <div className="absolute inset-0  overflow-hidden">
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-orange-300 rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
        
        {/* Animated blobs */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
        <div className="absolute top-1/4 -right-20 w-64 h-64 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float-delayed"></div>
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float-delayed-2"></div>
      </div>
      
      <div className="relative  z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-5">
          <h3 className="text-blue-800 font-medium uppercase tracking-wider text-sm ">
          </h3>
          <h1 className="text-3xl md:text-3xl font-extrabold text-gray-900 mb-1 leading-tight">
            We Build Modern Creative
          </h1>
          <h2 className="text-3xl  font-bold mb-6">
            <span className="text-orange-500">Mobile Experiences</span>
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
        
        @keyframes float-delayed {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-30px) rotate(-180deg);
          }
        }
        
        @keyframes float-delayed-2 {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(90deg);
          }
        }
        
        @keyframes particle-float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          25% {
            transform: translateY(-10px) translateX(5px);
          }
          50% {
            transform: translateY(-5px) translateX(-5px);
          }
          75% {
            transform: translateY(-15px) translateX(10px);
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
          animation-delay: 2s;
        }
        
        .animate-float-delayed-2 {
          animation: float-delayed-2 7s ease-in-out infinite;
          animation-delay: 4s;
        }
        
        .absolute.w-2.h-2 {
          animation: particle-float infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};