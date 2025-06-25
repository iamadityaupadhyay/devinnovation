// In your page.js file
import HeroSection from "@/app/(portfolio)/components/Landing/HeroSection"
import { OurServices } from "./components/Landing/OurServices"
import Service from "./components/Landing/Service"
import PastExperiences from "./components/Landing/PastExperiences"
import DevelopmentLifecycle from "./components/Landing/DevelopmentLifecycle"
import WhyChooseUs from "./components/Landing/WhyChooseUs"
import WhyChooseUsSection from "./components/Landing/Whychooseuss"
import FAQComponent from "./components/Landing/FAQ"
import IndustryLeading from "./components/Landing/IndustryLeading"
import QueryPopup from "./components/Forms/QueryPopup"// Add this line

export default async function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <OurServices />
      <IndustryLeading/>
      <PastExperiences/>
      <DevelopmentLifecycle/>
      <WhyChooseUs/>
      <WhyChooseUsSection/>
      <FAQComponent/>
      <Service/>
      <QueryPopup /> {/* Add this component */}
    </main>
  )
}