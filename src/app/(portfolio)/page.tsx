import HeroSection from "@/app/(portfolio)/components/Landing/HeroSection";
import { OurServices } from "./components/Landing/OurServices";
import Service from "./components/Landing/Service";
import DevelopmentLifecycle from "./components/Landing/DevelopmentLifecycle";
import FAQComponent from "./components/Landing/FAQ";
import QueryPopup from "./components/Forms/QueryPopup";
import PreviousProjects from "./components/Portfolio/OurProjects";
import TestimonialCarousel from "./components/Landing/Testimonial";
import CommerceAppsShowcase from "./components/Landing/CommerceAppShowcase";
import ClassyFeaturesSection from "./components/Landing/OurFeatures";
import Client from "../admin/model/client";
import connectDB from "@/lib/util";
import Carousel from "../admin/model/carousel";

// Simple fade-in animation using CSS classes
// Add this CSS to your global stylesheet or module:
// .fade-in { opacity: 0; animation: fadeIn 0.8s forwards; }
// @keyframes fadeIn { to { opacity: 1; } }
export const dynamic = 'force-dynamic';
export default async function Home() {
  await connectDB()
  const clients = JSON.parse(JSON.stringify(await Client.find().lean().sort({ createdAt: -1 })));
  const carousel = JSON.parse(JSON.stringify(await Carousel.find().lean()));




  return (
    <main className="min-h-screen">
      <HeroSection carousel={carousel} />
      
      <div className="fade-in">
        <CommerceAppsShowcase />
      </div>
      <div className="animate-slide-up">
        <PreviousProjects />
      </div>
      <div className="animate-slide-up">
        <OurServices />
      </div>
      <div className="animate-slide-up">
        <TestimonialCarousel clients={clients}/>
      </div>
      <div className="animate-slide-up">
        <ClassyFeaturesSection />
      </div>
      <div className="fade-in">
        <DevelopmentLifecycle />
      </div>
      <div className="fade-in">
        <FAQComponent />
      </div>
      <div className="fade-in">
        <Service />
      </div>
      <QueryPopup />
    </main>
  );
}
