"use client"
import React from 'react';

const WhyChooseUs = () => {
  const features = [
    {
      title: "100% Customer Satisfaction",
      description: "We guarantee complete satisfaction with our services and deliver excellence in every project.",
      icon: "/icons/like.gif",
      bgColor: "bg-amber-50",
      iconBg: "bg-amber-100",
      textColor: "text-amber-600"
    },
    {
      title: "Quality Assurance",
      description: "Rigorous testing and quality control processes ensure flawless performance.",
      icon: "/icons/badge.gif",
      bgColor: "bg-yellow-50",
      iconBg: "bg-yellow-100",
      textColor: "text-yellow-600"
    },
    {
      title: "Deliver on Time",
      description: "We respect deadlines and ensure timely delivery of all projects without compromising quality.",
      icon: "/icons/delivery-truck.gif",
      bgColor: "bg-green-50",
      iconBg: "bg-green-100",
      textColor: "text-green-600"
    },
    {
      title: "24*7 Support & Maintenance",
      description: "Round-the-clock support and maintenance services to keep your applications running smoothly.",
      icon: "/icons/24-7.gif",
      bgColor: "bg-orange-50",
      iconBg: "bg-orange-100",
      textColor: "text-orange-600"
    },
    {
      title: "Free Consultation",
      description: "Get expert advice and consultation for your project requirements at no cost.",
      icon: "/icons/medical-consultation.gif",
      bgColor: "bg-purple-50",
      iconBg: "bg-purple-100",
      textColor: "text-purple-600"
    },
    {
      title: "Trendy Design & Technologies",
      description: "Stay ahead with cutting-edge designs and latest technology implementations.",
      icon: "/icons/digital-art.gif",
      bgColor: "bg-pink-50",
      iconBg: "bg-pink-100",
      textColor: "text-pink-600"
    },
    {
      title: "Cost Effective",
      description: "Premium quality services at competitive prices that fit your budget perfectly.",
      icon: "/icons/reduce-cost.gif",
      bgColor: "bg-emerald-50",
      iconBg: "bg-emerald-100",
      textColor: "text-emerald-600"
    },
    {
      title: "Time to Time Upgradation",
      description: "Regular updates and improvements to keep your solutions current and efficient.",
      icon: "/icons/hourglass.gif",
      bgColor: "bg-orange-50",
      iconBg: "bg-orange-100",
      textColor: "text-orange-600"
    }
  ];

  return (
    <div className='flex flex-col'>
    <section className=" bg-orange-100/70 backdrop-blur-sm rounded-xl py-4  px-4 ">
     <div className="grid grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`rounded-2xl p-4 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border bg-white/25 border-white group cursor-pointer `}
            >
              {/* Icon */}
              

              {/* Content */}
              <div className='flex flex-row items-center text-center'>
                <div className="w-12 h-10 md:w-10 lg:w-14 md:h-10 lg:h-14  rounded-full flex items-center justify-center">
                          <img src={feature.icon} alt={feature.title} className='w-16  rounded-full' />
                        </div>
                <h3 className={`ml-2 font-semibold lg:text-base text-md leading-tight`}>
                  {feature.title}
                </h3>
                
              </div>
            </div>
          ))}
        </div>
        

    </section>
  
    <div className="mt-14">
          <div className="">
            <div className="  rounded-2xl overflow-hidden shadow-2xl border border-orange-200">
              <img
                src="https://plus.unsplash.com/premium_photo-1661770215081-5263b8e1e92c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGRldmVsb3BtZW50JTIwdGVhbXxlbnwwfHwwfHx8MA%3D%3D"
                alt="Development team working together"
                className="lg:w-full w-screen  h-72 object-cover"
              />
            </div>
          </div>
        </div>
        </div>
  ) 
};

export default WhyChooseUs;