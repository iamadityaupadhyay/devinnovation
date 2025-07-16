import React from 'react'
import TeamShowcase from './Team'
import ServicesComponent from '../components/Landing/Service'
import WhyChooseUs from '../service/Whychooseuss'

function page() {
  return (
    <div>
      <TeamShowcase/>
      
      <WhyChooseUs/>
      <ServicesComponent/>
    </div>
  )
}

export default page