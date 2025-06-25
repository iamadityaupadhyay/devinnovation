"use client";

import React, { useState, useEffect } from "react";
import IndustryLeading from "../Landing/IndustryLeading";
import OurMagicalProcess from "./OurMagicalProcess";
import HeroSection from "./HeroSection";
import CallToAction from "./CallToAction";
import PreviousProjects from "./Projects";

const Portfolio = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveSection(prev => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);


  

  return (
    <div className="bg-gradient-to-br from-orange-50 via-yellow-100 to-orange-50 min-h-screen text-white overflow-hidden">
      {/* Animated Background */}
      

      {/* Hero Section */}
      <HeroSection/>

      {/* Services Showcase */}
      <IndustryLeading/>
     
      

      <PreviousProjects/>
 <OurMagicalProcess/>
      {/* CTA Section */}
     <CallToAction/>

      
    </div>
  );
};

export default Portfolio;