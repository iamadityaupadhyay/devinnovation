"use client"
import React, { useState } from 'react';

const DevelopmentRoadmap = () => {
  const [activeStep, setActiveStep] = useState(0);

  const phases = [
    {
      number: "01",
      title: "Ideation",
      description: "Brainstorm creative ideas to ideate them and come up with a plan to turn them into a successful smart solution.",
      icon: "💡",
      bgImage: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&h=400&fit=crop&crop=center"
    },
    {
      number: "02", 
      title: "Strategy",
      description: "Define the project goals, create a timeline & milestones, and build a team based on your development requirements.",
      icon: "📋",
      bgImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop&crop=center"
    },
    {
      number: "03",
      title: "Design", 
      description: "Build interactive prototypes based on sketches and wireframes to illustrate and visualize the interface of the solution.",
      icon: "🎨",
      bgImage: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop&crop=center"
    },
    {
      number: "04",
      title: "Development",
      description: "Transform designs into functional applications using cutting-edge technologies and best practices.",
      icon: "⚙️",
      bgImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop&crop=center"
    },
    {
      number: "05",
      title: "Testing",
      description: "Rigorous quality assurance to ensure flawless performance and user experience across all platforms.",
      icon: "🧪",
      bgImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop&crop=center"
    },
    {
      number: "06",
      title: "Launch",
      description: "Deploy your solution with seamless integration and comprehensive support for a successful go-live.",
      icon: "🚀",
      bgImage: "https://images.unsplash.com/photo-1516387938699-a93567ec168e?w=800&h=400&fit=crop&crop=center"
    }
  ];

  return (
    <div className="bg-gradient-to-r  from-white to-gray-50 py-16 px-4 md:px-10">
      <div className="max-w-full mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-gray-900 mb-1">
            Our <span className="text-orange-600">Development Process</span>
          </h2>
          <p className="text-gray-600 ">Providing Tailored Software Development Lifecycle Solutions
         </p>
        </div>

        {/* Desktop View */}
        <div className="hidden h-96 lg:block">
          <div className="relative">
            {/* Connection Line */}
            <div className="absolute top-24 left-10 right-5 h-2 rounded-lg bg-orange-200 z-0"></div>
            <div 
              className="absolute top-24 left-10 h-2 rounded-lg bg-orange-500 z-10 transition-all duration-500"
              style={{ width: `${(activeStep + 1) * (83.33 / phases.length)}%` }}
            ></div>

            <div className="grid grid-cols-6 gap-5 relative z-20">
              {phases.map((phase, index) => (
                <div 
                  key={index}
                  className="text-center cursor-pointer group"
                  onClick={() => setActiveStep(index)}
                >
                  {/* Main Circle Button */}
                  <div className={`relative w-20 h-20 mx-auto rounded-full flex items-center justify-center text-2xl mb-8 transition-all duration-300 overflow-hidden ${
                    index <= activeStep 
                      ? 'bg-orange-700/50 text-white shadow-lg scale-110' 
                      : 'bg-white border-2 border-orange-50 hover:border-orange-400'
                  }`}>
                    {/* Background Image */}
                    <div 
                      className="absolute inset-0 bg-cover bg-center opacity-60"
                      style={{ backgroundImage: `url(${phase.bgImage})` }}
                    ></div>
                    <span className="relative z-10">{phase.icon}</span>
                  </div>

                  {/* Expandable Content Area */}
                  <div className={`relative transition-all ml-5 duration-500 ease-in-out overflow-hidden ${
                    index <= activeStep ? 'max-h-96 opacity-100' : 'max-h-20 opacity-100'
                  }`}>
                    {/* Title and Number */}
                    <h3 className={`font-bold transition-colors mb-1 ${
                      index <= activeStep ? 'text-orange-600' : 'text-gray-700'
                    }`}>
                      {phase.title}
                    </h3>
                    <span className={`text-sm font-medium block mb-3 ${
                      index <= activeStep ? 'text-orange-500' : 'text-gray-400'
                    }`}>
                      {phase.number}
                    </span>

                    {/* Expandable Description */}
                    <div className={`transition-all  duration-500 ease-in-out ${
                      index <= activeStep ? 'max-h-56 opacity-100 transform translate-y-0' : 'max-h-0 opacity-0 transform -translate-y-2'
                    }`}>
                      <div className="relative rounded-lg  overflow-hidden shadow-lg border border-orange-100 bg-white/95 backdrop-blur-sm">
                        <div 
                          className="absolute inset-0 bg-cover bg-center opacity-10"
                          style={{ backgroundImage: `url(${phase.bgImage})` }}
                        ></div>
                        <div className="relative z-10 py-10 px-1">
                          <div className="flex items-center justify-center mb-2">
                            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-sm">
                              {phase.icon}
                            </div>
                          </div>
                          <p className="text-gray-700 text-sm leading-relaxed text-center">
                            {phase.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile View */}
        <div className="lg:hidden  space-y-6">
          {phases.map((phase, index) => (
            <div key={index} className="relative">
              {index < phases.length - 1 && (
                <div className="absolute left-8 top-16 w-0.5 h-16 bg-orange-200"></div>
              )}
              
              <div 
                className={`relative rounded-xl overflow-hidden shadow-sm border-2 cursor-pointer transition-all duration-300 ${
                  index <= activeStep ? 'border-orange-500 shadow-lg' : 'border-orange-100 hover:border-orange-300'
                }`}
                onClick={() => setActiveStep(index)}
              >
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${phase.bgImage})` }}
                ></div>
                {/* Overlay */}
                <div className="absolute inset-0 bg-white bg-opacity-95"></div>
                
                {/* Content */}
                <div className="relative z-10 p-6">
                  <div className="flex items-start gap-4">
                    <div className={`relative w-16 h-16 rounded-full flex items-center justify-center text-xl transition-all duration-300 overflow-hidden flex-shrink-0 ${
                      index <= activeStep 
                        ? 'bg-orange-700 text-white' 
                        : 'bg-orange-100 text-orange-600'
                    }`}>
                      <div 
                        className="absolute inset-0 bg-cover bg-center opacity-60"
                        style={{ backgroundImage: `url(${phase.bgImage})` }}
                      ></div>
                      <span className="relative z-10">{phase.icon}</span>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 ">
                        <h3 className="text-lg font-bold text-gray-900">{phase.title}</h3>
                        <span className="text-orange-500 font-medium text-sm">{phase.number}</span>
                      </div>
                      
                      {/* Mobile Description with smooth animation */}
                      <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
                        index <= activeStep ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'
                      }`}>
                        <p className="text-gray-600 leading-relaxed text-sm pt-2 border-t border-orange-100">
                          {phase.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DevelopmentRoadmap;