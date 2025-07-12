import React from 'react'
import Link from 'next/link';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import connectDB from '@/lib/util';
import Service from '@/app/admin/model/service';

// Server Actions for delete and update
async function deleteService(formData) {
  'use server'
  
  const serviceId = formData.get('serviceId');
  
  try {
    await connectDB();
    await Service.findByIdAndDelete(serviceId);
    revalidatePath('/services'); // Adjust path as needed
  } catch (error) {
    console.error('Error deleting service:', error);
    throw new Error('Failed to delete service');
  }
}

async function updateService(formData) {
  'use server'
  
  const serviceId = formData.get('serviceId');
  const name = formData.get('name');
  const category = formData.get('category');
  const bulletPoints = formData.get('bulletPoints').split('\n').filter(point => point.trim());
  const image = formData.get('image');
  
  try {
    await connectDB();
    await Service.findByIdAndUpdate(serviceId, {
      name,
      category,
      bulletPoints,
      image
    });
    revalidatePath('/services'); // Adjust path as needed
    redirect('/services'); // Redirect after successful update
  } catch (error) {
    console.error('Error updating service:', error);
    throw new Error('Failed to update service');
  }
}


async function Services() {
  
  // lets get the data from the database
  await connectDB();
  const services = await Service.find().sort({ createdAt: -1 });
  
  
  return (
    <div>
      <section className="  backdrop-blur-xl">
        <div className=" mx-auto">
         

          <div className=" gap-8 grid grid-cols-1 md:grid-cols-2  mb-5">
            {services.map((service, index) => (
              <div 
                key={index}
                className="group relative backdrop-blur-xl p-4 rounded-sm mb-3 border border-slate-700/50 hover:border-orange-400/50 transition-all duration-500 transform bg-white/80"
              >
                {/* Admin Controls */}
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <form action={`/admin/services/edit-service/${service._id}`} method="GET" className="inline">
                    <button
                      type="submit"
                      className="p-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs"
                      title="Edit"
                    >
                      ✏️
                    </button>
                  </form>
                  
                  <form action={deleteService} method="POST" className="inline">
                    <input type="hidden" name="serviceId" value={service._id} />
                    <button
                      type="submit"
                      className="p-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
                      title="Delete"
                      
                    >
                      🗑️
                    </button>
                  </form>
                </div>
                
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-orange-500 text-xs font-semibold uppercase tracking-wider">
                    {service.category}
                  </span>
                </div>
                
                <div className="text-lg  text-gray-700 mb-4 group-hover:text-orange-400 transition-colors ">
                  {service.name}
                </div>
                
                <div className="grid md:grid-cols-2  mb-6">
                  {service.bulletPoints.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                      <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>
                
                
                
                <div className="relative overflow-hidden rounded-xl  transition-transform duration-300">
                  <img 
                    src={service.image}
                    alt={service.name}
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0  transition-opacity duration-300"></div>
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