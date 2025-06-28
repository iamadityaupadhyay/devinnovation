import React from 'react'

import Link from 'next/link'
import ClientsTable from '../../components/Clients'


function page() {
  return (
    <div>
       <div className=" p-5 ">
            <div className="flex justify-end gap-4">
              <Link 
                href="/admin/clients/add-client"
                className="border-2  border-orange-600 text-orange-600 hover:bg-orange-600  hover:text-white font-semibold px-8 py-2 text-base rounded-xl transition-all duration-300">
                Add New Client
              </Link>
            
            </div>
      </div>
    <ClientsTable/>
       
      
    </div>
  )
}

export default page