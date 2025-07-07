import React from 'react'
import PreviousProjects from '../components/Portfolio/AllProjects'
import ServicesComponent from '../components/Landing/Service'
import OurMagicalProcess from '../components/Portfolio/OurMagicalProcess'
import CallToAction from '../components/Portfolio/CallToAction'
import WhyChooseUs from '../components/Landing/WhyChooseUs'

function page() {
  return (
    <div>
        <PreviousProjects/>
        
        <WhyChooseUs/>
        <ServicesComponent/>
    </div>
  )
}

export default page