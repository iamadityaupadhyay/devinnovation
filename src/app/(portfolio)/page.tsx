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

// Simple fade-in animation using CSS classes
// Add this CSS to your global stylesheet or module:
// .fade-in { opacity: 0; animation: fadeIn 0.8s forwards; }
// @keyframes fadeIn { to { opacity: 1; } }

export default async function Home() {
  await connectDB()
  const clients = JSON.parse(JSON.stringify(await Client.find().lean().sort({ createdAt: -1 })));


  return (
    <main className="min-h-screen">
      <div className="fade-in">
        <HeroSection />
      </div>
      <div className="fade-in">
        <CommerceAppsShowcase />
      </div>
      <div className="fade-in">
        <PreviousProjects />
      </div>
      <div className="fade-in">
        <OurServices />
      </div>
      <div className="fade-in">
        <TestimonialCarousel clients={clients}/>
      </div>
      <div className="fade-in">
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
