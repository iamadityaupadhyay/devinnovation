"use client"
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
// Sample project data - replace with your actual data
const sampleProjects = [
  {
    _id: "3",
    title: "E-commerce Mobile App",
    name: "ShopFresh",
    shortDescription: "Fresh vegetables and grocery delivery app with intuitive UI",
    image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=600&q=80",
    link: "https://example.com"
  },
  
  {
    _id: "4",
    title: "Real Estate Platform",
    name: "PropertyHub",
    shortDescription: "Find and browse properties with advanced search features",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=600&q=80",
    link: "https://example.com"
  },
  {
    _id: "5",
    title: "Social Media App",
    name: "SocialConnect",
    shortDescription: "Connect with friends and share moments instantly",
    image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=600&q=80",
    link: "https://example.com"
  },
  {
    _id: "6",
    title: "Food Delivery",
    name: "FoodExpress",
    shortDescription: "Order your favorite meals with fast delivery",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=600&q=80",
    link: "https://example.com"
  }
];

function MobileCarouselProjects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const carouselRef = useRef(null);
  const projects = sampleProjects; // Replace with your actual projects data



  const fetchProjects = async ()=>{
    const response = await fetch('/admin/api/getProjects');
    const data = await response.json();
    if (data.success) {
      sampleProjects.unshift(...data.projects);
    } else {
      console.error("Failed to fetch projects");
      return [];
    }
  }
  useEffect(() => {
    fetchProjects();
  }, []);


  



  useEffect(() => {
    setIsVisible(true);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === projects.length - 1 ? 0 : prevIndex + 1
    );
  };
  setTimeout(
    ()=>{
      goToSlide(currentIndex + 1 >= projects.length ? 0 : currentIndex + 1);  
    },5000
  )
  

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? projects.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Touch/Mouse drag handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    
    if (walk > 50) {
      prevSlide();
      setIsDragging(false);
    } else if (walk < -50) {
      nextSlide();
      setIsDragging(false);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch handlers
  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (!startX) return;
    
    const currentX = e.touches[0].clientX;
    const diff = startX - currentX;
    
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
      setStartX(0);
    }
  };

  const getItemStyle = (index) => {
    const diff = index - currentIndex;
    const isCenter = diff === 0;
    const isLeft = diff === -1 || (currentIndex === 0 && index === projects.length - 1);
    const isRight = diff === 1 || (currentIndex === projects.length - 1 && index === 0);
    
    let transform = '';
    let scale = 0.7;
    let zIndex = 1;
    let opacity = 0.5;
    
    if (isCenter) {
      transform = 'translateX(0%)';
      scale = 1;
      zIndex = 3;
      opacity = 1;
    } else if (isLeft) {
      transform = 'translateX(-100%)';
      scale = 0.8;
      zIndex = 2;
      opacity = 1;
    } else if (isRight) {
      transform = 'translateX(100%)';
      scale = 0.8;
      zIndex = 2;
      opacity = 1;
    } else {
      transform = diff < 0 ? 'translateX(-150%)' : 'translateX(150%)';
      scale = 0.6;
      zIndex = 1;
      opacity = 0;
    }
    
    return {
      transform: `${transform} scale(${scale})`,
      zIndex,
      opacity,
      transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
    };
  };

  return (
    <div className="relative  py-10 px-4 overflow-hidden">
      
      
      <div className="max-w-7xl mx-auto pb-10 relative">
        {/* Header */}
        <div className="text-center ">
          <h2 className="text-3xl font-black text-gray-800 mb-2">
            Our Leading 
            <span className="ml-2 bg-gradient-to-r from-orange-400 to-red-500 text-transparent bg-clip-text">
              Innovation
            </span>
          </h2>
          <p className="text-gray-600 text-base max-w-2xl mx-auto">
            Explore our diverse portfolio of projects that showcase our expertise and innovation.
          </p>
        </div>

        {/* Carousel Container */}
        
        <div 
          ref={carouselRef}
          className=" bg-gradient-to-r  from-orange-500 via-orange-600 to-orange-700 h-[400px] w-[360px]  md:w-[580px] md:h-[580px] rounded-full max-w-4xl mx-auto mt-20 flex items-center justify-center cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          

          {/* Phone Frames */}
          {projects.map((project, index) => (
            <div
              key={project._id}
              className="absolute"
              style={getItemStyle(index)}
              onClick={() => goToSlide(index)}
            >
              {/* Phone Frame */}
              <div className="relative">
                {/* Phone Shadow */}
                <div className="absolute inset-0 bg-black/20 rounded-[2.5rem] blur-lg transform translate-y-2"></div>
                
                {/* Phone Body */}
                <div className="relative bg-black rounded-[2.5rem] md:p-2 p-1 md:w-64 w-48 h-[400px] md:h-[460px]">
                  {/* Screen */}
                  <div className="bg-white rounded-[2rem] h-full relative overflow-hidden">
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-4 bg-black rounded-b-xl z-10"></div>
                    
                    {/* Project Image */}
                    <img
                      src={project.image || project.image1}
                      alt={project.title}
                      className="w-full h-full object-center"
                    />
                    
                    
                  </div>
                  
                  {/* Home Indicator */}
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        

        {/* Project Details */}
        <div className="mt-12 text-center">
          <h3 className="text-xl font-bold text-gray-800 mb-1">
            {projects[currentIndex].name}
          </h3>
          <p className="text-gray-600  max-w-2xl mx-auto">
            {projects[currentIndex].shortDescription}
          </p>
          
          
        </div>

        {/* More Projects Link */}
        <div className="text-center mt-7">
          <Link href="/projects" className="border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 text-lg">
            View All Projects
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MobileCarouselProjects;