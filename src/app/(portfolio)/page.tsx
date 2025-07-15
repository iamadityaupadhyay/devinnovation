"use client"; // This directive is essential for client-side animations

import { motion } from "framer-motion";
import HeroSection from "@/app/(portfolio)/components/Landing/HeroSection";
import { OurServices } from "./components/Landing/OurServices";
import Service from "./components/Landing/Service";
import PastExperiences from "./components/Landing/PastExperiences";
import DevelopmentLifecycle from "./components/Landing/DevelopmentLifecycle";
import WhyChooseUs from "./components/Landing/WhyChooseUs";
import WhyChooseUsSection from "./components/Landing/Whychooseuss";
import FAQComponent from "./components/Landing/FAQ";
import IndustryLeading from "./components/Landing/IndustryLeading";
import QueryPopup from "./components/Forms/QueryPopup";
import PreviousProjects from "./components/Portfolio/Projects";
import TestimonialCarousel from "./components/Landing/Testimonial";

// Animation variants for slide up effect
const slideUpVariants = {
  hidden: {
    opacity: 0,
    y: 60,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

// Stagger animation for sequential appearance
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      when: "beforeChildren", // This ensures the parent animation starts before children
    },
  },
};

export default function Home() {
  return (
    <motion.main
      className="min-h-screen"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible" // Changed from animate to whileInView for scroll-triggered animations
      viewport={{ once: false }} // Only animate once
    >
      <motion.div variants={slideUpVariants}>
        <HeroSection />
      </motion.div>

      <motion.div variants={slideUpVariants}>
        <OurServices />
      </motion.div>
      <motion.div variants={slideUpVariants}>
        <IndustryLeading />
      </motion.div>
      <motion.div variants={slideUpVariants}>
        <PreviousProjects />
      </motion.div>
      <motion.div variants={slideUpVariants}>
        <TestimonialCarousel />
      </motion.div>

      

      

      <motion.div variants={slideUpVariants}>
        <WhyChooseUs />
      </motion.div>

      <motion.div variants={slideUpVariants}>
        <DevelopmentLifecycle />
      </motion.div>

      

      <motion.div variants={slideUpVariants}>
        <FAQComponent />
      </motion.div>

      <motion.div variants={slideUpVariants}>
        <Service />
      </motion.div>

      <QueryPopup />
    </motion.main>
  );
}