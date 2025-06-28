import React from 'react'
import Link from 'next/link';
import connectDB from '@/lib/util';
import Service from '@/app/admin/model/service';
async function Services() {
  
  // lets get the data from the database
  
  await connectDB();
  const services = await Service.find().sort({ createdAt: -1 });
  console.log(services);
  return (
    <div>
      <section className="py-10 px-2 bg-gradient-to-r from-yellow-50 to-orange-50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl text-gray-900 font-black mb-2">
             Our Core 
              <span className="ml-2 bg-gradient-to-r from-orange-400 to-red-500 text-transparent bg-clip-text">
               Services
              </span>
            </h2>
            
          </div>

          <div className="grid md:grid-cols-4 gap-8 mb-5">
            {services.map((service, index) => (
              <div 
                key={index}
                className="group relative backdrop-blur-xl rounded-3xl p-5 border border-slate-700/50 hover:border-orange-400/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 bg-white/80"
              >
                
                
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-orange-500 text-xs font-semibold uppercase tracking-wider">
                    {service.category}
                  </span>
                </div>
                
                <div className="text-xl font-black text-gray-700 mb-4 group-hover:text-orange-400 transition-colors ">
                  {service.name}
                </div>
                
                <div className="space-y-2 mb-6">
                  {service.bulletPoints.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                      <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Link href={`/service/${service.name.toLowerCase().replaceAll(" ","-")}`} className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-full text-sm transition-all duration-300 transform hover:scale-105 flex items-center gap-2 group-hover:shadow-lg mb-6 mx-auto">
                  GET STARTED
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                
                <div className="relative overflow-hidden rounded-2xl group-hover:scale-105 transition-transform duration-300">
                  <img 
                    src={service.image}
                    alt={service.name}
                    className="w-full h-32 object-cover"
                    
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            ))}
          </div>

          
        </div>
      </section>
      
    </div>
  );
}

export default Services