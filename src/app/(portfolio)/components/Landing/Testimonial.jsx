"use client"
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const TestimonialCarousel = ({clients}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex >= clients.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex <= 0 ? clients.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    if (!isAutoPlaying || clients.length === 0) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying, clients.length]);

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-gray-50 flex items-center justify-center">
      <div className=" w-full">
        <div className="grid py-16  md:grid-cols-2  items-stretch overflow-hidden">
          {/* Left Side - Hero Content */}
          <div className="relative p-2 rounded-3xl min-h-[250px] max-h-[500px]">
            <img
              src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=800&fit=crop"
              alt="Nature background"
              className="w-full md:h-[500px] px-5 hidden sm:block rounded-3xl object-cover"
            />

            {/* Bubble Title Overlay */}
            <div className="absolute top-0 pl-5 py-2 z-10">
              <h1 className="text-2xl rounded-2xl md:text-3xl font-bold  text-gray-800">
                <span className='bg-gray-50 rounded-r-lg pl-4 mb-4 pr-5'>Hear From Our</span>
                <span className="bg-gray-50 block pl-7 pr-5 rounded-r-lg  text-orange-500 ">Satisfied Clients</span>
                <span className=' pl-4  bg-gray-50 rounded-r-lg mt-4  pr-1'>Have To Say <span className="text-red-500">🖤</span></span>
              </h1>
            </div>

            {/* Stats */}
            <div className="absolute bottom-8 right-16 text-white drop-shadow-md">
              <div className="text-3xl font-bold mb-1">100+</div>
              <div className="text-lg opacity-90">Happy Clients</div>
            </div>
          </div>

          {/* Right Side - Testimonials */}
          <div className=" flex md:flex-col items-center flex-row justify-between h-full">
            <div 
              className="relative  h-full"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {/* Display three testimonials with active one highlighted */}
              <div className="h-full  flex flex-col justify-center">
                <div className="space-y-2 h-full flex flex-col items-center justify-center gap-2">
                  {clients.slice(0, 3).map((testimonial, index) => (
                    <div
                      key={index}
                      className={`relative rounded-2xl p-4 shadow-lg max-w-md w-full border-2 border-orange-300 ${
                        index === currentIndex ? 'bg-orange-100' : 'bg-gray-100'
                      }`}
                    >
                      {/* Stars */}
                      <div className="flex mb-4">
                        {[1, 2, 3, 4, 5].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-orange-500 fill-current" />
                        ))}
                      </div>

                      {/* Quote */}
                      <blockquote className="text-gray-700 text-sm leading-relaxed mb-6">
                        "{testimonial.content || testimonial.feedback}"
                      </blockquote>

                      {/* Client Info */}
                      <div className="flex items-center gap-3">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-orange-300"
                        />
                        <div className="overflow-hidden">
                          <h4 className="font-semibold text-gray-900 text-base">
                            {testimonial.name}
                          </h4>
                          <p className="text-orange-600 text-sm font-medium">
                            {testimonial.position || testimonial.projectName}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

              

                {/* Dots Navigation */}
                <div className="flex justify-center mt-4 space-x-2">
                  {clients.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentIndex
                          ? 'bg-orange-500 w-6'
                          : 'bg-orange-200 hover:bg-orange-300'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCarousel;