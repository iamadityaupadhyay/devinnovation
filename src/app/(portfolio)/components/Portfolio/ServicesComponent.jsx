import React from 'react'
import Link from 'next/link';
import connectDB from '@/lib/util';
import Service from '@/app/admin/model/service';
async function Services() {
  
  // lets get the data from the database
  
  await connectDB();
  const services = await Service.find().sort({ createdAt: -1 });
  
  return (
    <div>
      <section 
        className="relative py-12 "
      >
        <div 
         className="h-[30vh] lg:h-[40vh] absolute inset-0 px-2 bg-cover bg-center" 
         style={{
           backgroundImage: `url('https://images.unsplash.com/photo-1521791136064-7986c2920216?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGFuZCUyMHNoYWtlfGVufDB8fDB8fHww')`
         }}
        >
          <div className="absolute inset-0 bg-black/80"></div>
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center ">
            <h2 className="text-3xl text-white font-black mb-1">
              Our Core 
              <span className="ml-2 bg-gradient-to-r from-orange-400 to-red-500 text-transparent bg-clip-text">
                Services
              </span>
            </h2>
            <p className="text-white/80 text-base">
              We offer a wide range of services to help you achieve your business goals. 
            </p>
          </div>
          <div className="min-h-[150px]"></div> {/* Spacer for half image height */}
          <div className="grid px-2 md:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className="group relative backdrop-blur-xl rounded-base p-5 border border-slate-700/50 hover:border-orange-400/50 transition-all duration-500 transform hover:scale-100 hover:-translate-y-2 bg-white/80"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-orange-500 text-xs font-semibold uppercase tracking-wider">
                    {service.category}
                  </span>
                </div>
                <div className="text-lg font-black text-gray-700 mb-4 group-hover:text-orange-400 transition-colors">
                  {service.name}
                </div>
                <div className="relative overflow-hidden rounded-xl mb-4 group-hover:scale-105 transition-transform duration-300">
                  <img 
                    src={service.image}
                    alt={service.name}
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="space-y-2 mb-6">
                  {service.bulletPoints.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                      <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>
                <Link href={`/service/${service.name.toLowerCase().replaceAll(" ","-")}`} className="bg-transparent hover:bg-orange-600 text-orange-500 hover:text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 group">
                  Get Started
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Services