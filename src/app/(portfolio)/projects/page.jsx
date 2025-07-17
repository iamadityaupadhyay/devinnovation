
import PreviousProjects from '../components/Portfolio/AllProjects'
import ServicesComponent from '../components/Landing/Service'
import OurMagicalProcess from '../components/Portfolio/OurMagicalProcess'
import CallToAction from '../components/Portfolio/CallToAction'
import ClassyFeaturesSection from '../components/Landing/OurFeatures'


function page() {
  return (
    <div>
       <PreviousProjects/>
        
        <ClassyFeaturesSection/>
        <ServicesComponent/>
    </div>
  )
}

export default page