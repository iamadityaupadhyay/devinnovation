"use client"
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import axios from 'axios';

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [testimonials, setTestimonials] = useState([]);

  const fetchTestimonials = async () => {
    try {
      const response = await axios.get('/admin/api/getClients');
      if (response.data) {
        setTestimonials(response.data);
      }
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      setTestimonials([]);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

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
  }, [currentIndex, isAutoPlaying, testimonials.length]);

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  const totalSlides = testimonials.length > 2 ? testimonials.length - 2 : testimonials.length;

  return (
    <div className="py-16 flex justify-center">
      <div className="w-full max-w-6xl md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
          <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full"></div>
        </div>

        <div
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white border rounded-full shadow p-2 hover:bg-orange-100 transition hidden md:block"
            aria-label="Previous"
            style={{ left: '-2.5rem' }}
          >
            <ChevronLeft className="w-6 h-6 text-orange-500" />
          </button>

          {/* Testimonials Grid */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="lg:w-1/3 w-80 flex-shrink-0 px-3">
                  <div className="bg-white rounded-xl px-4 py-6 h-full border hover:shadow-3xl transition-shadow duration-300 flex flex-col">
                    {/* Stars */}
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-orange-400 fill-current" />
                      ))}
                    </div>
                    {/* Testimonial Text */}
                    <blockquote className="text-gray-700 leading-relaxed mb-6 text-base">
                      "{testimonial.content || testimonial.feedback}"
                    </blockquote>
                    {/* Client Info */}
                    <div className="flex items-center gap-3 mt-auto">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-14 h-14 rounded-full object-cover border-2 border-orange-100"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-900 text-base md:text-lg lg:text-lg">
                          {testimonial.name}
                        </h4>
                        <p className="text-orange-600 text-base font-medium">
                          {testimonial.position || testimonial.projectName}
                        </p>
                        <p className="text-gray-500 text-xs">
                          {testimonial.company || testimonial.companyName}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white border rounded-full shadow p-2 hover:bg-orange-100 transition hidden md:block"
            aria-label="Next"
            style={{ right: '-2.5rem' }}
          >
            <ChevronRight className="w-6 h-6 text-orange-500" />
          </button>

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
