"use client";
import { useState, useEffect } from "react";
import RequestQuoteModal from "../Forms/RequestQuote";
import { motion } from "framer-motion";
export default function HeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [images, setImages] = useState([]);

  const slides = [
    {
      id: 1,
      title: "Web Application",
      subtitle: "Development",
      ranking: "#1 Top Web Development",
      location: "Serving Global Markets",
      cta: "Drop Your Queries",
    },
    {
      id: 2,
      title: "Mobile Application",
      subtitle: "Development",
      ranking: "#1 Mobile App Development",
      location: "Trusted by 500+ Companies",
      cta: "Get Started Today",
    },
    {
      id: 3,
      title: "Artificial Intelligence",
      subtitle: "Solutions",
      ranking: "#1 AI Bot Builder",
      location: "Serving Global Markets",
      cta: "Launch Your AI Project",
    },
    {
      id: 4,
      title: "E-Commerce App",
      subtitle: "Solutions",
      ranking: "#1 E-Commerce Development",
      location: "Serving Global Markets",
      cta: "Build Your Blockchain",
    },
    {
      id: 5,
      title: "Transport App",
      subtitle: "Solutions",
      ranking: "#1 Tranport App Like Ola & Uber",
      location: "Serving Global Markets",
      cta: "Get Started Today",
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

  useEffect(() => {
    // Fetch images from API
    const fetchImages = async () => {
      try {
        const response = await fetch('/admin/api/carousel'); // Replace with actual API endpoint
        const data = await response.json();
        setImages(
          data.map((item) => [item.image1, item.image2]) // Assuming data is an array of objects with image1 and image2 properties
          
        ); // Assuming data is an array of image URLs grouped by slide
      } catch (error) {
        console.error('Error fetching images:', error);
        // Fallback images
        setImages([]);
      }
    };
    fetchImages();
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

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

  return (
    <motion.div className="sm:py-12 mx-auto   bg-gradient-to-br from-orange-50 via-white to-orange-100 relative w-full overflow-hidden">
      <div className="relative h-full mx-auto  md:px-8 flex justify-center">
        <div className="w-full relative">
          <div
            className="flex h-full w-full transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className="min-w-full pt-24 md:pt-0 h-full relative flex flex-col md:flex-row items-center justify-between p-4 md:px-8 md:px-16"
              >
                <FloatingElements />
                {/* Left Content */}
                <div className="flex-1 mt-4 z-10 w-full text-center md:text-left">
                  <div className="space-y-5  md:space-y-8">
                    <div>
                      <h1 className={`${slide.id == 5 ? "text-3xl" : "text-3xl"}  md:text-4xl font-extrabold text-orange-500 mb-1 md:mb-2 leading-tight`}>
                        {slide.title}
                      </h1>
                      <p className={`${slide.id == 5 ? "text-3xl" : "text-3xl"}  md:text-4xl text-gray-700 font-extrabold`}>
                        {slide.subtitle}
                      </p>
                    </div>
                    <div className="flex items-center justify-center md:justify-start gap-3 md:gap-6">
                      <div className="flex items-center justify-center w-12  md:w-16 h-12  md:h-16 bg-white border-3 md:border-4 border-red-500 rounded-full shadow-md">
                        <span className="text-xl  md:text-2xl font-bold text-red-500">#1</span>
                      </div>
                      <div>
                        <p className="text-sm md:text-base md:text-md font-medium text-gray-800">
                          Ranked as <span className="text-red-500 font-semibold">{slide.ranking}</span>
                        </p>
                        <p className="text-xs md:text-sm lg:text-base text-gray-600">{slide.location}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-4 py-4 md:mr-20">
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4 lg:gap-6 w-full max-w-2xl">
                        <div className="bg-white border border-gray-200 rounded-md p-3 md:p-4 flex items-center gap-2 justify-center sm:justify-start">
                          <div className="w-12 h-10 md:w-10 lg:w-14 lg:h-10 md:h-14 rounded-full flex items-center justify-center">
                            <img src="/icons/global.gif" className='w-14' alt="Global" />
                          </div>
                          <div>
                            <p className="font-bold text-sm md:text-base">7+</p>
                            <p className="text-xs md:text-sm text-gray-700">Countries Served</p>
                          </div>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-md p-3 md:p-4 flex items-center gap-2 justify-center sm:justify-start">
                          <div className="w-12 h-10 md:w-10 md:w-14 md:h-10 md:h-14 bg-green-100 rounded-full flex items-center justify-center">
                            <img src="/icons/digital-art.gif" className='w-14 h-14' alt="Apps" />
                          </div>
                          <div>
                            <p className="font-bold text-sm md:text-base">100+</p>
                            <p className="text-xs md:text-sm text-gray-700">Apps Developed</p>
                          </div>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-md p-3 md:p-4 flex items-center gap-2 justify-center sm:justify-start">
                          <div className="w-12 h-10 md:w-10 md:w-14 md:h-10 md:h-14 rounded-full flex items-center justify-center">
                            <img src="/icons/like.gif" className='w-10 h-10' alt="Happy customers" />
                          </div>
                          <div>
                            <p className="font-bold text-sm md:text-base">50+</p>
                            <p className="text-xs md:text-sm text-gray-700">Smile Customers</p>
                          </div>
                        </div>
                        <div className="bg-white md:hidden border border-gray-200 rounded-md p-3 md:p-4 flex items-center gap-2 justify-center sm:justify-start">
                          <div className="w-12 h-10 md:w-10 md:w-14 md:h-10 md:h-14 bg-green-100 rounded-full flex items-center justify-center">
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
                    className="bg-gradient-to-r from-orange-600 to-orange-700 text-white px-4 py-3 rounded-md md:text-md font-bold transition-colors border-2 border-orange-500 hover:from-gray-50 hover:to-gray-100 hover:text-orange-500 hover:outline-none hover:border-orange-500"
                  >
                    Book Free Consultation
                  </button>
                </div>
                {/* Right Content - Mobile Mockups */}
                <div className="hidden ml-5 mb-12 md:flex flex-1 justify-center items-center z-10 h-full">
                  <div className="relative max-w-md w-full h-96 flex justify-center items-center gap-4">
                    {images[index]  && (
                      <>
                        <div className="relative w-56 h-96 bg-gray-800 rounded-2xl p-2 shadow-xl transform ">
                          <div className="bg-white rounded-2xl w-full h-full overflow-hidden">
                            <img
                              src={images[index][0]}
                              alt={`${slide.title} mockup 1`}
                              className="w-full h-full object-center"
                            />
                          </div>
                           <div className="absolute top-1 left-1/2 justify-center  rounded-lg items-center flex  transform -translate-x-1/2 w-16 h-5 bg-gray-800 ">
                           <div className="bg-white rounded-full w-2 h-2 "></div>
                           </div>
                          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-16 h-2 rounded-full bg-gray-800 "></div>
                        </div>
                        <div className="relative w-52 h-80 mt-14 bg-gray-800 rounded-3xl p-2 shadow-[0_12px_24px_-4px_rgba(0,0,0,0.4)] transform">
                          <div className="bg-white rounded-2xl w-full h-full overflow-hidden">
                            <img
                              src={images[index][1]}
                              alt={`${slide.title} mockup 2`}
                              className="w-full h-full object-center"
                            />
                          </div>
                          <div className="absolute top-1 left-1/2 justify-center align-middle rounded-lg items-center flex  transform -translate-x-1/2 w-16 h-5 bg-gray-800 ">
                           <div className="bg-white rounded-full w-2 h-2 "></div>
                           </div> 
                          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-16 h-2 rounded-full bg-gray-800 "></div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div className="md:hidden flex justify-center items-center mt-10 z-10">
                  <div className="relative pb-10 w-full h-64 flex justify-center items-center gap-4">
                    {images[index]  && (
                      <>
                        <div className="relative w-32 h-56 bg-gray-800 rounded-2xl p-1 shadow-lg transform ">
                          <div className="bg-white rounded-xl w-full h-full overflow-hidden">
                            <img
                              src={images[index][0]}
                              alt={`${slide.title} mockup 1`}
                              className="w-full h-full object-center"
                            />
                          </div>
                          <div className="absolute top-1 left-1/2 justify-center  rounded-lg items-center flex  transform -translate-x-1/2 w-16 h-3 bg-gray-800 ">
                           <div className="bg-white rounded-full w-2 h-1 "></div>
                           </div>
                          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-10 h-1 rounded-full bg-gray-800 "></div>
                        </div>
                        <div className="relative w-32 min-h-44 mt-5 bg-gray-800 rounded-2xl p-1 shadow-lg transform ">
                          <div className="bg-white rounded-xl w-full h-full overflow-hidden">
                            <img
                              src={images[index][1]}
                              alt={`${slide.title} mockup 2`}
                              className="w-full h-full object-center"
                            />
                          </div>
                         <div className="absolute top-1 left-1/2 justify-center  rounded-lg items-center flex  transform -translate-x-1/2 w-16 h-3 bg-gray-800 ">
                           <div className="bg-white rounded-full w-2 h-1 "></div>
                           </div>
                          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-10 h-1 rounded-full bg-gray-800 "></div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-4 md:gap-6">
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
          <RequestQuoteModal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setIsAutoPlaying(true);
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}