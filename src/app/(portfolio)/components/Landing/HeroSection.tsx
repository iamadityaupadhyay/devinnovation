"use client";
import { useState, useEffect } from 'react';
import RequestQuoteModal from '../Forms/RequestQuote';


export default function BlockchainLandingCarousel() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides = [
    {
      id: 1,
      title: "Web Application",
      subtitle: "Development",
      ranking: "#1 Top Web Development",
      location: "Company in India",
      cta: "Drop Your Queries",
      partners: [
        { name: "Google", logo: "G", color: "text-blue-600" },
        { name: "Salesforce", logo: "SF", color: "text-blue-500" },
        { name: "CMMI", logo: "C", color: "text-green-600" },
        { name: "AWS", logo: "AWS", color: "text-orange-500" },
        { name: "Oracle", logo: "O", color: "text-red-500" }
      ]
    },
    
    {
      id: 2,
      title: "Mobile Application",
      subtitle: "Development",
      ranking: "#1 Mobile App Development",
      location: "Trusted by 500+ Companies",
      cta: "Get Started Today",
      partners: [
        { name: "Ethereum", logo: "E", color: "text-purple-600" },
        { name: "Binance", logo: "B", color: "text-yellow-500" },
        { name: "Polygon", logo: "P", color: "text-purple-500" },
        { name: "Solana", logo: "S", color: "text-green-500" },
        { name: "Cardano", logo: "C", color: "text-blue-600" }
      ]
    },
    {
      id: 3,
      title: "Artificial Intelligence",
      subtitle: "Solutions",
      ranking: "#1 AI Bot Builder",
      location: "Serving Global Markets",
      cta: "Launch Your AI Project",
      partners: [
        { name: "Uniswap", logo: "U", color: "text-pink-500" },
        { name: "Compound", logo: "C", color: "text-green-600" },
        { name: "Aave", logo: "A", color: "text-purple-600" },
        { name: "Chainlink", logo: "CL", color: "text-blue-500" },
        { name: "1inch", logo: "1", color: "text-gray-700" }
      ]
    },
    {
      id: 4,
      title: "Blockchain",
      subtitle: "Solutions",
      ranking: "#1 Blockchain Development",
      location: "Serving Global Markets",
      cta: "Build Your Blockchain",
      partners: [
        { name: "Uniswap", logo: "U", color: "text-pink-500" },
        { name: "Compound", logo: "C", color: "text-green-600" },
        { name: "Aave", logo: "A", color: "text-purple-600" },
        { name: "Chainlink", logo: "CL", color: "text-blue-500" },
        { name: "1inch", logo: "1", color: "text-gray-700" }
      ]
    },
    {
      id: 5,
      title: "Software Quality Assurance",
      subtitle: "Testing and Maintenance",
      ranking: "#1 Seo Optimization",
      location: "Trusted by 500+ Companies",
      cta: "Get Started Today",
      partners: [
        { name: "Ethereum", logo: "E", color: "text-purple-600" },
        { name: "Binance", logo: "B", color: "text-yellow-500" },
        { name: "Polygon", logo: "P", color: "text-purple-500" },
        { name: "Solana", logo: "S", color: "text-green-500" },
        { name: "Cardano", logo: "C", color: "text-blue-600" }
      ]
    },
  ];
useEffect(() => {
  if (isModalOpen) {
    setIsAutoPlaying(false);
  }
}, [isModalOpen]);
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  


  const goToSlide = (index:any) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  // Floating elements - responsive
  const FloatingElements = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-10 md:top-20 left-4 md:left-24 w-2 md:w-3 h-2 md:h-3 bg-blue-400 rounded-full opacity-60 animate-pulse"></div>
      <div className="absolute top-16 md:top-32 left-8 md:left-16 w-1.5 md:w-2 h-1.5 md:h-2 bg-cyan-400 rounded-full opacity-70 animate-bounce delay-300"></div>
      <div className="absolute top-24 md:top-48 left-12 md:left-32 w-2 md:w-2.5 h-2 md:h-2.5 bg-blue-300 rounded-full opacity-50 animate-pulse delay-700"></div>
      <div className="absolute bottom-20 md:bottom-40 left-4 md:left-20 w-2 md:w-3 h-2 md:h-3 bg-cyan-300 rounded-full opacity-60 animate-bounce delay-1000"></div>
      <div className="absolute top-8 md:top-24 right-8 md:right-32 w-1.5 md:w-2 h-1.5 md:h-2 bg-blue-400 rounded-full opacity-70 animate-pulse delay-500"></div>
      <div className="absolute bottom-16 md:bottom-32 right-4 md:right-24 w-2 md:w-2.5 h-2 md:h-2.5 bg-cyan-400 rounded-full opacity-60 animate-bounce delay-700"></div>
      <div className="absolute top-32 md:top-64 left-16 md:left-40 w-1.5 md:w-2 h-1.5 md:h-2 bg-blue-300 rounded-full opacity-50 animate-pulse delay-1200"></div>
    </div>
  );

  // Responsive blockchain illustration
  const BlockchainIllustration = () => (
    <div className="relative flex items-center justify-center h-full scale-75 md:scale-100">
      {/* Background gradient shape */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-300 via-yellow-300 to-orange-400 transform rotate-12 rounded-3xl opacity-80"></div>
      <div className="absolute inset-0 bg-gradient-to-tl from-pink-300 via-orange-300 to-yellow-200 transform -rotate-6 rounded-3xl opacity-60"></div>
      
      {/* Person figure */}
      <div className="relative z-20 flex items-end gap-4 md:gap-8">
        {/* Human figure */}
        <div className="relative">
          {/* Head */}
          <div className="w-8 md:w-12 h-8 md:h-12 bg-gray-800 rounded-full mb-1 md:mb-2 relative">
            <div className="absolute top-0.5 md:top-1 left-1 md:left-2 w-6 md:w-8 h-6 md:h-8 bg-orange-300 rounded-full"></div>
          </div>
          
          {/* Body */}
          <div className="w-12 md:w-16 h-16 md:h-24 bg-yellow-400 rounded-t-xl mb-1 relative">
            {/* Bitcoin badge on chest */}
            <div className="absolute top-2 md:top-4 left-1 md:left-2 w-8 md:w-12 h-8 md:h-12 bg-orange-500 rounded-full border-2 md:border-4 border-white shadow-lg flex items-center justify-center">
              <span className="text-white text-sm md:text-lg font-bold">₿</span>
            </div>
          </div>
          
          {/* Legs */}
          <div className="flex gap-0.5 md:gap-1">
            <div className="w-5 md:w-7 h-10 md:h-16 bg-gray-800 rounded-b-xl"></div>
            <div className="w-5 md:w-7 h-10 md:h-16 bg-gray-800 rounded-b-xl"></div>
          </div>
          
          {/* Feet */}
          <div className="flex gap-0.5 md:gap-1 mt-1">
            <div className="w-4 md:w-6 h-2 md:h-3 bg-gray-700 rounded-full"></div>
            <div className="w-4 md:w-6 h-2 md:h-3 bg-gray-700 rounded-full"></div>
          </div>
        </div>

        {/* Floating UI Cards */}
        <div className="relative">
          {/* Top Bitcoin Card */}
          <div className="absolute -top-8 md:-top-16 -left-4 md:-left-8 w-16 md:w-24 h-10 md:h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg md:rounded-xl shadow-2xl transform rotate-12 animate-pulse z-30">
            <div className="p-1 md:p-2 text-white">
              <div className="w-4 md:w-6 h-4 md:h-6 bg-white rounded-full flex items-center justify-center mb-0.5 md:mb-1">
                <span className="text-orange-500 text-xs font-bold">₿</span>
              </div>
              <div className="space-y-0.5 md:space-y-1">
                <div className="w-8 md:w-12 h-0.5 bg-white/80 rounded"></div>
                <div className="w-6 md:w-8 h-0.5 bg-white/60 rounded"></div>
                <div className="w-7 md:w-10 h-0.5 bg-white/70 rounded"></div>
              </div>
            </div>
          </div>

          {/* Browser Window Card */}
          <div className="w-24 md:w-36 h-16 md:h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg md:rounded-xl shadow-2xl transform -rotate-3 animate-bounce z-20">
            <div className="p-2 md:p-3">
              {/* Browser dots */}
              <div className="flex gap-0.5 md:gap-1 mb-1 md:mb-2">
                <div className="w-1.5 md:w-2 h-1.5 md:h-2 bg-white rounded-full opacity-80"></div>
                <div className="w-1.5 md:w-2 h-1.5 md:h-2 bg-white rounded-full opacity-60"></div>
                <div className="w-1.5 md:w-2 h-1.5 md:h-2 bg-white rounded-full opacity-40"></div>
              </div>
              
              {/* Bitcoin icon in browser */}
              <div className="w-6 md:w-10 h-6 md:h-10 bg-white rounded-full flex items-center justify-center mb-1 md:mb-2">
                <span className="text-blue-500 text-sm md:text-lg font-bold">₿</span>
              </div>
              
              {/* Browser lines */}
              <div className="space-y-0.5 md:space-y-1">
                <div className="w-12 md:w-20 h-0.5 bg-white/80 rounded"></div>
                <div className="w-10 md:w-16 h-0.5 bg-white/60 rounded"></div>
              </div>
            </div>
          </div>

          {/* Hexagonal blocks */}
          <div className="absolute -bottom-4 md:-bottom-8 -right-2 md:-right-4 flex flex-col gap-0.5 md:gap-1">
            <div className="w-4 md:w-6 h-4 md:h-6 bg-blue-400 transform rotate-45 opacity-80 animate-pulse"></div>
            <div className="flex gap-0.5 md:gap-1">
              <div className="w-3 md:w-5 h-3 md:h-5 bg-purple-400 transform rotate-45 opacity-70 animate-pulse delay-300"></div>
              <div className="w-3 md:w-5 h-3 md:h-5 bg-blue-300 transform rotate-45 opacity-60 animate-pulse delay-600"></div>
            </div>
            <div className="w-3 md:w-4 h-3 md:h-4 bg-cyan-400 transform rotate-45 opacity-50 animate-pulse delay-900"></div>
          </div>
        </div>
      </div>
    </div>
  );
  
  return (
    <div className="relative w-full h-screen overflow-hidden bg-red-300">
      
      {/* Carousel Container */}
      <div className="relative  h-full">
        <div 
          className="flex h-full  transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div 
              key={slide.id}
              className="min-w-full pt-24 lg:pt-0  h-full bg-gradient-to-br from-orange-50 via-white to-orange-100 relative flex flex-col lg:flex-row items-center justify-between p-4 md:px-8 lg:px-16"
            >
              <FloatingElements />
              
              {/* Left Content */}
              <div className="flex-1 max-w-xl mt-4 z-10 w-full  text-center lg:text-left">
                <div className="space-y-5 md:space-y-6 lg:space-y-8">
                  {/* Main Title */}
                  
                  <div>
                   
                    <h1 className={`${slide.id==5?"text-3xl":"text-4xl"}  md:text-4xl lg:text-5xl font-extrabold text-orange-500 mb-1 md:mb-2 leading-tight`}>
                      {slide.title}
                    </h1>
                    <p className={`${slide.id==5?"text-3xl":"text-4xl"} md:text-5xl lg:text-5xl text-gray-700 font-extrabold`}>
                      {slide.subtitle}
                    </p>
                  </div>

                  {/* Ranking Section */}
                  <div className="flex items-center justify-center lg:justify-start gap-3 md:gap-4 lg:gap-6">
                    <div className="flex items-center justify-center w-12 md:w-14 lg:w-16 h-12 md:h-14 lg:h-16 bg-white border-3 md:border-4 border-red-500 rounded-full shadow-lg">
                      <span className="text-xl md:text-2xl lg:text-3xl font-bold text-red-500">#1</span>
                    </div>
                    <div>
                      <p className="text-sm md:text-base lg:text-lg font-medium text-gray-800">
                        Ranked as <span className="text-red-500 font-semibold">{slide.ranking}</span>
                      </p>
                      <p className="text-xs md:text-sm lg:text-base text-gray-600">{slide.location}</p>
                    </div>
                  </div>

                  {/* Stats Section - Responsive Grid */}
                  <div className="flex flex-col items-center gap-4 py-4 md:gap-6">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4 lg:gap-6 w-full max-w-2xl">
                      <div className="bg-white border border-gray-200 rounded-lg p-3 md:p-4 flex items-center gap-2 justify-center sm:justify-start">
                        <div className="w-12 h-10 md:w-10 lg:w-14 md:h-10 lg:h-14 bg-blue-100 rounded-full flex items-center justify-center">
                          <img src="/icons/global.gif" className='w-14'></img>
                        </div>
                        <div>
                          <p className="font-bold text-sm md:text-base">25+</p>
                          <p className="text-xs md:text-sm text-gray-700">Countries Served</p>
                        </div>
                      </div>
                      <div className="bg-white border border-gray-200 rounded-lg p-3 md:p-4 flex items-center gap-2 justify-center sm:justify-start">
                        <div className="w-12 h-10 md:w-10 lg:w-14 md:h-10 lg:h-14 bg-green-100 rounded-full flex items-center justify-center">
                         <img src="/icons/digital-art.gif" className='w-14 h-14'></img>
                        </div>
                        <div>
                          <p className="font-bold text-sm md:text-base">750+</p>
                          <p className="text-xs md:text-sm text-gray-700">Apps Developed</p>
                        </div>
                      </div>
                      <div className="bg-white border border-gray-200 rounded-lg p-3 md:p-4 flex items-center gap-2 justify-center sm:justify-start">
                        <div className="w-12 h-10 md:w-10 lg:w-14 md:h-10 lg:h-14  rounded-full flex items-center justify-center">
                          <img src="/icons/like.gif" className='w-10 h-10'></img>
                        </div>
                        <div>
                          <p className="font-bold text-sm md:text-base">725+</p>
                          <p className="text-xs md:text-sm text-gray-700">Smile Customers</p>
                        </div>
                      </div>
                      <div className="bg-white lg:hidden border border-gray-200 rounded-lg p-3 md:p-4 flex items-center gap-2 justify-center sm:justify-start">
                        <div className="w-12 h-10 md:w-10 lg:w-14 md:h-10 lg:h-14 bg-green-100 rounded-full flex items-center justify-center">
                         <img src="/icons/technological.gif" className='w-14 h-14'></img>
                        </div>
                        <div>
                          <p className="font-bold text-sm md:text-base">25+</p>
                          <p className="text-xs md:text-sm text-gray-700">Technology Used</p>
                        </div>
                      </div>
                    </div>
                  </div>

          
                 
                </div>
                <button 
  onClick={() => {
    setIsModalOpen(true);
    setIsAutoPlaying(false); 
  }}
  className="bg-orange-500 text-white px-4 py-3 rounded-md lg:text-lg font-bold transition-colors border-2 border-orange-500 hover:bg-white hover:text-orange-500 hover:outline-none hover:border-orange-500"
>
  BOOK FREE CONSULTANCY
</button>
              </div>

              {/* Right Illustration - Hidden on mobile */}
              <div className="hidden lg:flex flex-1 justify-center items-center z-10 h-full">
                <div className="relative w-full max-w-md h-96">
                  <BlockchainIllustration />
                </div>
              </div>

              {/* Mobile Illustration - Smaller version */}
              <div className="lg:hidden  flex justify-center items-center z-10">
                <div className="relative pb-10 w-screen h-64 ">
                  <BlockchainIllustration />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Controls - Responsive */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-4 md:gap-6">
        {/* Slide Indicators */}
        <div className="flex gap-2 md:gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 md:w-3 h-2 md:h-3 rounded-full transition-all duration-300 ${
                currentSlide === index 
                  ? 'bg-orange-500 scale-125' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* Auto-play Toggle */}
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className={`px-2 md:px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
            isAutoPlaying 
              ? 'bg-green-500 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {isAutoPlaying ? 'Auto' : 'Manual'}
        </button>
      </div>

      {/* Progress Bar */}
     <RequestQuoteModal 
  isOpen={isModalOpen} 
  onClose={() => {
    setIsModalOpen(false);
    setIsAutoPlaying(true); // Resume carousel
  }} 
/>
    </div>
    
  );
}