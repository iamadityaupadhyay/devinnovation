
"use client"
import { useState,useEffect } from "react";
import RequestQuoteModal from "../Forms/RequestQuote";
export default function HeroSection() {
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
      title: "Blockchain Development",
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

  // Web Development Illustration
  const WebDevelopmentIllustration = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    {/* Background image with unique shape and animation */}
    <div 
      className="absolute inset-0 rounded-xl opacity-20 hover:opacity-100 transition-opacity duration-500 ease-in-out delay-200"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        clipPath: 'polygon(0 0, 100% 0, 100% 75%, 75% 75%, 75% 100%, 50% 75%, 0% 75%)'
      }}
    />
    {/* Modern tech frame */}
    <div className="relative bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-2xl border border-blue-200">
      <div className="relative w-64 h-48">
        {/* Browser window */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200">
          {/* Browser header */}
          <div className="bg-gray-100 rounded-t-lg p-3 border-b">
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              </div>
              <div className="bg-white rounded px-3 py-1 ml-4 text-xs text-gray-500 flex-1">
                https://yourwebsite.com
              </div>
            </div>
          </div>
          {/* Browser content */}
          <div className="p-4 space-y-3">
            <div className="bg-blue-500 h-8 rounded animate-pulse"></div>
            <div className="flex gap-2">
              <div className="bg-gray-200 h-4 rounded flex-1"></div>
              <div className="bg-gray-200 h-4 rounded flex-1"></div>
            </div>
            <div className="bg-gray-200 h-4 rounded w-3/4"></div>
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-orange-300 h-12 rounded"></div>
              <div className="bg-green-300 h-12 rounded"></div>
              <div className="bg-purple-300 h-12 rounded"></div>
            </div>
          </div>
        </div>
        {/* Floating code elements */}
        <div className="absolute -top-4 -right-4 bg-gray-800 text-green-400 p-2 rounded text-xs font-mono">
          {'</>'}
        </div>
        <div className="absolute -bottom-4 -left-4 bg-blue-600 text-white p-2 rounded text-xs">
          Tailwind CSS
        </div>
      </div>
    </div>
  </div>
);

  // Mobile App Development Illustration
  const MobileAppIllustration = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    {/* Background image with unique shape and animation */}
    <div 
      className="absolute inset-0 rounded-3xl opacity-20 hover:opacity-100 transition-opacity duration-600 ease-in-out delay-300"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        clipPath: 'polygon(10% 0%, 90% 0%, 100% 10%, 100% 90%, 90% 100%, 10% 100%, 0% 90%, 0% 10%)'
      }}
    />
    {/* Sleek mobile frame */}
    <div className="relative   p-8  ">
      <div className="relative flex items-center justify-center gap-4">
        {/* Phone 1 */}
        <div className="bg-gray-900 opacity-80 rounded-3xl p-2 shadow-xl transform -rotate-12">
          <div className="bg-white rounded-2xl sm:w-32 sm:h-56 h-44 w-24 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-12 flex items-center justify-center">
              <div className="w-8 h-1 bg-white rounded-full"></div>
            </div>
            <div className="p-3 space-y-2">
              <div className="bg-purple-100 h-6 rounded"></div>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-pink-200 h-12 rounded-lg"></div>
                <div className="bg-purple-200 h-12 rounded-lg"></div>
                <div className="bg-indigo-200 h-12 rounded-lg"></div>
                <div className="bg-blue-200 h-12 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
        {/* Phone 2 */}
        <div className="bg-gray-900 opacity-80 rounded-3xl p-2 shadow-xl transform rotate-12">
          <div className="bg-white rounded-2xl sm:w-32 sm:h-56 h-44 w-24 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-12 flex items-center justify-center">
              <div className="w-8 h-1 bg-white rounded-full"></div>
            </div>
            <div className="p-3 space-y-2">
              <div className="bg-blue-100 h-6 rounded"></div>
              <div className="space-y-2">
                <div className="bg-cyan-200 h-8 rounded-lg"></div>
                <div className="bg-blue-200 h-8 rounded-lg"></div>
                <div className="bg-indigo-200 h-8 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Floating app icons */}
      <div className="absolute -top-2 left-4 w-5 h-5 bg-red-500 rounded-lg shadow-lg animate-bounce"></div>
      <div className="absolute -bottom-2 right-4 w-5 h-5 bg-green-500 rounded-lg shadow-lg animate-bounce delay-300"></div>
    </div>
  </div>
);

  // AI Solutions Illustration
  const AIIllustration = () => (
  <div className="relative w-full h-full flex  items-center justify-center">
    {/* Background image with unique shape and animation */}
    <div 
      className="absolute inset-0 rounded-full opacity-20 h-full scale-110 hover:opacity-100 transition-opacity duration-500 ease-in-out delay-200"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1555255707-c07966088b7b?w=400&h=300&fit=crop)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        clipPath: 'polygon(0 0, 100% 0, 100% 80%, 0 100%)'
      }}
    />
    {/* Futuristic AI frame */}
    <div className="relative bg-white/70  backdrop-blur-sm rounded-2xl shadow-2xl border border-emerald-200">
      <div className="relative w-64 h-36 flex items-center justify-center">
        {/* Central AI brain */}
        <div className="relative">
          <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
            <div className="text-white text-2xl font-bold">
              <img src="/icons/technological.gif" className="w-16  rounded-full h-16 " alt="AI Brain">
              </img>
            </div>
          </div>
          {/* Neural network connections */}
          <div className="absolute inset-0">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-emerald-300 rounded-full animate-pulse"
                style={{
                  top: `${50 + 40 * Math.cos((i * Math.PI) / 4)}%`,
                  left: `${50 + 40 * Math.sin((i * Math.PI) / 4)}%`,
                  animationDelay: `${i * 0.2}s`
                }}
              ></div>
            ))}
          </div>
        </div>
        {/* Floating data nodes */}
        <div className="absolute top-4 right-4 bg-white p-2 rounded-lg shadow-md">
          <div className="text-xs text-gray-600">Neural Net</div>
          <div className="w-12 h-2 bg-emerald-300 rounded animate-pulse"></div>
        </div>
        <div className="absolute bottom-4 left-4 bg-white p-2 rounded-lg shadow-md">
          <div className="text-xs text-gray-600">ML Model</div>
          <div className="w-12 h-2 bg-cyan-300 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  </div>
);
  // Blockchain Illustration
  const BlockchainIllustration = () => (
  <div className="relative flex items-center justify-center h-full scale-125 p-12 md:scale-100">
    {/* Background image with unique shape and animation */}
    <div 
      className="absolute inset-0 rounded-3xl opacity-20 hover:opacity-100 transition-opacity duration-600 ease-in-out delay-300"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=400&h=300&fit=crop)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        clipPath: 'polygon(0 20%, 80% 0, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%)'
      }}
    />
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
  // QA Testing Illustration
  const QAIllustration = () => (
  <div className="relative w-full h-full mt-8  flex items-center justify-center">
    {/* Background image with unique shape and animation */}
    <div 
      className="absolute inset-0 rounded-lg  opacity-20 hover:opacity-100 transition-opacity duration-700 ease-in-out delay-300"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)'
      }}
    />
    {/* Professional QA frame */}
    <div className="relative bg-gradient-to-br from-green-50 to-blue-100 p-4  rounded-2xl shadow-2xl border-2 border-green-200">
      <div className="relative w-64 h-48 flex items-center justify-center">
        {/* Testing dashboard */}
        <div className="bg-white rounded-lg shadow-lg p-4 w-full">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            <span className="text-sm font-medium">Quality Dashboard</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <div className="text-xs text-gray-600">Tests Passed: 95%</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <div className="text-xs text-gray-600">In Progress: 4%</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <div className="text-xs text-gray-600">Failed: 1%</div>
            </div>
          </div>
          {/* Progress bars */}
          <div className="mt-4 space-y-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-400 h-2 rounded-full w-11/12 animate-pulse"></div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-400 h-2 rounded-full w-4/5 animate-pulse"></div>
            </div>
          </div>
        </div>
        {/* Floating checkmarks */}
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg animate-bounce">
          ✓
        </div>
        <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-lg animate-bounce delay-300">
          ⚡
        </div>
      </div>
    </div>
  </div>
);

  // Function to get the appropriate illustration for each slide
  const getIllustration = (slideId:any) => {
    switch (slideId) {
      case 1:
        return <WebDevelopmentIllustration />;
      case 2:
        return <MobileAppIllustration />;
      case 3:
        return <AIIllustration />;
      case 4:
        return <BlockchainIllustration />;
      case 5:
        return <QAIllustration />;
      default:
        return <WebDevelopmentIllustration />;
    }
  };
  
  return (
    <div className="h-screen pb-10 bg-gradient-to-br from-orange-50 via-white to-orange-100 relative w-full overflow-hidden">
      {/* Carousel Container */}
      <div className="relative h-full">
        <div 
          className="flex h-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div 
              key={slide.id}
              className="min-w-full pt-24 lg:pt-0 h-full relative flex flex-col lg:flex-row items-center justify-between p-4 md:px-8 lg:px-16"
            >
              <FloatingElements />
              
              {/* Left Content */}
              <div className="flex-1 max-w-xl mt-4 z-10 w-full text-center lg:text-left">
                <div className="space-y-5 md:space-y-6 lg:space-y-8">
                  {/* Main Title */}
                  <div>
                    <h1 className={`${slide.id==5?"text-3xl":"text-3xl"} md:text-4xl lg:text-4xl font-extrabold text-orange-500 mb-1 md:mb-2 leading-tight`}>
                      {slide.title}
                    </h1>
                    <p className={`${slide.id==5?"text-3xl":"text-3xl"} md:text-4xl lg:text-4xl text-gray-700 font-extrabold`}>
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
                        <div className="w-12 h-10 md:w-10 lg:w-14 md:h-10 lg:h-14  rounded-full flex items-center justify-center">
                          <img src="/icons/global.gif" className='w-14' alt="Global" />
                        </div>
                        <div>
                          <p className="font-bold text-sm md:text-base">25+</p>
                          <p className="text-xs md:text-sm text-gray-700">Countries Served</p>
                        </div>
                      </div>
                      <div className="bg-white border border-gray-200 rounded-lg p-3 md:p-4 flex items-center gap-2 justify-center sm:justify-start">
                        <div className="w-12 h-10 md:w-10 lg:w-14 md:h-10 lg:h-14 bg-green-100 rounded-full flex items-center justify-center">
                          <img src="/icons/digital-art.gif" className='w-14 h-14' alt="Apps" />
                        </div>
                        <div>
                          <p className="font-bold text-sm md:text-base">750+</p>
                          <p className="text-xs md:text-sm text-gray-700">Apps Developed</p>
                        </div>
                      </div>
                      <div className="bg-white border border-gray-200 rounded-lg p-3 md:p-4 flex items-center gap-2 justify-center sm:justify-start">
                        <div className="w-12 h-10 md:w-10 lg:w-14 md:h-10 lg:h-14 rounded-full flex items-center justify-center">
                          <img src="/icons/like.gif" className='w-10 h-10' alt="Happy customers" />
                        </div>
                        <div>
                          <p className="font-bold text-sm md:text-base">725+</p>
                          <p className="text-xs md:text-sm text-gray-700">Smile Customers</p>
                        </div>
                      </div>
                      <div className="bg-white lg:hidden border border-gray-200 rounded-lg p-3 md:p-4 flex items-center gap-2 justify-center sm:justify-start">
                        <div className="w-12 h-10 md:w-10 lg:w-14 md:h-10 lg:h-14 bg-green-100 rounded-full flex items-center justify-center">
                          <img src="/icons/technological.gif" className='w-14 h-14' alt="Technology" />
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
                  Book Free Consultation
                </button>
              </div>

              {/* Right Illustration - Hidden on mobile */}
              <div className="hidden lg:flex flex-1 justify-center items-center z-10 h-full">
                <div className="relative w-full max-w-md h-96">
                  {getIllustration(slide.id)}
                </div>
              </div>

              {/* Mobile Illustration - Smaller version */}
              <div className="lg:hidden flex justify-center items-center z-10">
                <div className="relative pb-10 w-full h-64">
                  {getIllustration(slide.id)}
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

      {/* Modal */}
      <RequestQuoteModal 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          setIsAutoPlaying(true);
        }} 
      />
    </div>
  );
}