import React from 'react'
import TeamShowcase from './Team'
import ServicesComponent from '../components/Landing/Service'
import WhyChooseUs from '../components/Landing/OurFeatures'
import ClassyFeaturesSection from '../components/Landing/OurFeatures'

function page() {
  return (
    <div>
      <TeamShowcase/>
      
      <ClassyFeaturesSection/>
    </div>
  )
}

export default page