"use client"
import React from 'react';

const ServicesComponent = () => {
  const services = [
    [
      'Mobile App Development',
      'Android App Development',
      'Android VR App Development',
      'Blockchain App Development'
    ],
    [
      'Chatbot App Development',
      'Flutter App Development',
      'Hybrid App Development',
      'iOS App Development'
    ],
    [
      'IoT App Development',
      'Kotlin App Development',
      'Mobile App Consultancy',
      'React Native App Development'
    ],
    [
      'Software Quality Assurance',
      'SEO Service',
      'UI/UX Designing',
      'Wearable App Development',
      'Web Development'
    ]
  ];

  const handleServiceClick = (service) => {
    // You can customize this function to handle clicks
    // For example, navigate to a specific page or show more details
    console.log(`Clicked on: ${service}`);
    // Example: window.location.href = `/services/${service.toLowerCase().replace(/ /g, '-')}`;
  };

  return (
    <div className="bg-gray-900 text-white p-6">
      <h2 className="text-orange-500 text-xl font-bold mb-4 border-b-2 border-orange-500 inline-block pb-2">Our Services</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {services.map((items, index) => (
          <div key={index} className="p-2 transition-shadow duration-300">
            <ul className="list-none">
              {items.map((item, i) => (
                <li
                  key={i}
                  className={`text-sm transition-colors py-2 hover:text-orange-400 duration-200 cursor-pointer `}
                  onClick={() => handleServiceClick(item)}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesComponent;