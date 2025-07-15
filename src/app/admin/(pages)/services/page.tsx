import React from 'react'

import Services from '../../components/ServicesComponent'
import connectDB from '@/lib/util'
import Service from '../../model/service'
async function page() {
  await connectDB();
  const services= await Service.find({}).sort({ createdAt: -1 }).lean();

  return (
    <div>
       
      <Services services={services}/>
       
      
    </div>
  )
}

export default page