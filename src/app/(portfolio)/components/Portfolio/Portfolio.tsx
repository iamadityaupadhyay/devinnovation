
import React from "react";
import HeroSection from "./HeroSection";
import PreviousProjects from "./OurProjects";
import CommerceAppsShowcase from "../Landing/CommerceAppShowcase";
import TeamShowcase from "./Team";
import ClassyFeaturesSection from "../Landing/OurFeatures";

const Portfolio = () => {
  


  

  return (
    <div className="bg-gradient-to-br from-white  to-gray-50 min-h-screen text-white overflow-hidden">
      {/* Animated Background */}
      

      {/* Hero Section */}
      <HeroSection/>

      <CommerceAppsShowcase/>
     
      

      <PreviousProjects/>
 {/* <OurMagicalProcess/> */}
      {/* CTA Section */}
     <ClassyFeaturesSection/>
     <TeamShowcase/>

      
    </div>
  );
};

export default Portfolio;