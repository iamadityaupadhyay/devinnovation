
import HeroSection from "@/app/(portfolio)/components/Landing/HeroSection"
import { OurServices } from "./components/Landing/OurServices"
import Service from "./components/Landing/Service"
import PastExperiences from "./components/Landing/PastExperiences"
import DevelopmentLifecycle from "./components/Landing/DevelopmentLifecycle"
import WhyChooseUs from "./components/Landing/WhyChooseUs"
import WhyChooseUsSection from "./components/Landing/Whychooseuss"
import FAQComponent from "./components/Landing/FAQ"
import RequestQuoteModal from "./components/Forms/RequestQuote"



export default async function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <OurServices />
      <PastExperiences/>
      <DevelopmentLifecycle/>
      <WhyChooseUs/>
      <WhyChooseUsSection/>
 <FAQComponent/>
     
 {/* <WebCrumbsComponent/> */}









      <Service/>
      
    </main>
  )
}