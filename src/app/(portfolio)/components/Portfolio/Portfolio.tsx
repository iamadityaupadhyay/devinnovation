"use client";

import React, { useState, useEffect } from "react";
import IndustryLeading from "../Landing/IndustryLeading";
import OurMagicalProcess from "./OurMagicalProcess";
import HeroSection from "./HeroSection";
import CallToAction from "./CallToAction";
import PreviousProjects from "./OurProjects";
import CommerceAppsShowcase from "../Landing/CommerceAppShowcase";
import TeamShowcase from "./Team";

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
    <div className="bg-gradient-to-br from-white  to-gray-50 min-h-screen text-white overflow-hidden">
      {/* Animated Background */}
      

      {/* Hero Section */}
      <HeroSection/>

      <CommerceAppsShowcase/>
     
      

      <PreviousProjects/>
 {/* <OurMagicalProcess/> */}
      {/* CTA Section */}
     <CallToAction/>
     <TeamShowcase/>

      
    </div>
  );
};

export default Portfolio;