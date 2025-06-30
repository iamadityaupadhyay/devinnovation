
"use client"
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      position: "Marketing Director",
      company: "TechCorp Solutions",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b789?w=150&h=150&fit=crop&crop=face",
      content: "Working with this team has been absolutely transformative for our business. Their expertise and dedication exceeded all our expectations.",
      rating: 5
    },
    {
      id: 2,
      name: "Michael Chen",
      position: "CEO",
      company: "Innovation Labs",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      content: "The results speak for themselves. Our ROI increased by 300% within the first quarter. Highly recommended for anyone serious about growth.",
      rating: 5
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      position: "Product Manager",
      company: "Digital Dynamics",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      content: "Professional, reliable, and incredibly skilled. They delivered exactly what we needed, on time and within budget. A true partnership.",
      rating: 5
    },
    {
      id: 4,
      name: "David Thompson",
      position: "Founder",
      company: "StartupVenture",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      content: "Their innovative approach and attention to detail set them apart. Our project was completed flawlessly and ahead of schedule.",
      rating: 5
    },
    {
      id: 5,
      name: "Lisa Wang",
      position: "Operations Director",
      company: "Global Tech",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      content: "Outstanding service quality and exceptional results. They transformed our entire workflow and boosted our productivity significantly.",
      rating: 5
    },
    {
      id: 6,
      name: "James Miller",
      position: "CTO",
      company: "Future Systems",
      image: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face",
      content: "Best investment we've made for our company. Their technical expertise and customer service are unmatched in the industry.",
      rating: 5
    }
  ];

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

  const totalSlides = testimonials.length - 2;

  return (
    <div className="max-w-7xl   px-4 py-16">
      <div className="max-w-7xl text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
        <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full"></div>
      </div>

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
                    "{testimonial.content}"
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
                        {testimonial.position}
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
  );
};

export default TestimonialCarousel;