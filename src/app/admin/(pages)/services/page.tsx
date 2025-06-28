import React from 'react'

import Link from 'next/link'
import Services from '../../components/ServicesComponent'

function page() {
  return (
    <div>
       <div className=" p-5 ">
            <div className="flex justify-end gap-4">
              <Link 
                href="/admin/services/add-service"
                className="border-2  border-orange-600 text-orange-600 hover:bg-orange-600  hover:text-white font-semibold px-8 py-2 text-base rounded-xl transition-all duration-300">
                Add New Service
              </Link>
            
            </div>
      </div>
      <Services/>
       
      
    </div>
  )
}

export default page