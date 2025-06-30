import Link from 'next/link';
import React from 'react'
import CallToAction from '../components/Portfolio/CallToAction';
import OurMagicalProcess from '../components/Portfolio/OurMagicalProcess';

function IndustrySolutions() {
  const industries = [
    { 
      name: 'Airline', 
      icon: '✈️',
      category: 'TRAVEL & TRANSPORT',
      description: 'Flight Booking\nBaggage Tracking\nMiles Programs\nRoute Planning',
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&h=300&fit=crop'
    },
    { 
      name: 'E-Commerce', 
      icon: '🛒',
      category: 'ONLINE RETAIL',
      description: 'Product Catalog\nPayment Gateway\nInventory Management\nOrder Tracking',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop'
    },
    { 
      name: 'Entertainment', 
      icon: '🎬',
      category: 'MEDIA & CONTENT',
      description: 'Content Streaming\nUser Engagement\nContent Analytics\nRecommendations',
      image: 'https://images.unsplash.com/photo-1735212769704-d03b95dd1a14?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZW50ZXJ0YWlubWVudCUyMGFwcHN8ZW58MHx8MHx8fDA%3D'
    },
    { 
      name: 'Event', 
      icon: '🎪',
      category: 'EVENT MANAGEMENT',
      description: 'Event Planning\nTicket Booking\nVenue Management\nAttendee Tracking',
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=300&fit=crop'
    },
    { 
      name: 'Finance', 
      icon: '💳',
      category: 'FINTECH SOLUTIONS',
      description: 'Digital Payments\nBudget Tracking\nInvestment Tools\nCredit Analytics',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop'
    },
    { 
      name: 'Healthcare', 
      icon: '🏥',
      category: 'DIGITAL HEALTH REVOLUTION',
      description: 'Telemedicine\nHealth Records\nAppointment Booking\nHealth Monitoring',
      image: 'https://plus.unsplash.com/premium_photo-1661671897851-9a47fd29e858?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aGVhbHRoY2FyZSUyMGFwcHN8ZW58MHx8MHx8fDA%3D'
    },
    { 
      name: 'News App', 
      icon: '📰',
      category: 'DIGITAL MEDIA',
      description: 'Real-time News\nPersonalization\nContent Curation\nReader Analytics',
      image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=300&fit=crop'
    },
    { 
      name: 'Non-Profit', 
      icon: '🤝',
      category: 'SOCIAL IMPACT',
      description: 'Donation Platform\nVolunteer Management\nCampaign Tracking\nImpact Analytics',
      image: 'https://images.unsplash.com/photo-1593113630400-ea4288922497?w=400&h=300&fit=crop'
    },
    { 
      name: 'On-Demand', 
      icon: '🚗',
      category: 'MOBILITY SOLUTIONS',
      description: 'Real-time Tracking\nDynamic Pricing\nMulti-modal Transport\nCarbon Footprint',
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop'
    },
    { 
      name: 'E-Learning', 
      icon: '📚',
      category: 'EDUCATION TECHNOLOGY',
      description: 'Interactive Courses\nProgress Tracking\nCertifications\nPeer Learning',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop'
    },
    { 
      name: 'Shopping', 
      icon: '🛍️',
      category: 'RETAIL EXPERIENCE',
      description: 'Product Discovery\nAR Try-ons\nWishlist Features\nSocial Shopping',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop'
    },
    { 
      name: 'Fitness App', 
      icon: '🏋️',
      category: 'HEALTH & FITNESS',
      description: 'Workout Plans\nProgress Tracking\nNutrition Guide\nFitness Community',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
    },
    { 
      name: 'Gaming', 
      icon: '🎮',
      category: 'INTERACTIVE ENTERTAINMENT',
      description: 'Multiplayer Gaming\nLeaderboards\nIn-app Purchases\nSocial Features',
      image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop'
    },
    { 
      name: 'Lifestyle App', 
      icon: '🌟',
      category: 'LIFESTYLE & WELLNESS',
      description: 'Daily Habits\nGoal Setting\nMindfulness\nLife Coaching',
      image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop'
    },
    { 
      name: 'Political', 
      icon: '🏛️',
      category: 'CIVIC ENGAGEMENT',
      description: 'Voter Information\nCampaign Management\nPubic Forums\nPolicy Tracking',
      image: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=400&h=300&fit=crop'
    },
    { 
      name: 'Real Estate', 
      icon: '🏠',
      category: 'PROPERTY SOLUTIONS',
      description: 'Property Search\nVirtual Tours\nMarket Analytics\nMortgage Calculator',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop'
    },
    { 
      name: 'Restaurant', 
      icon: '🍽️',
      category: 'FOOD & DINING',
      description: 'Online Ordering\nTable Reservations\nMenu Management\nDelivery Tracking',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop'
    },
    { 
      name: 'SaaS', 
      icon: '☁️',
      category: 'CLOUD SOLUTIONS',
      description: 'Cloud Infrastructure\nAPI Integration\nData Analytics\nScalable Architecture',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop'
    },
    { 
      name: 'Social Networking', 
      icon: '👥',
      category: 'SOCIAL PLATFORMS',
      description: 'User Connections\nContent Sharing\nMessaging System\nCommunity Building',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop'
    },
    { 
      name: 'Sports', 
      icon: '⚽',
      category: 'SPORTS & RECREATION',
      description: 'Live Scores\nTeam Management\nStats Analytics\nFan Engagement',
      image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400&h=300&fit=crop'
    },
    { 
      name: 'Travel App', 
      icon: '🧳',
      category: 'TRAVEL & TOURISM',
      description: 'Trip Planning\nBooking Management\nLocal Guides\nTravel Community',
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop'
    },
    { 
      name: 'Wellness App', 
      icon: '🧘',
      category: 'MENTAL WELLNESS',
      description: 'Meditation Guide\nMood Tracking\nStress Management\nWellness Community',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop'
    }
  ];

  return (
    <div>
      <section className="pb-16 bg-gradient-to-r from-yellow-50 to-orange-50 backdrop-blur-xl">
         <div className="relative mb-5   rounded-b-lg">
        <div
          className="h-[30vh] lg:h-[40vh]  bg-cover"
          style={{
            backgroundImage: `url(https://plus.unsplash.com/premium_photo-1680608979589-e9349ed066d5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aXQlMjBpbmR1c3RyeXxlbnwwfHwwfHx8MA%3D%3D)`,
            backgroundColor: '#e5e7eb', // Fallback color
          }}
        >
          <div className="absolute inset-0 bg-black/80"></div> {/* Subtle overlay */}
          <div className="absolute inset-0 flex flex-col items-center  justify-center">
            <h1 className="text-3xl lg:text-3xl font-black text-white">Our 
              Industries
              <span className="ml-2 bg-gradient-to-r from-orange-400 to-red-500 text-transparent bg-clip-text">
                
               We Serves
               </span></h1>
            <p className="text-center lg:max-w-md max-w-sm text-gray-300 mt-2">
              Explore our diverse industry solutions designed to transform your business with cutting-edge technology and innovation.
            </p>
          
          </div>
        </div>
      </div>
        <div className="max-w-7xl px-2 mx-auto">
          

          <div className="grid md:grid-cols-4 gap-8">
            {industries.map((industry, index) => (
              <div 
                key={index}
                className="group relative backdrop-blur-xl rounded-md p-5 border border-slate-700/50 hover:border-orange-400/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 bg-white/80"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-orange-500 text-xs font-semibold uppercase tracking-wider">
                    {industry.category}
                  </span>
                </div>
                
                <div className="text-2xl font-black text-gray-700 mb-4 group-hover:text-orange-400 transition-colors">
                  {industry.name}
                </div>
                
                <div className="space-y-2 mb-6">
                  {industry.description.split('\n').map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                      <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Link href={`/service/${industry.name.replaceAll(" ","-").toLowerCase()}`} className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-full text-sm transition-all duration-300 transform hover:scale-105 flex items-center gap-2 group-hover:shadow-lg mb-6">
                  BUILD NOW
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                
                <div className="relative overflow-hidden rounded-lg group-hover:scale-105 transition-transform duration-300">
                  <img 
                    src={industry.image}
                    alt={industry.name}
                    className="w-full h-32 object-cover"
                    
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-2 right-2 text-2xl opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                    {industry.icon}
                  </div>
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

export default IndustrySolutions