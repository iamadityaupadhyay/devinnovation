"use client";
import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Mail, Phone } from 'lucide-react';

interface DropdownItem {
  label: string;
  href: string;
}

interface Service {
  name: string;
  icon: string;
  href: string;
  bgColor: string;
}

interface NavItem {
  label: string;
  href: string;
  isActive?: boolean;
  hasDropdown?: boolean;
  dropdownItems?: DropdownItem[];
  isServicesDropdown?: boolean;
  isHireTeamDropdown?: boolean;
  isIndustriesDropdown?: boolean;
}

const AppsInvoNavbar: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const services: Service[] = [
    { name: 'Web Development', icon: '💻', href: '#', bgColor: 'bg-blue-500' },
    { name: 'Mobile Apps', icon: '📱', href: '#', bgColor: 'bg-green-500' },
    { name: 'UI/UX Design', icon: '🎨', href: '#', bgColor: 'bg-purple-500' },
    { name: 'Digital Marketing', icon: '📊', href: '#', bgColor: 'bg-red-500' },
    { name: 'E-commerce', icon: '🛒', href: '#', bgColor: 'bg-orange-500' },
    { name: 'Cloud Solutions', icon: '☁️', href: '#', bgColor: 'bg-cyan-500' },
    { name: 'AI & ML', icon: '🤖', href: '#', bgColor: 'bg-indigo-500' },
    { name: 'DevOps', icon: '⚙️', href: '#', bgColor: 'bg-gray-600' },
    { name: 'Quality Assurance', icon: '✅', href: '#', bgColor: 'bg-emerald-500' },
    { name: 'Consulting', icon: '💡', href: '#', bgColor: 'bg-yellow-500' }
  ];

  const developers: Service[] = [
    { name: 'Ionic App Developers', icon: '⚡', href: '#hire-ionic-developers', bgColor: 'bg-blue-500' },
    { name: 'Node.js Developers', icon: '🟢', href: '#hire-nodejs-developers', bgColor: 'bg-green-600' },
    { name: 'Next.js Developers', icon: '▲', href: '#hire-nextjs-developers', bgColor: 'bg-black' },
    { name: 'UI/UX Developers', icon: '🎨', href: '#hire-uiux-developers', bgColor: 'bg-purple-500' },
    { name: 'React.js Developers', icon: '⚛️', href: '#hire-reactjs-developers', bgColor: 'bg-blue-400' },
    { name: 'Vue.js Developers', icon: '💚', href: '#hire-vuejs-developers', bgColor: 'bg-green-500' },
    { name: 'Angular Developers', icon: '🅰️', href: '#hire-angularjs-developers', bgColor: 'bg-red-600' },
    { name: 'Full Stack Developers', icon: '⚙️', href: '#hire-fullstack-developers', bgColor: 'bg-indigo-600' },
    { name: 'Golang Developers', icon: '🐹', href: '#hire-golang-developers', bgColor: 'bg-cyan-500' },
    { name: 'Python Developers', icon: '🐍', href: '#hire-python-developers', bgColor: 'bg-yellow-500' },
    { name: 'PHP Developers', icon: '🐘', href: '#hire-php-developers', bgColor: 'bg-purple-600' },
    { name: 'QA Engineers', icon: '🔍', href: '#hire-qa-developers', bgColor: 'bg-emerald-500' },
    { name: 'Android Developers', icon: '🤖', href: '#hire-android-developers', bgColor: 'bg-green-700' },
    { name: 'Flutter Developers', icon: '🦋', href: '#hire-flutter-developers', bgColor: 'bg-blue-600' },
    { name: 'iPhone Developers', icon: '📱', href: '#hire-iphone-developers', bgColor: 'bg-gray-800' },
    { name: 'Swift Developers', icon: '🦉', href: '#hire-swift-developers', bgColor: 'bg-orange-600' },
    { name: 'React Native Developers', icon: '📲', href: '#hire-react-native-developers', bgColor: 'bg-cyan-600' },
    { name: 'Laravel Developers', icon: '🎭', href: '#hire-laravel-developers', bgColor: 'bg-red-500' }
  ];

  const industries: Service[] = [
    { name: 'Healthcare', icon: '🏥', href: '#healthcare', bgColor: 'bg-blue-500' },
    { name: 'E-commerce', icon: '🛒', href: '#ecommerce', bgColor: 'bg-orange-500' },
    { name: 'Education', icon: '🎓', href: '#education', bgColor: 'bg-green-500' },
    { name: 'Finance', icon: '💸', href: '#finance', bgColor: 'bg-yellow-500' },
    { name: 'Real Estate', icon: '🏠', href: '#real-estate', bgColor: 'bg-purple-500' },
    { name: 'Travel & Tourism', icon: '✈️', href: '#travel', bgColor: 'bg-cyan-500' },
    { name: 'Construction', icon: '🏗️', href: '#construction', bgColor: 'bg-gray-600' },
    { name: 'Agriculture', icon: '🌾', href: '#agriculture', bgColor: 'bg-emerald-500' },
    { name: 'Electric Vehicle', icon: '🚗', href: '#electric-vehicle', bgColor: 'bg-indigo-500' },
    { name: 'Fintech', icon: '📱', href: '#fintech', bgColor: 'bg-red-500' },
    { name: 'Milk Delivery', icon: '🥛', href: '#milk-delivery', bgColor: 'bg-blue-400' },
    { name: 'Fleet Management', icon: '🚚', href: '#fleet-management', bgColor: 'bg-green-600' },
    { name: 'Lawyer', icon: '⚖️', href: '#lawyer', bgColor: 'bg-purple-600' },
    { name: 'AI Application', icon: '🤖', href: '#ai-application', bgColor: 'bg-cyan-600' },
    { name: 'Oil & Gas', icon: '⛽', href: '#oil-gas', bgColor: 'bg-gray-700' },
    { name: 'Banking', icon: '🏦', href: '#banking', bgColor: 'bg-yellow-600' },
    { name: 'Business', icon: '💼', href: '#business', bgColor: 'bg-blue-600' },
    { name: 'Car Rental', icon: '🚘', href: '#car-rental', bgColor: 'bg-orange-600' },
    { name: 'NGO', icon: '🤝', href: '#ngo', bgColor: 'bg-green-700' },
    { name: 'Game', icon: '🎮', href: '#game', bgColor: 'bg-purple-700' },
    { name: 'Courier', icon: '📦', href: '#courier', bgColor: 'bg-red-600' },
    { name: 'Online Examination', icon: '📝', href: '#online-examination', bgColor: 'bg-cyan-700' },
    { name: 'Taxi Booking', icon: '🚕', href: '#taxi-booking', bgColor: 'bg-yellow-700' },
    { name: 'Augmented Reality', icon: '🕶️', href: '#augmented-reality', bgColor: 'bg-blue-700' },
    { name: 'CRM & ERP', icon: '📊', href: '#crm-erp', bgColor: 'bg-indigo-600' },
    { name: 'Automotive', icon: '🚗', href: '#automotive', bgColor: 'bg-gray-800' },
    { name: 'Influencer', icon: '🌟', href: '#influencer', bgColor: 'bg-orange-700' },
    { name: 'Restaurant', icon: '🍽️', href: '#restaurant', bgColor: 'bg-red-700' },
    { name: 'SaaS', icon: '☁️', href: '#saas', bgColor: 'bg-blue-800' },
    { name: 'Social Networking', icon: '🌐', href: '#social-networking', bgColor: 'bg-green-800' },
    { name: 'Sports', icon: '⚽', href: '#sports', bgColor: 'bg-purple-800' },
    { name: 'Travel App', icon: '🗺️', href: '#travel-app', bgColor: 'bg-cyan-800' },
    { name: 'Wellness App', icon: '🧘', href: '#wellness-app', bgColor: 'bg-yellow-800' },
    { name: 'Car Wash', icon: '🚿', href: '#car-wash', bgColor: 'bg-blue-900' },
    { name: 'Astrology', icon: '🌙', href: '#astrology', bgColor: 'bg-purple-900' },
    { name: 'Doctor', icon: '🩺', href: '#doctor', bgColor: 'bg-red-800' },
    { name: 'Salon', icon: '💇', href: '#salon', bgColor: 'bg-orange-800' },
    { name: 'Laundry', icon: '🧼', href: '#laundry', bgColor: 'bg-green-900' },
    { name: 'Medicine Delivery', icon: '💊', href: '#medicine-delivery', bgColor: 'bg-blue-500' },
    { name: 'Airline', icon: '✈️', href: '#airline', bgColor: 'bg-cyan-900' },
    { name: 'E-Scooter App', icon: '🛵', href: '#e-scooter-app', bgColor: 'bg-yellow-900' },
    { name: 'Entertainment', icon: '🎬', href: '#entertainment', bgColor: 'bg-red-900' },
    { name: 'Event', icon: '🎉', href: '#event', bgColor: 'bg-purple-500' },
    { name: 'm-Learning', icon: '📱', href: '#m-learning', bgColor: 'bg-blue-600' },
    { name: 'News App', icon: '📰', href: '#news-app', bgColor: 'bg-orange-900' },
    { name: 'On-Demand', icon: '⚡', href: '#on-demand', bgColor: 'bg-green-500' },
    { name: 'Political', icon: '🏛️', href: '#political', bgColor: 'bg-blue-700' }
  ];

  const navItems: NavItem[] = [
    { label: 'Home', href: '#', isActive: true },
    { label: 'Portfolio', href: '#' },
    {
      label: 'Services',
      href: '#',
      hasDropdown: true,
      isServicesDropdown: true,
      dropdownItems: [
        { label: 'Web Development', href: '#' },
        { label: 'Mobile Apps', href: '#' },
        { label: 'UI/UX Design', href: '#' },
        { label: 'Digital Marketing', href: '#' },
      ],
    },
    {
      label: 'Industries',
      href: '#',
      hasDropdown: true,
      isIndustriesDropdown: true,
      dropdownItems: industries.map(industry => ({
        label: industry.name,
        href: industry.href
      })),
    },
    
    {
      label: 'Hire Team',
      href: '#',
      hasDropdown: true,
      isHireTeamDropdown: true,
      dropdownItems: developers.map(developer => ({
        label: developer.name,
        href: developer.href
      })),
    },
    { label: 'Career', href: '#' },
    { label: 'Clients', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Contact', href: '#' },
  ];

  const handleMouseEnter = (label: string) => {
    if (!isMobile) {
      setActiveDropdown(label);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setActiveDropdown(null);
    }
  };

  const handleDropdownClick = (label: string) => {
    if (isMobile) {
      setActiveDropdown(activeDropdown === label ? null : label);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setActiveDropdown(null);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 font-sans">
      {/* Top Bar - Hidden on mobile */}
      <div className="hidden lg:block bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-end items-center py-1">
            <div className="flex items-center space-x-6 text-sm">
              <a
                href="mailto:trackode.ai@gmail.com"
                className="flex items-center space-x-2 text-gray-600 hover:text-orange-500 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>trackode.ai@gmail.com</span>
              </a>
              <div className="h-4 w-px bg-gray-300" />
              <a
                href="mailto:salestrackode.ai@gmail.com"
                className="text-gray-600 hover:text-orange-500 transition-colors"
              >
                salestrackode.ai@gmail.com
              </a>
              <div className="h-4 w-px bg-gray-300" />
              <div className="flex items-center space-x-1 text-gray-600">
                <Phone className="w-4 h-4" />
                <span>+91 8840250583</span>
              </div>
                <a
                href="#"
                className="bg-orange-500 text-white px-4 py-1.5 rounded-md text-sm font-medium transition-colors border-2 border-orange-500 hover:bg-white hover:text-orange-500 hover:outline-none hover:border-orange-500"
                >
                Consult Experts
                </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 via-purple-500 to-blue-500 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
              <div className="text-white font-bold text-lg">A</div>
            </div>
            <span className="text-xl font-bold">
              <span className="text-gray-700">dev</span>
              <span className="text-orange-500">invo</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-5">
            {navItems.map((item, index) => (
                <div
                key={index}
                className="relative"
                onMouseEnter={() => handleMouseEnter(item.label)}
                onMouseLeave={handleMouseLeave}
                >
                <a
                  href={item.href}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  item.isActive
                    ? 'text-orange-500 bg-orange-50'
                    : 'text-gray-700 hover:text-orange-500 hover:bg-gray-50'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.hasDropdown && (
                  <ChevronDown className="w-4 h-4 ml-1" />
                  )}
                </a>

                {/* Desktop Dropdown */}
                {item.hasDropdown && (
                  <div
                  className={`absolute top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg transition-all duration-200 z-40 ${
                    activeDropdown === item.label
                    ? 'opacity-100 visible translate-y-0'
                    : 'opacity-0 invisible -translate-y-2'
                  } ${
                    item.isServicesDropdown 
                    ? 'p-6 w-[800px] -left-96 max-h-[75vh] overflow-y-auto'
                    : item.isHireTeamDropdown
                    ? 'p-6 w-[800px] -left-96 max-h-[75vh] overflow-y-auto'
                    : item.isIndustriesDropdown
                    ? 'p-6 w-[800px] -left-96 max-h-[75vh] overflow-y-auto'
                    : 'py-2 min-w-[200px]'
                  }`}
                  style={
                    item.isServicesDropdown || item.isHireTeamDropdown || item.isIndustriesDropdown
                    ? { scrollbarGutter: 'stable' }
                    : undefined
                  }
                  >
                  {item.isServicesDropdown ? (
                    <div>
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">Our Services</h3>
                      <p className="text-gray-600 text-sm leading-relaxed max-w-md mb-4">
                      Transform your ideas into powerful digital solutions with our comprehensive range of services.
                      </p>
                      <a href="#" className="text-orange-500 text-sm font-medium hover:text-orange-600 transition-colors">
                      View All Services →
                      </a>
                    </div>
                    
                    <div className="grid grid-cols-5 gap-4">
                      {services.map((service, serviceIndex) => (
                      <a
                        key={serviceIndex}
                        href={service.href}
                        className="flex flex-col items-center text-center p-4 rounded-lg hover:bg-gray-50 transition-all duration-200 group"
                      >
                        <div className={`w-16 h-16 ${service.bgColor} rounded-xl flex items-center justify-center text-white text-2xl mb-3 group-hover:scale-110 transition-transform shadow-lg`}>
                        {service.icon}
                        </div>
                        <span className="text-xs font-medium text-gray-800 leading-tight group-hover:text-orange-500 transition-colors">
                        {service.name}
                        </span>
                      </a>
                      ))}
                    </div>
                    </div>
                  ) : item.isHireTeamDropdown ? (
                    <div>
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">Hire Dedicated Developers</h3>
                      <p className="text-gray-600 text-sm leading-relaxed max-w-md mb-4">
                      Build your dream team with our expert developers. Hire skilled professionals for your project needs.
                      </p>
                      <a href="#" className="text-orange-500 text-sm font-medium hover:text-orange-600 transition-colors">
                      View All Developers →
                      </a>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                      {developers.map((developer, developerIndex) => (
                      <a
                        key={developerIndex}
                        href={developer.href}
                        className="flex flex-col items-center text-center p-4 rounded-lg hover:bg-gray-50 transition-all duration-200 group"
                      >
                        <div className={`w-16 h-16 ${developer.bgColor} rounded-xl flex items-center justify-center text-white text-2xl mb-3 group-hover:scale-110 transition-transform shadow-lg`}>
                        {developer.icon}
                        </div>
                        <span className="text-xs font-medium text-gray-800 leading-tight group-hover:text-orange-500 transition-colors">
                        {developer.name}
                        </span>
                      </a>
                      ))}
                    </div>
                    </div>
                  ) : item.isIndustriesDropdown ? (
                    <div>
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">Industries We Serve</h3>
                      <p className="text-gray-600 text-sm leading-relaxed max-w-md mb-4">
                      Empowering diverse industries with innovative digital solutions tailored to their unique needs.
                      </p>
                      <a href="#" className="text-orange-500 text-sm font-medium hover:text-orange-600 transition-colors">
                      View All Industries →
                      </a>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                      {industries.map((industry, industryIndex) => (
                      <a
                        key={industryIndex}
                        href={industry.href}
                        className="flex flex-col items-center text-center p-4 rounded-lg hover:bg-gray-50 transition-all duration-200 group"
                      >
                        <div className={`w-16 h-16 ${industry.bgColor} rounded-xl flex items-center justify-center text-white text-2xl mb-3 group-hover:scale-110 transition-transform shadow-lg`}>
                        {industry.icon}
                        </div>
                        <span className="text-xs font-medium text-gray-800 leading-tight group-hover:text-orange-500 transition-colors">
                        {industry.name}
                        </span>
                      </a>
                      ))}
                    </div>
                    </div>
                  ) : (
                    item.dropdownItems?.map((dropdownItem, dropdownIndex) => (
                    <a
                      key={dropdownIndex}
                      href={dropdownItem.href}
                      className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-orange-500 transition-colors rounded-md"
                    >
                      {dropdownItem.label}
                    </a>
                    ))
                  )}
                  </div>
                )}
                </div>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-gray-700 hover:text-orange-500 hover:bg-gray-50 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`lg:hidden transition-all duration-300 ease-in-out ${
        isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
      } overflow-hidden bg-white border-t border-gray-200`}>
        <div className="px-4 py-4 space-y-2">
          {/* Mobile Contact Info */}
          <div className="border-b border-gray-200 pb-4 mb-4">
            <div className="space-y-2 text-sm">
              <a href="mailto:trackode.ai@gmail.com" className="flex items-center space-x-2 text-gray-600 py-2">
                <Mail className="w-4 h-4" />
                <span>trackode.ai@gmail.com</span>
              </a>
              <a href="tel:+15551234567" className="flex items-center space-x-2 text-gray-600 py-2">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </a>
              <a
                href="#"
                className="inline-block bg-orange-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-600 transition-colors mt-2"
              >
                Consult Experts
              </a>
            </div>
          </div>

          {/* Mobile Navigation Items */}
          {navItems.map((item, index) => (
            <div key={index} className="border-b border-gray-100 last:border-b-0">
              <div className="flex items-center justify-between">
                <a
                  href={item.href}
                  className={`flex-1 py-3 text-base font-medium ${
                    item.isActive ? 'text-orange-500' : 'text-gray-700'
                  }`}
                >
                  {item.label}
                </a>
                {item.hasDropdown && (
                  <button
                    onClick={() => handleDropdownClick(item.label)}
                    className="p-2 text-gray-500 hover:text-orange-500 transition-colors"
                  >
                    <ChevronDown className={`w-5 h-5 transition-transform ${
                      activeDropdown === item.label ? 'rotate-180' : ''
                    }`} />
                  </button>
                )}
              </div>

              {/* Mobile Dropdown */}
              {item.hasDropdown && (
                <div className={`transition-all duration-300 ease-in-out ${
                  activeDropdown === item.label ? 'max-h-[80vh] opacity-100 overflow-y-auto' : 'max-h-0 opacity-0'
                } overflow-hidden`}>
                  <div className="pl-4 pb-2">
                    {item.isServicesDropdown ? (
                      <div className="grid grid-cols-2 gap-2 py-2">
                        {services.map((service, serviceIndex) => (
                          <a
                            key={serviceIndex}
                            href={service.href}
                            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <div className={`w-8 h-8 ${service.bgColor} rounded-lg flex items-center justify-center text-white text-sm`}>
                              {service.icon}
                            </div>
                            <span className="text-sm text-gray-700">{service.name}</span>
                          </a>
                        ))}
                      </div>
                    ) : item.isHireTeamDropdown ? (
                      <div className="grid grid-cols-2 gap-2 py-2">
                        {developers.map((developer, developerIndex) => (
                          <a
                            key={developerIndex}
                            href={developer.href}
                            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <div className={`w-8 h-8 ${developer.bgColor} rounded-lg flex items-center justify-center text-white text-sm`}>
                              {developer.icon}
                            </div>
                            <span className="text-sm text-gray-700">{developer.name}</span>
                          </a>
                        ))}
                      </div>
                    ) : item.isIndustriesDropdown ? (
                      <div className="grid grid-cols-2 gap-2 py-2">
                        {industries.map((industry, industryIndex) => (
                          <a
                            key={industryIndex}
                            href={industry.href}
                            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <div className={`w-8 h-8 ${industry.bgColor} rounded-lg flex items-center justify-center text-white text-sm`}>
                              {industry.icon}
                            </div>
                            <span className="text-sm text-gray-700">{industry.name}</span>
                          </a>
                        ))}
                      </div>
                    ) : (
                      item.dropdownItems?.map((dropdownItem, dropdownIndex) => (
                        <a
                          key={dropdownIndex}
                          href={dropdownItem.href}
                          className="block py-2 text-sm text-gray-600 hover:text-orange-500 transition-colors"
                        >
                          {dropdownItem.label}
                        </a>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default AppsInvoNavbar;