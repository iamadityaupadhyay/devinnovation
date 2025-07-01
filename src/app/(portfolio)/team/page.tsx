import React from 'react'
import TeamShowcase from '../components/Portfolio/Team'
import ServicesComponent from '../components/Landing/Service'
import OurMagicalProcess from '../components/Portfolio/OurMagicalProcess'
import WhyChooseUs from '../service/Whychooseuss'

function page() {
  return (
    <div>
      <TeamShowcase/>
      <OurMagicalProcess/>
      <WhyChooseUs/>
      <ServicesComponent/>
    </div>
  )
}

export default page