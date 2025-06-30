"use client"
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import axios from 'axios';
const TestimonialCarousel = ({testimonials}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  
  
  console.log(testimonials) // Add client testimonials
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex >= testimonials.length - 3 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex <= 0 ? testimonials.length - 3 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying]);

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  const totalSlides = testimonials.length>2?testimonials.length -2 : testimonials.length ;

  return (
    <div className="relative max-w-7xl py-16">
      <div 
        className="h-[25vh] lg:h-[30vh] absolute inset-0 px-2 bg-cover bg-center "
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1549923746-c502d488b3ea?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`
        }}
      >
        <div className="absolute inset-0 bg-black/80"></div>
      </div>
      <div className="max-w-7xl mx-auto relative z-10 px-4">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-white mb-1">
            What Our Clients 
            <span className="ml-2 bg-gradient-to-r from-orange-400 to-red-500 text-transparent bg-clip-text">
              Say
            </span>
          </h2>
          <p className="text-white/80 text-base">
            Hear from our satisfied clients about their experience with us.
          </p>
        </div>

        <div className="min-h-[50px]"></div> {/* Spacer for half image height */}

        <div 
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Testimonials Grid */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={testimonial.id} className="lg:w-1/3 w-80 flex-shrink-0 px-3">
                  <div className="bg-white rounded-xl shadow-lg p-6 h-full border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                    {/* Stars */}
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-orange-400 fill-current" />
                      ))}
                    </div>

                    {/* Testimonial Text */}
                    <blockquote className="text-gray-700 leading-relaxed mb-6 text-sm">
                      "{testimonial.feedback}"
                    </blockquote>

                    {/* Client Info */}
                    <div className="flex items-center gap-3 mt-auto">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-orange-100"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm">
                          {testimonial.name}
                        </h4>
                        <p className="text-orange-600 text-xs font-medium">
                          {testimonial.projectName}
                        </p>
                        <p className="text-gray-500 text-xs">
                          {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center mt-8 space-x-2">
            {[...Array(totalSlides)].map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-orange-500 w-8' 
                    : 'bg-orange-200 hover:bg-orange-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCarousel;