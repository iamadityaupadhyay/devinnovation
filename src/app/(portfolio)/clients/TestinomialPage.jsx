"use client";
import React, { useState } from "react";
import { ArrowRight, Star } from "lucide-react";

const TestimonialPage = ({ testimonials }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const testimonialsPerPage = 10; // Number of testimonials per page

  // Calculate the total number of pages
  const totalPages = Math.ceil(testimonials.length / testimonialsPerPage);

  // Get the testimonials for the current page
  const startIndex = (currentPage - 1) * testimonialsPerPage;
  const currentTestimonials = testimonials.slice(startIndex, startIndex + testimonialsPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="relative bg-gradient-to-r rounded-sm from-gray-50 to-gray-50  py-16 mx-auto px-2 md:px-8">
      {/* Background Image */}
      <div
        className="h-[24vh] lg:h-[24vh] absolute inset-0 px-2 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1549923746-c502d488b3ea?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
        }}
      >
        <div className="absolute inset-0 bg-black/80"></div>
      </div>

      {/* Content */}
      <div className=" mx-auto max-w-full relative z-10">
        <div className="text-center mb-0">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
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

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 gap-2 md:grid-cols-3 lg:grid-cols-3 ">
          {currentTestimonials.map((testimonial) => (
            <div key={testimonial.id} className="  ">
              <div className="bg-gray-50   shadow-lg px-2 py-4 h-full border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <div className=" md:grid-cols-3 ">
                  {/* Profile Image */}
                  <div className="flex flex-col gap-4 px-0 ">
                      <div className="bg-gradient-to-r px-0 from-orange-100 rounded-lg to-red-100 py-3">
                      <h4 className="font-semibold text-gray-700  text-center text-lg ">
                        {testimonial.name}
                      </h4>
                      <p className="text-orange-600 text-center text-base">
                        {testimonial.projectName}
                      </p>
                      
                    </div>
                  <div className="flex items-center justify-center">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className=" h-56 lg:w-56 w-56 rounded-full object-cover border-4 border-orange-200 shadow-md"
                    />
                    
                  </div>
                  {/* Client Info */}
                    
                  {/* Client Info */}

                  </div>
                  {/* Feedback and Stars */}
                  <div className="mt-3 md:col-span-2">
                    {/* Stars */}
                    <div className="flex mb-4 items-center justify-center">
                      {[1, 2, 3, 4, 5].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-orange-400  fill-current" />
                      ))}
                    </div>

                    {/* Testimonial Text */}
                    <blockquote className="text-gray-700 leading-relaxed px-4 mb-4 text-base">
                      "{testimonial.feedback}"
                    </blockquote>

                    
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center mt-8 space-x-4">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md text-white font-medium ${
              currentPage === 1 ? "bg-gray-300 hidden cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600"
            }`}
            aria-label="Previous page"
          >
            Previous
          </button>

          <div className="flex space-x-2">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => goToPage(index + 1)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index + 1 === currentPage ? "bg-orange-500 w-8" : "bg-orange-200 hover:bg-orange-300"
                }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-3 py-1.5 rounded-md text-white font-medium ${
              currentPage === totalPages ? "bg-orange-300 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600"
            }`}
            aria-label="Next page"
          >
           
          
            <ArrowRight className="inline w-5 h-5 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestimonialPage;