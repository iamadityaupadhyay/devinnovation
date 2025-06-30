"use client";

import React, { useState, useRef, useTransition } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Image as ImageIcon, Trash2, Save } from 'lucide-react';
import { uploadToCloudinary } from '@/app/admin/lib/cloudinary';

const ClientForm = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    projectName: '',
    joiningDate: '',
    status: 'pending',
    image: '',
    feedback: ''
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [imageMode, setImageMode] = useState('upload');

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
    if (imageMode === 'upload' && !formData.image) {
      newErrors.image = 'Image upload is required';
    } else if (imageMode === 'url' && !formData.image) {
      newErrors.image = 'Image URL is required';
    } else if (imageMode === 'url' && !isValidUrl(formData.image)) {
      newErrors.image = 'Please enter a valid URL';
    }
    return newErrors;
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch {
      return false;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      setErrors((prev) => ({ ...prev, image: 'No file selected' }));
      toast.error('No file selected for upload.');
      return;
    }

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        image: 'Please select a valid image file (JPEG, PNG, GIF, WebP)',
      }));
      toast.error('Please select a valid image file (JPEG, PNG, GIF, WebP).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, image: 'File size must be less than 5MB' }));
      toast.error('File size must be less than 5MB.');
      return;
    }

    try {
      setErrors((prev) => ({ ...prev, image: '' }));
      const result = await uploadToCloudinary(file);
      setFormData((prev) => ({
        ...prev,
        image: result.secure_url,
      }));
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      toast.success('Image uploaded successfully!');
    } catch (error) {
      console.error('Upload error:', error);
      setErrors((prev) => ({ ...prev, image: 'Failed to upload image' }));
      toast.error('Failed to upload image.');
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
      if (response.data.success) {
        toast.success('Client data submitted successfully', { id: loadingToast });
        router.push('/admin/clients');
        setFormData({
          name: '',
          address: '',
          phone: '',
          email: '',
          projectName: '',
          joiningDate: '',
          status: 'pending',
          image: '',
          feedback: ''
        });
        setImageMode('upload');
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    } catch (error) {
      toast.error('Failed to submit client data', { id: loadingToast });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-0 py-8 max-w-6xl">
     
      <h1 className="text-2xl font-bold mb-6">Add New Client</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-sm shadow-lg">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-3 py-2 rounded-xl border ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-orange-400 focus:border-transparent`}
              maxLength="100"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-3 py-2 rounded-xl border ${errors.phone ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-orange-400 focus:border-transparent`}
              placeholder="+1234567890"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email <span className="text-red-500">*</span></label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 rounded-xl border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-orange-400 focus:border-transparent`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Project Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="projectName"
              value={formData.projectName}
              onChange={handleChange}
              className={`w-full px-3 py-2 rounded-xl border ${errors.projectName ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-orange-400 focus:border-transparent`}
              maxLength="200"
            />
            {errors.projectName && <p className="text-red-500 text-sm mt-1">{errors.projectName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Joining Date <span className="text-red-500">*</span></label>
            <input
              type="date"
              name="joiningDate"
              value={formData.joiningDate}
              onChange={handleChange}
              className={`w-full px-3 py-2 rounded-xl border ${errors.joiningDate ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-orange-400 focus:border-transparent`}
            />
            {errors.joiningDate && <p className="text-red-500 text-sm mt-1">{errors.joiningDate}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-400 focus:border-transparent"
            >
              <option value="pending">Pending</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address <span className="text-red-500">*</span></label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={`w-full px-3 py-2 rounded-xl border ${errors.address ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-orange-400 focus:border-transparent`}
              rows="4"
              maxLength="500"
            />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Feedback</label>
            <textarea
              name="feedback"
              value={formData.feedback}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-400 focus:border-transparent"
              rows="4"
              maxLength="1000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Client Image <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-4 mb-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="imageMode"
                  value="upload"
                  checked={imageMode === 'upload'}
                  onChange={() => {
                    setImageMode('upload');
                    setFormData((prev) => ({ ...prev, image: '' }));
                    setErrors((prev) => ({ ...prev, image: '' }));
                  }}
                  className="text-orange-600 focus:ring-orange-600"
                />
                Upload Image
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="imageMode"
                  value="url"
                  checked={imageMode === 'url'}
                  onChange={() => {
                    setImageMode('url');
                    setFormData((prev) => ({ ...prev, image: '' }));
                    setErrors((prev) => ({ ...prev, image: '' }));
                  }}
                  className="text-orange-600 focus:ring-orange-600"
                />
                Enter URL
              </label>
            </div>

            {imageMode === 'upload' ? (
              <>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={submitting}
                  className={`w-full px-4 py-4 border-2 rounded-xl ${
                    errors.image ? 'border-red-500' : 'border-gray-300 hover:border-orange-400'
                  } transition-colors`}
                >
                  {formData.image ? (
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="h-24 mx-auto object-contain"
                    />
                  ) : (
                    <div className="text-center">
                      <ImageIcon className="mx-auto h-10 w-10 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-600">Click to upload an image</p>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF, WebP up to 5MB</p>
                    </div>
                  )}
                </button>
              </>
            ) : (
              <>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 rounded-xl border ${
                    errors.image ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-orange-400 focus:border-transparent`}
                  placeholder="https://example.com/image.jpg"
                />
                {formData.image && (
                  <img
                    src={formData.image}
                    alt="URL Preview"
                    className="h-24 mx-auto object-contain mt-2"
                    onError={() =>
                      setErrors((prev) => ({ ...prev, image: 'Invalid image URL' }))
                    }
                  />
                )}
              </>
            )}
            {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={() => {
                setFormData({
                  name: '',
                  address: '',
                  phone: '',
                  email: '',
                  projectName: '',
                  joiningDate: '',
                  status: 'pending',
                  image: '',
                  feedback: ''
                });
                setImageMode('upload');
                setErrors({});
                if (fileInputRef.current) {
                  fileInputRef.current.value = '';
                }
              }}
              className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Trash2 className="w-4 h-4" />
                Clear
              </div>
            </button>
            <button
              type="submit"
              disabled={submitting || isPending}
              className={`px-4 py-2 bg-orange-600 text-white font-medium rounded-xl hover:bg-orange-700 transition-colors ${
                submitting || isPending ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <div className="flex items-center gap-2">
                {submitting || isPending ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Submit
                  </>
                )}
              </div>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ClientForm;