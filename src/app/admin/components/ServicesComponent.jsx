
"use client"
import React, { useState } from 'react';
import Link from 'next/link';

import { deleteService, bulkDeleteServices } from '../(pages)/services/actions';

export default function Services({ services }) {
  const [selectedServices, setSelectedServices] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);

  const totalServices = services.length;
  const categories = [...new Set(services.map(service => service.category))].length;

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedServices(services.map(service => service._id.toString()));
    } else {
      setSelectedServices([]);
    }
  };

  const handleSelectService = (serviceId) => {
    setSelectedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleBulkDelete = async () => {
    if (selectedServices.length === 0) {
      alert('Please select services to delete');
      return;
    }

    if (!confirm(`Are you sure you want to delete ${selectedServices.length} service(s)?`)) {
      return;
    }

    setIsDeleting(true);
    try {
      const formData = new FormData();
      selectedServices.forEach(id => formData.append('serviceIds', id));
      await bulkDeleteServices(formData);
      setSelectedServices([]);
      // Refresh the page or update the state
      window.location.reload();
    } catch (error) {
      console.error('Error deleting services:', error);
      alert('Error deleting services');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSingleDelete = async (serviceId, serviceName) => {
    if (!confirm(`Are you sure you want to delete "${serviceName}"?`)) {
      return;
    }

    try {
      const formData = new FormData();
      formData.append('serviceId', serviceId);
      await deleteService(formData);
      // Refresh the page or update the state
      window.location.reload();
    } catch (error) {
      console.error('Error deleting service:', error);
      alert('Error deleting service');
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* Stats Section */}
      <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700">Total Services</h3>
          <p className="text-xl font-bold text-orange-500">{totalServices}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700">Categories</h3>
          <p className="text-xl font-bold text-orange-500">{categories}</p>
        </div>
      </div>

      {/* Services Table */}
      <div className="bg-white rounded-lg shadow border border-gray-200">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Services Management</h2>
          <div className="flex gap-2">
            <button
              onClick={handleBulkDelete}
              disabled={selectedServices.length === 0 || isDeleting}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isDeleting ? 'Deleting...' : `Delete Selected (${selectedServices.length})`}
            </button>
            <Link
              href="/admin/services/add-service"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Add New Service
            </Link>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-4">
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={selectedServices.length === services.length && services.length > 0}
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
                      checked={selectedServices.includes(service._id.toString())}
                      onChange={() => handleSelectService(service._id.toString())}
                      className="h-4 w-4 text-blue-600 rounded"
                    />
                  </td>
                  <td className="p-4 text-gray-700">{service.name}</td>
                  <td className="p-4 text-gray-700">{service.category}</td>
                  <td className="p-4 text-gray-700">
                    <ul className="list-disc list-inside text-sm">
                      {service.bulletPoints.map((point, idx) => (
                        <li key={idx}>{point}</li>
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
                      className="p-2  text-white rounded hover:bg-blue-600"
                      title="Edit"
                    >
                      ✏️
                    </Link>
                    <button
                      onClick={() => handleSingleDelete(service._id.toString(), service.name)}
                      className="p-2 text-white rounded hover:bg-red-600"
                      title="Delete"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}