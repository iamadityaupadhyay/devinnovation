



"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
const ClientForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    projectName: '',
    joiningDate: '',
    numberOfProjects: 0,
    status: 'pending'
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name || formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters long';
    }
    if (!formData.address) {
      newErrors.address = 'Address is required';
    }
    if (!formData.phone || !/^\+?\d{7,15}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be 7-15 digits';
    }
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email address';
    }
    if (!formData.projectName) {
      newErrors.projectName = 'Project name is required';
    }
    if (!formData.joiningDate) {
      newErrors.joiningDate = 'Joining date is required';
    }
    if (formData.numberOfProjects < 0) {
      newErrors.numberOfProjects = 'Number of projects cannot be negative';
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error('Please fix the form errors');
      return;
    }

    setSubmitting(true);
    const loadingToast = toast.loading('Submitting client data...');

    try {

    
     const response = await axios.post('/admin/api/addClient', formData);
    //   console.log('Client data submitted successfully');
     if(response.data.success){
      toast.success('Client data submitted successfully', { id: loadingToast });
      router.push('/admin/clients');
     }
      toast.success('Client data submitted successfully', { id: loadingToast });

      setFormData({
        name: '',
        address: '',
        phone: '',
        email: '',
        projectName: '',
        joiningDate: '',
        numberOfProjects: 0,
        status: 'pending'
      });
     
    } catch (error) {
      toast.error('Failed to submit client data', { id: loadingToast });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      {/* <Toaster position="top-right" /> */}
      <h1 className="text-2xl font-bold mb-6">Add New Client</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`mt-1 block w-full border rounded px-3 py-2 ${errors.name ? 'border-red-500' : ''}`}
            maxLength="100"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            className={`mt-1 block w-full border rounded px-3 py-2 ${errors.address ? 'border-red-500' : ''}`}
            rows="3"
            maxLength="500"
          />
          {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`mt-1 block w-full border rounded px-3 py-2 ${errors.phone ? 'border-red-500' : ''}`}
            placeholder="+1234567890"
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`mt-1 block w-full border rounded px-3 py-2 ${errors.email ? 'border-red-500' : ''}`}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Project Name</label>
          <input
            type="text"
            name="projectName"
            value={formData.projectName}
            onChange={handleChange}
            className={`mt-1 block w-full border rounded px-3 py-2 ${errors.projectName ? 'border-red-500' : ''}`}
            maxLength="200"
          />
          {errors.projectName && <p className="text-red-500 text-sm mt-1">{errors.projectName}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Joining Date</label>
          <input
            type="date"
            name="joiningDate"
            value={formData.joiningDate}
            onChange={handleChange}
            className={`mt-1 block w-full border rounded px-3 py-2 ${errors.joiningDate ? 'border-red-500' : ''}`}
          />
          {errors.joiningDate && <p className="text-red-500 text-sm mt-1">{errors.joiningDate}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Number of Projects</label>
          <input
            type="number"
            name="numberOfProjects"
            value={formData.numberOfProjects}
            onChange={handleChange}
            className={`mt-1 block w-full border rounded px-3 py-2 ${errors.numberOfProjects ? 'border-red-500' : ''}`}
            min="0"
          />
          {errors.numberOfProjects && <p className="text-red-500 text-sm mt-1">{errors.numberOfProjects}</p>}
        </div>

        <div>
          <label class cliché="block text-sm font-medium text-gray-700">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-1 block w-full border rounded px-3 py-2"
          >
            <option value="pending">Pending</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={submitting}
            className={`px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {submitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ClientForm;