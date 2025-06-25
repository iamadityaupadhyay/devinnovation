import React from 'react'
import Link from 'next/link';
import OurMagicalProcess from '../components/Portfolio/OurMagicalProcess';
import CallToAction from '../components/Portfolio/CallToAction';
function ServiceSolutions() {
  const services = [
    { 
      name: 'Web Development', 
      icon: '💻',
      bgColor: 'bg-blue-500',
      category: 'FRONTEND & BACKEND',
      description: 'Responsive Design\nFull-Stack Development\nAPI Integration\nDatabase Management',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop'
    },
    { 
      name: 'Mobile Apps', 
      icon: '📱',
      bgColor: 'bg-green-500',
      category: 'iOS & ANDROID',
      description: 'Native Development\nCross-Platform\nApp Store Optimization\nMobile UI/UX',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop'
    },
    { 
      name: 'UI/UX Design', 
      icon: '🎨',
      bgColor: 'bg-purple-500',
      category: 'DESIGN & EXPERIENCE',
      description: 'User Research\nWireframing\nPrototyping\nVisual Design',
      image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=300&fit=crop'
    },
    { 
      name: 'Digital Marketing', 
      icon: '📊',
      bgColor: 'bg-red-500',
      category: 'GROWTH & ANALYTICS',
      description: 'SEO Optimization\nSocial Media Marketing\nContent Strategy\nPPC Campaigns',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop'
    },
    { 
      name: 'E-commerce', 
      icon: '🛒',
      bgColor: 'bg-orange-500',
      category: 'ONLINE STORE SOLUTIONS',
      description: 'Shopping Cart\nPayment Integration\nInventory System\nOrder Management',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop'
    },
    { 
      name: 'Cloud Solutions', 
      icon: '☁️',
      bgColor: 'bg-cyan-500',
      category: 'INFRASTRUCTURE & HOSTING',
      description: 'Cloud Migration\nScalable Architecture\nData Storage\nBackup Solutions',
      image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=300&fit=crop'
    },
    { 
      name: 'AI & ML', 
      icon: '🤖',
      bgColor: 'bg-indigo-500',
      category: 'ARTIFICIAL INTELLIGENCE',
      description: 'Machine Learning\nData Analytics\nPredictive Models\nAutomation',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop'
    },
    { 
      name: 'DevOps', 
      icon: '⚙️',
      bgColor: 'bg-gray-600',
      category: 'DEPLOYMENT & OPERATIONS',
      description: 'CI/CD Pipeline\nInfrastructure as Code\nMonitoring\nAutomated Testing',
      image: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=400&h=300&fit=crop'
    },
    { 
      name: 'Quality Assurance', 
      icon: '✅',
      bgColor: 'bg-green-600',
      category: 'TESTING & VALIDATION',
      description: 'Automated Testing\nManual Testing\nPerformance Testing\nSecurity Testing',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop'
    },
    { 
      name: 'Consulting', 
      icon: '💡',
      bgColor: 'bg-yellow-500',
      category: 'STRATEGIC GUIDANCE',
      description: 'Technology Strategy\nDigital Transformation\nBusiness Analysis\nProject Planning',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop'
    }
  ];

  return (
    <div>
      <section className="py-10 px-2 bg-gradient-to-r from-yellow-50 to-orange-50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl text-gray-900 font-black mb-2">
             Our Core 
              <span className="ml-2 bg-gradient-to-r from-orange-400 to-red-500 text-transparent bg-clip-text">
               Services
              </span>
            </h2>
            
          </div>

          <div className="grid md:grid-cols-4 gap-8 mb-5">
            {services.map((service, index) => (
              <div 
                key={index}
                className="group relative backdrop-blur-xl rounded-3xl p-5 border border-slate-700/50 hover:border-orange-400/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 bg-white/80"
              >
                
                
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-orange-500 text-xs font-semibold uppercase tracking-wider">
                    {service.category}
                  </span>
                </div>
                
                <div className="text-xl font-black text-gray-700 mb-4 group-hover:text-orange-400 transition-colors ">
                  {service.name}
                </div>
                
                <div className="space-y-2 mb-6">
                  {service.description.split('\n').map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                      <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Link href={`/service/${service.name.toLowerCase().replaceAll(" ","-")}`} className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-full text-sm transition-all duration-300 transform hover:scale-105 flex items-center gap-2 group-hover:shadow-lg mb-6 mx-auto">
                  GET STARTED
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                
                <div className="relative overflow-hidden rounded-2xl group-hover:scale-105 transition-transform duration-300">
                  <img 
                    src={service.image}
                    alt={service.name}
                    className="w-full h-32 object-cover"
                    
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            ))}
          </div>

          
        </div>
      </section>
      <OurMagicalProcess/>
      <CallToAction/>
    </div>
  );
}

export default ServiceSolutions