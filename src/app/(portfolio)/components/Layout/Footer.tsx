import Link from 'next/link';
import { 
    FaLinkedin, 
    FaTwitter, 
    FaFacebook, 
    FaInstagram,
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaEnvelope,
    FaGlobeAmericas,
    FaMobileAlt,
    FaLaptopCode
} from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';

export default function ModernFooter({ contact }: any) {
    const industries = [
        { name: 'Airline', icon: '✈️' },
        { name: 'E-Commerce', icon: '🛒' },
        { name: 'Entertainment', icon: '🎬' },
        { name: 'Event', icon: '🎪' },
        { name: 'Finance', icon: '💳' },
        { name: 'Healthcare', icon: '🏥' },
        { name: 'News App', icon: '📰' },
        { name: 'Non-Profit', icon: '🤝' },
        { name: 'On-Demand', icon: '🚗' },
        { name: 'E-Learning', icon: '📚' },
        { name: 'Fitness App', icon: '🏋️' },
        { name: 'Gaming', icon: '🎮' },
        { name: 'Lifestyle App', icon: '🌟' },
        { name: 'Political', icon: '🏛️' },
        { name: 'Real Estate', icon: '🏠' },
        { name: 'Restaurant', icon: '🍽️' },
        { name: 'SaaS', icon: '☁️' },
        { name: 'Social Networking', icon: '👥' },
        { name: 'Sports', icon: '⚽' },
        { name: 'Travel App', icon: '🧳' },
        { name: 'Wellness App', icon: '🧘' }
    ];

    const quickLinks = [
        { name: 'Home', href: '/' },
        { name: 'Portfolio', href: '/portfolio' },
        { name: 'Services', href: '/services' },
        { name: 'Projects', href: '/projects' },
        { name: 'Clients', href: '/clients' },
        { name: 'Team', href: '/team' },
    
    ];

    return (
        <footer className="bg-gray-900  max-w-7xl text-gray-300 border-t-4 border-orange-500">
            <div className="container mx-auto px-6 py-7">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    
                    {/* Company Info */}
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-white">
                            <span className="text-orange-500">Dev</span>invo
                        </h3>
                        <p className="flex items-start">
                            <FaLaptopCode className="text-orange-500 mt-1 mr-2 flex-shrink-0" />
                            Full stack mobile (iOS, Android) and web app design and development agency
                        </p>
                        
                        <div className="flex space-x-4">
  <Link
    href={contact?.linkedin || "#"}
    className="text-gray-400 hover:text-orange-500 transition-colors duration-300"
  >
    <FaLinkedin size={20} />
  </Link>
  <Link
    href={contact?.twitter || "#"}
    className="text-gray-400 hover:text-orange-500 transition-colors duration-300"
  >
    <FaTwitter size={20} />
  </Link>
  <Link
    href={contact?.facebook || "#"}
    className="text-gray-400 hover:text-orange-500 transition-colors duration-300"
  >
    <FaFacebook size={20} />
  </Link>
  <Link
    href={contact?.instagram || "#"}
    className="text-gray-400 hover:text-orange-500 transition-colors duration-300"
  >
    <FaInstagram size={20} />
  </Link>
</div>
                    </div>

                    {/* Industries Section - Improved */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-6 pb-2 border-b border-orange-500 inline-block">
                            Industries We Serve
                        </h4>
                        <div className="grid grid-cols-2 gap-3">
                            {industries.map((industry) => (
                                <div key={industry.name} className="flex items-center hover:text-orange-500 transition-colors duration-300">
                                    <Link href={`/service/${industry.name.toLowerCase().replace(/ /g, '-')}`}>
                                        {industry.name}
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-6 pb-2 border-b border-orange-500 inline-block">
                            Quick Links
                        </h4>
                        <ul className="grid grid-cols-2 md:grid-cols-2 gap-3">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="flex items-center hover:text-orange-500 transition-colors duration-300">
                                        <FiExternalLink className="mr-2 text-orange-500" size={14} />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Information */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-6 pb-2 border-b border-orange-500 inline-block">
                            Contact Us
                        </h4>
                        <div className="space-y-4">
                            <div className="flex items-start">
                                <FaMapMarkerAlt className="text-orange-500 mt-1 mr-3 flex-shrink-0" />
                                <address className="not-italic">
                                    {contact?.address || 'Raju Pan Bhandar ke bagal me, Suresh Nai ke Dukaan ke samne, 3rd Floor, B Block, Sector 62, Noida, Uttar Pradesh 201301'}
                                </address>
                            </div>
                            
                            <div className="flex items-center">
                                <FaPhoneAlt className="text-orange-500 mr-3" />
                                <Link href={`tel:${contact?.phoneNumber || '+91 8840250584'}`} className="hover:text-orange-500 transition-colors duration-300">
                                    {contact?.phoneNumber || '+91 8840250584'}
                                </Link>
                            </div>
                            
                            <div>
                                <div className="flex items-center text-orange-500 mb-1">
                                    <FaEnvelope className="mr-3" />
                                    <span className="text-white">Sales:</span>
                                </div>
                                <div className="ml-6 space-y-1">
                                    <Link href={`mailto:${contact?.email || 'trackode.ai@gmail.com'}`} className="block hover:text-orange-500 transition-colors duration-300">
                                        {contact?.email || 'trackode.ai@gmail.com'}
                                    </Link>
                                </div>
                            </div>
                            
                            <div>
                                <div className="flex items-center text-orange-500 mb-1">
                                    <FaEnvelope className="mr-3" />
                                    <span className="text-white">HR:</span>
                                </div>
                                <div className="ml-6">
                                    <Link href={`mailto:${contact?.emailHR || 'trackode.ai@gmail.com'}`} className="hover:text-orange-500 transition-colors duration-300">
                                        {contact?.emailHR || 'trackode.ai@gmail.com'}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Copyright Section */}
                <div className="mt-8 pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm">
                        © Copyrights 2025-{new Date().getFullYear()} Devinvo Pvt. Ltd. All Rights Reserved.
                    </p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <Link href="/privacy" className="text-sm hover:text-orange-500 transition-colors duration-300">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="text-sm hover:text-orange-500 transition-colors duration-300">
                            Terms of Service
                        </Link>
                        <Link href="/cookies" className="text-sm hover:text-orange-500 transition-colors duration-300">
                            Cookie Policy
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}