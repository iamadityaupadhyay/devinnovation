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

// Edit Form Component
function EditForm({ service, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-bold mb-4">Edit Service</h3>
        <form action={updateService}>
          <input type="hidden" name="serviceId" value={service._id} />
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              name="name"
              defaultValue={service.name}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Category</label>
            <input
              type="text"
              name="category"
              defaultValue={service.category}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Bullet Points (one per line)</label>
            <textarea
              name="bulletPoints"
              defaultValue={service.bulletPoints.join('\n')}
              className="w-full p-2 border rounded-lg h-24"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Image URL</label>
            <input
              type="url"
              name="image"
              defaultValue={service.image}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          
          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600"
            >
              Update
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

async function Services() {
  
  // lets get the data from the database
  await connectDB();
  const services = await Service.find().sort({ createdAt: -1 });
  console.log(services);
  
  return (
    <div>
      <section className=" px-2  backdrop-blur-xl">
        <div className="max-w-7xl mx-auto">
         

          <div className="grid md:grid-cols-3 gap-8 mb-5">
            {services.map((service, index) => (
              <div 
                key={index}
                className="group relative backdrop-blur-xl rounded-3xl p-5 border border-slate-700/50 hover:border-orange-400/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 bg-white/80"
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