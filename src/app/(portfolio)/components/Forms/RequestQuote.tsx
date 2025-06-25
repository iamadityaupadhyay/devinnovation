"use client"
import React, { useState, useEffect } from 'react';
import { X, User, Mail, Phone, DollarSign, FileText } from 'lucide-react';
import axios from "axios"

const RequestQuoteModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    countryCode: '+1',
    mobile: '',
    budget: '',
    projectInfo: '',
  });

  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    mobile: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const countryCodes = [
    { code: '+1', country: 'US/CA' },
    { code: '+44', country: 'UK' },
    { code: '+91', country: 'India' },
    { code: '+86', country: 'China' },
    { code: '+49', country: 'Germany' },
    { code: '+33', country: 'France' },
    { code: '+81', country: 'Japan' },
    { code: '+61', country: 'Australia' }
  ];

  const budgetOptions = [
    'Under $5,000',
    '$5,000 - $10,000',
    '$10,000 - $25,000',
    '$25,000 - $50,000',
    '$50,000 - $100,000',
    'Above $100,000'
  ];

  const validateForm = () => {
    const newErrors = {
      fullName: '',
      email: '',
      mobile: '',
    };
    let isValid = true;

    // Full Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
      isValid = false;
    } else if (formData.fullName.length < 2) {
      newErrors.fullName = 'Full Name must be at least 2 characters';
      isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    // Mobile validation
    const mobileRegex = /^\d{7,15}$/;
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
      isValid = false;
    } else if (!mobileRegex.test(formData.mobile)) {
      newErrors.mobile = 'Mobile number must be 7-15 digits';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    setErrors(prev => ({
      ...prev,
      [name]: ''
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await axios.post("/apis/quoteSubmit", formData);
      console.log(response);
      alert('Quote request submitted successfully!');
      onClose();
    } catch (error) {
      console.error('Submission error:', error);
      alert('Failed to submit quote request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="flex items-center justify-center min-h-screen p-4">
        {/* Modal Content */}
        <div 
          className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transform transition-all"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 rounded-t-2xl relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors duration-200"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-xl font-bold text-white text-center">Request a Quote</h2>
            <p className="text-orange-100 text-sm text-center mt-2">
              Fill out the form below with your details to start a conversation with our expert
            </p>
          </div>

          {/* Form */}
          <div className="p-6 space-y-6">
            {/* Full Name and Email Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Full Name*
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500 w-5 h-5" />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Full Name"
                    required
                    className={`w-full pl-10 pr-4 py-3 border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 outline-none`}
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Email*
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500 w-5 h-5" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                    required
                    className={`w-full pl-10 pr-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 outline-none`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Country Code and Mobile Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Country Code*
                </label>
                <select
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 outline-none"
                  required
                >
                  {countryCodes.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.code} ({country.country})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Mobile No.*
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500 w-5 h-5" />
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    placeholder="Mobile No."
                    required
                    className={`w-full pl-10 pr-4 py-3 border ${errors.mobile ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 outline-none`}
                  />
                  {errors.mobile && (
                    <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Budget */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Budget (can be discussed later)
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500 w-5 h-5" />
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 outline-none appearance-none"
                >
                  <option value="">Select Budget</option>
                  {budgetOptions.map((budget) => (
                    <option key={budget} value={budget}>
                      {budget}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Project Information */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Project Information
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 text-orange-500 w-5 h-5" />
                <textarea
                  name="projectInfo"
                  value={formData.projectInfo}
                  onChange={handleInputChange}
                  placeholder="Project Information"
                  rows={4}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 outline-none resize-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`bg-gradient-to-r from-orange-500 to-red-500 text-white px-12 py-3 rounded-lg font-semibold transform transition-all duration-300 shadow-lg hover:shadow-xl ${
                  isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:from-orange-600 hover:to-red-600 hover:scale-105'
                }`}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestQuoteModal;