"use client";
import React, { useState, useEffect } from 'react';
import { X, MessageCircle, Send, User, Mail, MessageSquare, Sparkles } from 'lucide-react';
import axios from 'axios';

const QueryPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    queryType: 'general',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Check localStorage to determine if popup should be shown
  useEffect(() => {
    const popupData = localStorage.getItem('hasSeenQueryPopup');
    const currentTime = Date.now();
    const oneDay = 1 * 60 * 60 * 1000; // 24 hours in milliseconds

    if (!popupData) {
      // No popup data, show popup
      showPopup(currentTime);
    } else {
      const { timestamp } = JSON.parse(popupData);
      if (currentTime - timestamp > oneDay) {
        // More than 24 hours have passed, show popup again
        showPopup(currentTime);
      }
    }

    function showPopup(timestamp: number) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        setIsAnimating(true);
        // Store timestamp in localStorage
        localStorage.setItem('hasSeenQueryPopup', JSON.stringify({ timestamp }));
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => setIsVisible(false), 300);
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    

    try {
      const response = await axios.post('/api/querySubmit', formData);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsSubmitted(true);
      // Auto close after success
      setTimeout(() => {
        handleClose();
      }, 3000);
    } catch (error) {
      console.error('Error submitting query:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
        isAnimating ? 'bg-black/50 backdrop-blur-sm' : 'bg-transparent'
      }`}
    >
      {/* Overlay */}
      <div className="absolute inset-0 cursor-pointer" onClick={handleClose} />

      {/* Modal */}
      <div
        className={`
          relative bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto
          transition-all duration-500 ease-out transform
          ${isAnimating ? 'scale-100 opacity-100 translate-y-0' : 'scale-75 opacity-0 translate-y-10'}
        `}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-400/20 rounded-full animate-pulse"></div>
          <div
            className="absolute -bottom-10 -left-10 w-40 h-40 bg-orange-500/10 rounded-full animate-bounce"
            style={{ animationDuration: '3s' }}
          ></div>
        </div>

        {/* Header */}
        <div className="relative bg-gradient-to-r from-orange-500 to-orange-600 p-6 text-white">
          <button
            onClick={handleClose}
            className="absolute right-4 p-2 hover:bg-white/20 rounded-full transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-white/20 rounded-full">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Got a Question?</h2>
              <p className="text-orange-100 text-sm">We'd love to hear from you!</p>
            </div>
          </div>

          {/* Floating sparkles */}
          <div className="absolute top-2 right-16">
            <Sparkles className="w-4 h-4 animate-pulse" />
          </div>
        </div>

        {/* Content */}
        <div className="relative p-6">
          {!isSubmitted ? (
            <div className="space-y-4">
              {/* Name Field */}
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your Name"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200"
                />
              </div>

              {/* Email Field */}
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Your Email"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200"
                />
              </div>

              {/* Message Field */}
              <div className="relative">
                <MessageSquare className="absolute left-3 top-4 w-4 h-4 text-gray-400" />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us about your project or question..."
                  rows={3}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200 resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`
                  w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2
                  ${
                    isSubmitting
                      ? 'bg-orange-300 cursor-not-allowed'
                      : 'bg-orange-500 hover:bg-orange-600 hover:shadow-lg hover:scale-105 active:scale-95'
                  } text-white
                `}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </button>
            </div>
          ) : (
            // Success State
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 text-green-500">✓</div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Message Sent!</h3>
              <p className="text-gray-600 mb-4">Thanks for reaching out! We'll get back to you within 24 hours.</p>
              <div className="text-sm text-orange-600 font-medium">This popup will close automatically...</div>
            </div>
          )}
        </div>

        {/* Footer */}
        {!isSubmitted && (
          <div className="bg-gray-50 px-6 py-3 text-center border-t">
            <p className="text-xs text-gray-500">We'll respond within 24 hours • Your privacy is protected</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QueryPopup;