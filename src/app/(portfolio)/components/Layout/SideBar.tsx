"use client"
import React, { useState } from 'react';
import { Facebook, Instagram, Twitter, Linkedin, MessageCircle, Users, Phone, Mail } from 'lucide-react';
import Link from 'next/link';

const SocialSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const socialLinks = [
    { icon: Facebook, href: 'https://instagram.com/iamadityaupadhyay', bg: 'bg-blue-600', label: 'Facebook' },
    { icon: Instagram, href: 'https://instagram.com/iam_adityaupadhyay', bg: 'bg-gradient-to-br from-purple-600 to-pink-500', label: 'Instagram' },
    { icon: Twitter, href: 'https://x.com/iam_adiupadhyay', bg: 'bg-black', label: 'Twitter/X' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/iamadityaupadhyay/', bg: 'bg-blue-700', label: 'LinkedIn' },
  ];

  const contactLinks = [
    { icon: MessageCircle, href: 'https://wa.me/918840250583?text=Hi', bg: 'bg-green-500', label: 'WhatsApp' },
    { icon: Users, href: '#', bg: 'bg-purple-600', label: 'Microsoft Teams' },
    { icon: Phone, href: 'tel:+918840250583', bg: 'bg-orange-500', label: 'Phone' },
    { icon: Mail, href: '#', bg: 'bg-blue-500', label: 'Email' },
  ];

  return (
    <>
      {/* Social Media Sidebar */}
      <div className="fixed hidden sm:block left-0 top-1/2 transform -translate-y-1/2 z-50">
        <div className="flex flex-col space-y-1">
          {socialLinks.map((social, index) => (
            <div key={index} className="group relative">
              <Link
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-7 h-7 ${social.bg} flex items-center opacity-80 hover:opacity-100 justify-center text-white hover:w-12 hover:h-12 transition-all duration-300 shadow-lg hover:shadow-xl`}
                title={social.label}
              >
                <social.icon size={20} />
              </Link>
              <div className="absolute left-14 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                {social.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Sidebar */}
      <div className="fixed hidden sm:block right-0 top-3/4 transform -translate-y-1/2 z-50">
        <div className="flex flex-col space-y-1">
          {contactLinks.map((contact, index) => (
            <div key={index} className="group relative">
              <Link
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-12 h-12 ${contact.bg} opacity-80 hover:opacity-100 flex items-center justify-center text-white hover:w-14 hover:h-14 transition-all duration-300 shadow-lg hover:shadow-xl rounded-full`}
                title={contact.label}
              >
                <contact.icon size={20} />
              </Link>
              <div className="absolute right-14 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                {contact.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Toggle Button */}
      <div className="fixed bottom-4 right-1 z-50 md:hidden">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-14 h-14 bg-orange-700 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-orange-800 transition-colors"
        >
          <Users size={24} />
        </button>

        {/* Mobile Expanded Menu */}
        {isExpanded && (
          <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-xl p-4 min-w-48">
            <div className="grid grid-cols-2 gap-3">
              {[...contactLinks, ...socialLinks].map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${item.bg} text-white p-3 rounded-lg flex flex-col items-center justify-center hover:opacity-80 transition-opacity`}
                >
                  <item.icon size={20} />
                  <span className="text-xs mt-1">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Backdrop */}
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 z-40 md:hidden"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </>
  );
};

export default SocialSidebar;
