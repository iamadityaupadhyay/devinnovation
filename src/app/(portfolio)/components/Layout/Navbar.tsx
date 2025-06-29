"use client";
import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Mail, Phone, MapPin } from 'lucide-react';
import RequestQuoteModal from '../Forms/RequestQuote';
import Link from 'next/link';
import Image from 'next/image';
import axios from "axios"
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
interface DropdownItem {
  label: string;
  href: string;
}
interface NavbarProps {
  contact: any;
  services: any[];
}
interface Service {
  name: string;
  href: string;
  imageUrl?: string; // Changed from icon to imageUrl
  bgColor: string;
  image:string
}
interface Hire{
  name: string;
  href: string;
  icon:string// Changed from icon to imageUrl
  bgColor: string
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

const Navbar: React.FC = ({contact,services}:any) => {
  
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  

  
  

  
  
  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const servicesData=services;

  const developers: Hire[] = [
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

  const industries = [
    {
      name: "Healthcare",
      href: "/service/healthcare",
      imageUrl: "https://images.unsplash.com/photo-1602265585142-6b221b9b2c24?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aGVhbHRoY2FyZSUyMGFwcHN8ZW58MHx8MHx8fDA%3D",
      bgColor: 'bg-blue-500'
    },
    {
      name: "E-commerce",
      href: "/service/e-commerce",
      imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      bgColor: 'bg-orange-500'
    },
    {
      name: "Education",
      href: "/service/education",
      imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2022&q=80",
      bgColor: 'bg-green-500'
    },
    {
      name: "Finance",
      href: "/service/finance",
      imageUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      bgColor: 'bg-yellow-500'
    },
    {
      name: "Real Estate",
      href: "/service/real-estate",
      imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1973&q=80",
      bgColor: 'bg-purple-500'
    },
    {
      name: "Travel & Tourism",
      href: "/service/travel-tourism",
      imageUrl: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB ascend=0&ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      bgColor: 'bg-cyan-500'
    },
    {
      name: "Construction",
      href: "/service/construction",
      imageUrl: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      bgColor: 'bg-gray-600'
    },
    {
      name: "Agriculture",
      href: "/service/agriculture",
      imageUrl: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2129&q=80",
      bgColor: 'bg-emerald-500'
    },
    {
      name: "Electric Vehicle",
      href: "/service/electric-vehicle",
      imageUrl: "https://plus.unsplash.com/premium_photo-1715789261470-fb25ffbf70d3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZWxlY3RyaWMlMjB2ZWhpY2xlfGVufDB8fDB8fHww",
      bgColor: 'bg-indigo-500'
    },
    {
      name: "Fintech",
      href: "/service/fintech",
      imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      bgColor: 'bg-red-500'
    },
    {
      name: "Milk Delivery",
      href: "/service/milk-delivery",
      imageUrl: "https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2026&q=80",
      bgColor: 'bg-blue-400'
    },
    
    {
      name: "Lawyer",
      href: "/service/lawyer",
      imageUrl: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2012&q=80",
      bgColor: 'bg-purple-600'
    },
    {
      name: "AI Application",
      href: "/service/ai-application",
      imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2332&q=80",
      bgColor: 'bg-cyan-600'
    },
    {
      name: "Oil & Gas",
      href: "/service/oil-gas",
      imageUrl: "https://plus.unsplash.com/premium_photo-1682148795124-dac95dd91fd4?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      bgColor: 'bg-gray-700'
    },
    {
      name: "Banking",
      href: "/service/banking",
      imageUrl: "https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      bgColor: 'bg-yellow-600'
    },
    {
      name: "Business",
      href: "/service/business",
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      bgColor: 'bg-blue-600'
    },
    {
      name: "Car Rental",
      href: "/service/car-rental",
      imageUrl: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2014&q=80",
      bgColor: 'bg-orange-600'
    },
    {
      name: "NGO",
      href: "/service/ngo",
      imageUrl: "https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      bgColor: 'bg-green-700'
    },
    {
      name: "Game",
      href: "/service/game",
      imageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
      bgColor: 'bg-purple-700'
    },
    {
      name: "Courier",
      href: "/service/courier",
      imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      bgColor: 'bg-red-600'
    },
    {
      name: "Online Examination",
      href: "/service/online-examination",
      imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      bgColor: 'bg-cyan-700'
    },
    {
      name: "Taxi Booking",
      href: "/service/taxi-booking",
      imageUrl: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      bgColor: 'bg-yellow-700'
    },
    
    {
      name: "CRM & ERP",
      href: "/service/crm-erp",
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80",
      bgColor: 'bg-indigo-600'
    },
    {
      name: "Automotive",
      href: "/service/automotive",
      imageUrl: "https://images.unsplash.com/photo-1486496146582-9ffcd0b2b2b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      bgColor: 'bg-gray-800'
    },
    {
      name: "Influencer",
      href: "/service/influencer",
      imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
      bgColor: 'bg-orange-700'
    },
    {
      name: "Restaurant",
      href: "/service/restaurant",
      imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
      bgColor: 'bg-red-700'
    },
    {
      name: "SaaS",
      href: "/service/saas",
      imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
      bgColor: 'bg-blue-800'
    },
    {
      name: "Social Networking",
      href: "/service/social-networking",
      imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
      bgColor: 'bg-green-800'
    },
    {
      name: "Sports",
      href: "/service/sports",
      imageUrl: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      bgColor: 'bg-purple-800'
    },
    {
      name: "Travel App",
      href: "/service/travel-app",
      imageUrl: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2035&q=80",
      bgColor: 'bg-cyan-800'
    },
    {
      name: "Wellness App",
      href: "/service/wellness-app",
      imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      bgColor: 'bg-yellow-800'
    },
    {
      name: "Car Wash",
      href: "/service/car-wash",
      imageUrl: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FyJTIwd2FzaHxlbnwwfHwwfHx8MA%3D%3D",
      bgColor: 'bg-blue-900'
    },
    {
      name: "Astrology",
      href: "/service/astrology",
      imageUrl: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
      bgColor: 'bg-purple-900'
    },
    {
      name: "Doctor",
      href: "/service/doctor",
      imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
      bgColor: 'bg-red-800'
    },
    {
      name: "Salon",
      href: "/service/salon",
      imageUrl: "https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
      bgColor: 'bg-orange-800'
    },
    {
      name: "Laundry",
      href: "/service/laundry",
      imageUrl: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGF1bmRyeXxlbnwwfHwwfHx8MA%3D%3D",
      bgColor: 'bg-green-900'
    },
    {
      name: "Medicine Delivery",
      href: "/service/medicine-delivery",
      imageUrl: "https://plus.unsplash.com/premium_photo-1677860447055-5ce8092c0d7e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWVkaWNpbmUlMjBkZWxpdmVyeXxlbnwwfHwwfHx8MA%3D%3D",
      bgColor: 'bg-blue-500'
    },
    {
      name: "Airline",
      href: "/service/airline",
      imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
      bgColor: 'bg-cyan-900'
    },
    {
      name: "E-Scooter App",
      href: "/service/e-scooter-app",
      imageUrl: "https://images.unsplash.com/photo-1666608943517-2767469cd774?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZSUyMHNjb290ZXIlMjBhcHB8ZW58MHx8MHx8fDA%3D",
      bgColor: 'bg-yellow-900'
    },
    {
      name: "Entertainment",
      href: "/service/entertainment",
      imageUrl: "https://plus.unsplash.com/premium_photo-1710409625244-e9ed7e98f67b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZW50ZXJ0YWlubWVudHxlbnwwfHwwfHx8MA%3D%3D",
      bgColor: 'bg-red-900'
    },
    {
      name: "News App",
      href: "/service/news-app",
      imageUrl: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      bgColor: 'bg-orange-900'
    },
    {
      name: "On-Demand",
      href: "/service/on-demand",
      imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      bgColor: 'bg-green-500'
    }
  ];

  const navItems: NavItem[] = [
    { label: 'Home', href: '/', isActive: true },
    { label: 'Portfolio', href: '/portfolio' },
    {
      label: 'Services',
      href: '/service',
      hasDropdown: true,
      isServicesDropdown: true,
      dropdownItems: servicesData.map((service: { name: any; href: any; }) => ({
        label: service.name,
        href: service.href
      })),
    },
    { label: 'Our Projects', href: '/projects' },
    {
      label: 'Industries',
      href: '/industry',
      hasDropdown: true,
      isIndustriesDropdown: true,
      dropdownItems: industries.map(industry => ({
        label: industry.name,
        href: industry.href
      })),
    },
    {
      label: 'Our Team',
      href: '/team',
      hasDropdown: true,
      isHireTeamDropdown: true,
      dropdownItems: developers.map(developer => ({
        label: developer.name,
        href: developer.href
      })),
    },
    
    
    { label: 'Clients', href: '#' },
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
  <div className="hidden lg:block bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-50 border-b border-gray-200">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-end items-center py-1">
        <div className="flex items-center space-x-6 text-sm">
          <a
            href={`mailto:${contact.email}`}
            className="flex items-center space-x-2 text-gray-600 hover:text-orange-500 transition-colors"
          >
            <Mail className="w-4 h-4" />
            <span>{contact.email}</span>
          </a>
          <div className="h-4 w-px bg-gray-300" />
          <a
            href={`mailto:${contact.emailHR}`}
            className="text-gray-600 hover:text-orange-500 transition-colors"
          >
            {contact.emailHR}
          </a>
          <div className="h-4 w-px bg-gray-300" />
          <a href={`tel:${contact.phoneNumber}`} className="flex items-center space-x-1 text-gray-600">
            <Phone className="w-4 h-4" />
            <span>{contact.phoneNumber}</span>
          </a>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-orange-500 text-white px-4 py-1 rounded-md text-base font-medium transition-colors border-2 border-orange-500 hover:bg-white hover:text-orange-500 hover:outline-none hover:border-orange-500"
          >
            Consult Experts
          </button>
        </div>
      </div>
    </div>
  </div>

  {/* Main Navigation */}
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center h-16">
      {/* Logo */}
      <a href="/" className="flex items-center space-x-2 group">
        <div className="w-12 h-10 md:w-10 lg:w-14 md:h-10 lg:h-14 bg-blue-100 rounded-full flex items-center justify-center">
          <img src="/icons/digital-art.gif" className="w-14" />
        </div>
        <span className="text-xl font-bold">
          <span className="text-gray-700">dev</span>
          <span className="text-orange-500">invo</span>
        </span>
      </a>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center space-x-5">
        {
        navItems.map((item, index) => 
          (
          <div
            key={index}
            className="relative"
            onMouseEnter={() => handleMouseEnter(item.label)}
            onMouseLeave={handleMouseLeave}
          >
            <a
              href={item.href}
              onClick={() => setActiveDropdown(null)}
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-base font-medium transition-colors ${
                item.isActive
                  ? "text-orange-500 bg-orange-50"
                  : "text-gray-700 hover:text-orange-500 hover:bg-gray-50"
              }`}
            >
              <span>{item.label}</span>
              {item.hasDropdown && <ChevronDown className="w-4 h-4 ml-1" />}
            </a>

            {/* Desktop Dropdown */}
            {item.hasDropdown && (
              <div
                className={`absolute top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg transition-all duration-200 z-40 ${
                  activeDropdown === item.label
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible -translate-y-2"
                } ${
                  item.isServicesDropdown
                    ? "p-6 w-[800px] -left-96 max-h-[75vh] overflow-y-auto"
                    : item.isHireTeamDropdown
                    ? "p-6 w-[800px] right-0 max-h-[75vh] overflow-y-auto"
                    : item.isIndustriesDropdown
                    ? "p-6 w-[800px] -left-96 max-h-[75vh] overflow-y-auto"
                    : "py-2 min-w-[200px]"
                }`}
                style={
                  item.isServicesDropdown ||
                  item.isHireTeamDropdown ||
                  item.isIndustriesDropdown
                    ? { scrollbarGutter: "stable" }
                    : undefined
                }
              >
                {item.isServicesDropdown ? (
                  <div>
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">Our Services</h3>
                      <p className="text-gray-600 text-sm leading-relaxed max-w-md mb-4">
                        Transform your ideas into powerful digital solutions with our
                        comprehensive range of services.
                      </p>
                      <a
                        onClick={() => setActiveDropdown(null)}
                        href="/service"
                        className="text-orange-500 text-sm font-medium hover:text-orange-600 transition-colors"
                      >
                        View All Services →
                      </a>
                    </div>
                    <div className="grid grid-cols-5 gap-4">
                      {servicesData.map((service: { name: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; bgColor: any; image: string | StaticImport; }, serviceIndex: React.Key | null | undefined) => (
                        <a
                          onClick={() => setActiveDropdown(null)}
                          key={serviceIndex}
                          href={`/service/${String(service.name ?? "").toLowerCase().replace(/\s+/g, "-")}`}
                          className="flex flex-col items-center text-center p-4 rounded-lg hover:bg-gray-50 transition-all duration-200 group"
                        >
                          <div
                            className={`w-16 h-16 ${service.bgColor} rounded-xl flex items-center justify-center text-white text-2xl mb-3 group-hover:scale-110 transition-transform shadow-lg overflow-hidden`}
                          >
                            <Image
                              width={30}
                              height={30}
                              loading="lazy"
                              priority={false}
                              src={service.image ? service.image : " "}
                              alt={typeof service.name === "string" ? service.name : String(service.name ?? "Service")}
                              className="w-full h-full object-cover"
                            />
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
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">
                        Our Superstar Developers
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed max-w-md mb-4">
                        Build your dream team with our expert developers. Hire skilled
                        professionals for your project needs.
                      </p>
                      <a
                        onClick={() => setActiveDropdown(null)}
                        href="#"
                        className="text-orange-500 text-sm font-medium hover:text-orange-600 transition-colors"
                      >
                        View All Developers →
                      </a>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                      {developers.map((developer, developerIndex) => (
                        <a
                          onClick={() => setActiveDropdown(null)}
                          key={developerIndex}
                          href={developer.href}
                          className="flex flex-col items-center text-center p-4 rounded-lg hover:bg-gray-50 transition-all duration-200 group"
                        >
                          <div
                            className={`w-16 h-16 ${developer.bgColor} rounded-xl flex items-center justify-center text-white text-2xl mb-3 group-hover:scale-110 transition-transform shadow-lg`}
                          >
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
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">
                        Industries We Serve
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed max-w-md mb-4">
                        Empowering diverse industries with innovative digital solutions
                        tailored to their unique needs.
                      </p>
                      <a
                        onClick={() => setActiveDropdown(null)}
                        href="/industry"
                        className="text-orange-500 text-sm font-medium hover:text-orange-600 transition-colors"
                      >
                        View All Industries →
                      </a>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                      {industries.map((industry, industryIndex) => (
                        <a
                          onClick={() => setActiveDropdown(null)}
                          key={industryIndex}
                          href={industry.href}
                          className="flex flex-col items-center text-center p-4 rounded-lg hover:bg-gray-50 transition-all duration-200 group"
                        >
                          <div
                            className={`w-16 h-16 ${industry.bgColor} rounded-xl flex items-center justify-center text-white text-2xl mb-3 group-hover:scale-110 transition-transform shadow-lg overflow-hidden`}
                          >
                            <Image
                              width={40}
                              height={40}
                              loading="lazy"
                              priority={false}
                              src={industry.imageUrl ? industry.imageUrl : " "}
                              alt={industry.name}
                              className="w-full h-full object-cover"
                            />
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
                      onClick={() => setActiveDropdown(null)}
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
          )
        )}
        </div>

        {/* Mobile menu button */}
        <div className="lg:hidden flex">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-transparent text-gray-800 px-2 py-1.5 rounded-md text-sm transition-colors border-2 border-orange-500 hover:bg-orange-400 hover:text-white hover:outline-none hover:border-orange-500"
          >
            Consult Experts
          </button>
          <button
            onClick={toggleMobileMenu}
            className="p-2 ml-2 rounded-md text-gray-700 hover:text-orange-500 hover:bg-gray-50 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <div className="w-8 h-5 flex flex-col justify-between cursor-pointer">
                <span className="h-1 w-4 bg-orange-500 rounded"></span>
                <span className="h-1 w-6 bg-orange-500 rounded"></span>
                <span className="h-1 bg-orange-500 rounded"></span>
              </div>
            )}
          </button>
        </div>
      </div>
    </div>

    <div className="lg:hidden bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center items-center py-1">
          <div className="flex items-center space-x-2 text-sm">
            <a
              href={`mailto:${contact.email}`}
              className="flex items-center space-x-2 text-gray-600 hover:text-orange-500 transition-colors"
            >
              <Mail className="w-4 text-red-400 animate-pulse h-4" />
              <span>{contact.email}</span>
            </a>
            <div className="h-4 w-px bg-gray-300" />
            <a href={`tel:${contact.phoneNumber}`} className="flex items-center space-x-1 text-gray-600">
              <Phone className="w-4 animate-pulse text-green-500 h-4" />
              <span>{contact.phoneNumber}</span>
            </a>
          </div>
        </div>
      </div>
    </div>

    {/* Mobile Navigation */}
    <div
      className={`lg:hidden transition-all duration-300 ease-in-out ${
        isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
      } overflow-hidden bg-white border-t border-gray-200`}
    >
      <div className="px-4 py-4 space-y-2">
        {/* Mobile Contact Info */}
        <div className="border-b border-gray-200 pb-4 mb-4">
          <div className="space-y-2 text-sm">
            <a
              href={`mailto:${contact.email}`}
              className="flex items-center space-x-2 text-gray-600 py-2"
            >
              <Mail className="w-4 h-4" />
              <span>{contact.email}</span>
            </a>
            <a
              href={`tel:${contact.phoneNumber}`}
              className="flex items-center space-x-2 text-gray-600 py-2"
            >
              <Phone className="w-4 h-4" />
              <span>{contact.phoneNumber}</span>
            </a>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-orange-500 text-white px-4 py-1 rounded-md text-base font-medium transition-colors border-2 border-orange-500 hover:bg-white hover:text-orange-500 hover:outline-none hover:border-orange-500"
            >
              Consult Experts
            </button>
            {/* Dynamic Address */}
            <div className="text-sm text-gray-600 py-2">
              
             
              <MapPin className="w-4 h-4 inline-block mr-1" />
              <span>{contact.address}</span>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Items */}
        {navItems.map((item, index) => (
          <div key={index} className="border-b border-gray-100 last:border-b-0">
            <div className="flex items-center justify-between">
              <a
                href={item.href}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setActiveDropdown(null);
                }}
                className={`flex-1 py-3 text-base font-medium ${
                  item.isActive ? "text-orange-500" : "text-gray-700"
                }`}
              >
                {item.label}
              </a>
              {item.hasDropdown && (
                <button
                  onClick={() => handleDropdownClick(item.label)}
                  className="p-2 text-gray-500 hover:text-orange-500 transition-colors"
                >
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${
                      activeDropdown === item.label ? "rotate-180" : ""
                    }`}
                  />
                </button>
              )}
            </div>

            {/* Mobile Dropdown */}
            {item.hasDropdown && (
              <div
                className={`transition-all duration-300 ease-in-out ${
                  activeDropdown === item.label
                    ? "max-h-[80vh] opacity-100 overflow-y-auto"
                    : "max-h-0 opacity-0"
                } overflow-hidden`}
              >
                <div className="pl-4 pb-2">
                  {item.isServicesDropdown ? (
                    <div className="grid grid-cols-2 gap-2 py-2">
                      {servicesData.map((service: { name: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; image: string | Blob | undefined; }, serviceIndex: React.Key | null | undefined) => (
                        <a
                          key={serviceIndex}
                          href={`/service/${String(service.name ?? "").toLowerCase().replace(/\s+/g, "-")}`}
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                            setActiveDropdown(null);
                          }}
                          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm overflow-hidden`}>
                            <img
                              src={service.image}
                              
                              className="w-full h-full object-cover"
                            />
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
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                            setActiveDropdown(null);
                          }}
                          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div
                            className={`w-8 h-8 ${developer.bgColor} rounded-lg flex items-center justify-center text-white text-sm`}
                          >
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
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                            setActiveDropdown(null);
                          }}
                          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div
                            className={`w-8 h-8 ${industry.bgColor} rounded-lg flex items-center justify-center text-white text-sm overflow-hidden`}
                          >
                            <img
                              src={industry.imageUrl}
                              alt={industry.name}
                              className="w-full h-full object-cover"
                            />
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
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          setActiveDropdown(null);
                        }}
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

    <RequestQuoteModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
  </nav>
  );
};

export default Navbar;