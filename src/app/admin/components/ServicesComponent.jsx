import React from 'react';
import Link from 'next/link';
import { revalidatePath } from 'next/cache';

import connectDB from '@/lib/util';
import Service from '@/app/admin/model/service';

// Server Actions
async function deleteService(formData) {
  'use server';
  const serviceId = formData.get('serviceId');
  try {
    await connectDB();
    await Service.findByIdAndDelete(serviceId);
    revalidatePath('/admin/services');
    return { success: true };
  } catch (error) {
    console.error('Error deleting service:', error);
    return { success: false, error: 'Failed to delete service' };
  }
}

async function bulkDeleteServices(formData) {
  'use server';
  const serviceIds = formData.getAll('serviceIds');
  try {
    await connectDB();
    await Service.deleteMany({ _id: { $in: serviceIds } });
    revalidatePath('/admin/services');
    return { success: true };
  } catch (error) {
    console.error('Error bulk deleting services:', error);
    return { success: false, error: 'Failed to bulk delete services' };
  }
}

async function updateService(formData) {
  'use server';
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
      image,
    });
    revalidatePath('/admin/services');
    return { success: true, redirect: '/admin/services' };
  } catch (error) {
    console.error('Error updating service:', error);
    return { success: false, error: 'Failed to update service' };
  }
}

export default async function Services() {
  await connectDB();
  const services = await Service.find().sort({ createdAt: -1 });

  // Calculate stats
  const totalServices = services.length;
  const categories = [...new Set(services.map(service => service.category))].length;

  return (
    <div className="container mx-auto p-4">
      {/* Stats Section */}
      <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700">Total Services</h3>
          <p className="text-2xl font-bold text-orange-500">{totalServices}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700">Categories</h3>
          <p className="text-2xl font-bold text-orange-500">{categories}</p>
        </div>
      </div>

      {/* Services Table */}
      <div className="bg-white rounded-lg shadow border border-gray-200">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Services Management</h2>
          <Link
            href="/admin/services/add-service"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add New Service
          </Link>
        </div>

        <form action={async (formData) => {
          'use server';
          const result = await bulkDeleteServices(formData);
          if (!result.success) {
            // Note: In a real app, you'd want to handle this error in the UI
            console.error(result.error);
          }
        }}>
          <div className="p-4 border-b border-gray-200">
            <button
              type="submit"
              className="px-4 py-2 bg-red-300 text-white rounded hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={!services.length}
            >
              Delete Selected
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-4">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 rounded"
                      
                    />
                  </th>
                  <th className="p-4 text-gray-600 font-semibold">Name</th>
                  <th className="p-4 text-gray-600 font-semibold">Category</th>
                  <th className="p-4 text-gray-600 font-semibold">Features</th>
                  <th className="p-4 text-gray-600 font-semibold">Image</th>
                  <th className="p-4 text-gray-600 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service) => (
                  <tr key={service._id.toString()} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="p-4">
                      <input
                        type="checkbox"
                        name="serviceIds"
                        value={service._id.toString()}
                        className="h-4 w-4 text-blue-600 rounded"
                      />
                    </td>
                    <td className="p-4 text-gray-700">{service.name}</td>
                    <td className="p-4 text-gray-700">{service.category}</td>
                    <td className="p-4 text-gray-700">
                      <ul className="list-disc list-inside">
                        {service.bulletPoints.map((point, idx) => (
                          <li key={idx} className="text-sm">{point}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="p-4">
                      <img
                        src={service.image}
                        alt={service.name}
                        className="w-16 h-16 object-cover rounded"
                        
                      />
                    </td>
                    <td className="p-4 flex gap-2">
                      <Link
                        href={`/admin/services/edit-service/${service._id}`}
                        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        title="Edit"
                      >
                        ✏️
                      </Link>
                      <form action={async (formData) => {
                        'use server';
                        const result = await deleteService(formData);
                        if (!result.success) {
                          // Note: In a real app, you'd want to handle this error in the UI
                          console.error(result.error);
                        }
                      }}>
                        <input type="hidden" name="serviceId" value={service._id.toString()} />
                        <button
                          type="submit"
                          className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                          title="Delete"
                        >
                          🗑️
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </form>
      </div>
    </div>
  );
}