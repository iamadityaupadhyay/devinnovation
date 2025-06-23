
import HeroSection from "@/app/(portfolio)/components/Landing/HeroSection"
import { OurServices } from "./components/Landing/OurServices"
import Service from "./components/Landing/Service"
import PastExperiences from "./components/Landing/PastExperiences"
import DevelopmentLifecycle from "./components/Landing/DevelopmentLifecycle"
import WhyChooseUs from "./components/Landing/WhyChooseUs"


export default async function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <OurServices />
      <PastExperiences/>
      <DevelopmentLifecycle/>
      <WhyChooseUs/>
      <Service/>
      
    </main>
  )
}