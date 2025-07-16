import React, { useEffect, useRef, useState } from 'react';
import { Check } from 'lucide-react';
import Link from 'next/link';

const CommerceAppsShowcase = () => {
  const [visibleApps, setVisibleApps] = useState(new Set());
  const appRefs = useRef([]);
  const [whatsapp,setWhatsapp] = useState("");
  const fetchWhatsapp = async () => {
    const response = await fetch("/admin/api/getContact")
    const data = await response.json();
    console.log(data)
    setWhatsapp(data.whatsapp);
  }
  useEffect(
    ()=>{
      fetchWhatsapp()
    },[]
  )
  const apps = [
    {
      id: 1,
      title: "Quick Commerce Multi Vendor APP & Website",
      subtitle: "Build your own quick commerce app just like \"Blinkit & Zepto\" Our app is a powerful tool to build your own quick-commerce platform.",
      phones: [
        { image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=600&fit=crop", name: "Wishlist" },
        { image: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=300&h=600&fit=crop", name: "Categories" },
        { image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=300&h=600&fit=crop", name: "Products" }
      ],
      features: [
        "Android and IOS app for customer",
        "Android and IOS app for Seller/Delivery boy",
        "Master Admin",
        "Website"
      ],
      gradient: "from-teal-400 to-green-400"
    },
    {
      id: 2,
      title: "Food Delivery Multi Vendor APP & Website",
      subtitle: "Create your own food delivery platform similar to \"Swiggy & Zomato\" with our comprehensive solution for restaurants and customers.",
      phones: [
        { image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&h=600&fit=crop", name: "Menu" },
        { image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=300&h=600&fit=crop", name: "Cart" },
        { image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=600&fit=crop", name: "Orders" }
      ],
      features: [
        "Customer mobile app (Android & iOS)",
        "Restaurant partner app",
        "Delivery partner app",
        "Admin dashboard & Website"
      ],
      gradient: "from-orange-400 to-red-400"
    },
    {
      id: 3,
      title: "Taxi Booking Multi Service APP & Website",
      subtitle: "Launch your own ride-hailing service like \"Uber & Ola\" with our complete taxi booking solution for passengers and drivers.",
      phones: [
        { image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300&h=600&fit=crop", name: "Booking" },
        { image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=600&fit=crop", name: "Tracking" },
        { image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=300&h=600&fit=crop", name: "Payment" }
      ],
      features: [
        "Passenger app (Android & iOS)",
        "Driver app with GPS tracking",
        "Admin panel with analytics",
        "Website & Payment gateway"
      ],
      gradient: "from-blue-400 to-purple-400"
    },
    {
      id: 4,
      title: "Multi Service Home APP & Website",
      subtitle: "Build your own home services platform like \"Urban Company\" connecting service providers with customers for various home services.",
      phones: [
        { image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=600&fit=crop", name: "Services" },
        { image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=600&fit=crop", name: "Booking" },
        { image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=600&fit=crop", name: "Profile" }
      ],
      features: [
        "Customer booking app",
        "Service provider app",
        "Real-time service tracking",
        "Admin dashboard & Website"
      ],
      gradient: "from-pink-400 to-rose-400"
    }
  ];

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -20% 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const appId = parseInt(entry.target.dataset.appId);
          setVisibleApps(prev => new Set([...prev, appId]));
        }
      });
    }, observerOptions);

    appRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const getAnimationClasses = (isVisible) => {
    const baseClasses = "transition-all duration-1000 ease-out";
    
    if (!isVisible) {
      return `${baseClasses} transform translate-y-20 opacity-0`;
    }
    
    return `${baseClasses} transform translate-y-0 opacity-100`;
  };

  return (
    <div className="relative w-full mx-auto px-4 py-12 bg-white">
      {apps.map((app, index) => (
        <div 
          key={app.id}
          ref={el => appRefs.current[index] = el}
          data-app-id={app.id}
          className={`grid md:grid-cols-2 py-11 gap-8 ${getAnimationClasses(visibleApps.has(app.id))}`}
        >
          {/* Mobile Phones Display */}
          <div className={`relative  md:min-h-[500px] lg:min-h-[450px] hover:-translate-y-2 transition-all duration-300 rounded-2xl bg-gradient-to-br ${app.gradient} p-4 flex items-center justify-center ${
            visibleApps.has(app.id) ? 'animate-fade-in-up' : ''
          }`}>
            <div className="flex space-x-4 items-center">
              {app.phones.map((phone, phoneIndex) => (
                <div 
                  key={phoneIndex}
                  className={`relative ${phoneIndex==1?"mb-20":""} transform transition-all duration-700 ${
                    phoneIndex === 1 ? 'scale-110 z-10' : 'scale-95'
                  } ${visibleApps.has(app.id) ? 'animate-slide-up' : 'translate-y-8 opacity-0'}`}
                  style={{
                    transitionDelay: `${phoneIndex * 200 + 300}ms`
                  }}
                >
                  <div className="w-24 h-48 lg:w-36 lg:h-72 bg-black rounded-3xl p-1.5 shadow-2xl">
                    <div className="w-full h-full bg-white rounded-2xl overflow-hidden relative">
                      {/* Phone notch - more realistic */}
                      <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-10 h-1.5 bg-black rounded-full z-10"></div>
                      
                      {/* Phone content area with real image */}
                      <div className=" h-full">
                        <div className="w-full h-full rounded-lg overflow-hidden">
                          <img 
                            src={phone.image} 
                            alt={phone.name}
                            className="w-full  h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      </div>
                      
                      {/* Home indicator */}
                      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-black rounded-full z-10"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="md:space-y-8 space-y-5 flex flex-col justify-center">
            <div className={`transition-all duration-700 ${
              visibleApps.has(app.id) ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
            style={{ transitionDelay: '200ms' }}>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                {app.title}
              </h2>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                {app.subtitle}
              </p>
            </div>

            <div className="md:space-y-4 space-y-3">
              {app.features.map((feature, featureIndex) => (
                <div 
                  key={featureIndex} 
                  className={`flex items-start space-x-3 transition-all duration-600 ${
                    visibleApps.has(app.id) ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                  }`}
                  style={{
                    transitionDelay: `${400 + (featureIndex * 100)}ms`
                  }}
                >
                  <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-0.5">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-700 lg:text-lg font-medium">{feature}</span>
                </div>
              ))}
            </div>

            <Link 
            href={`https://wa.me/${whatsapp}?text=Hi%20I%20want%20to%20book%20a%20consultation%20for%20${app.title}%20App`}
            target='_blank'
            className={`bg-transparent lg:w-1/2 md:w-72 border-orange-400 border-2 text-orange-500 md:px-4 px-4 md:py-4 py-3 rounded-xl font-semibold text-lg hover:bg-gray-800 text-center transition-all duration-300 shadow-lg transform hover:scale-105 ${
              visibleApps.has(app.id) ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
            style={{
              transitionDelay: '100ms'
            }}>
              Book Free Consultation
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommerceAppsShowcase;