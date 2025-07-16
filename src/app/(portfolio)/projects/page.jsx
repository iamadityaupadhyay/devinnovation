
import PreviousProjects from '../components/Portfolio/AllProjects'
import ServicesComponent from '../components/Landing/Service'
import OurMagicalProcess from '../components/Portfolio/OurMagicalProcess'
import CallToAction from '../components/Portfolio/CallToAction'


function page() {
  return (
    <div>
       <PreviousProjects/>
        
        <OurMagicalProcess/>
       <CallToAction/>
        <ServicesComponent/>
    </div>
  )
}

export default page