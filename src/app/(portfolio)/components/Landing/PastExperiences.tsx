"use client";
import { useState, useEffect } from "react";
import { Users, Smartphone, Globe, Award, Download, Code, ArrowBigRight } from "lucide-react";
import Link from "next/link";

export default function PastExperiences() {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState({
    experience: 0,
    mobileApps: 0,
    websites: 0,
    developers: 0,
  });

  const stats = [
    {
      id: "experience",
      icon: Users,
      value: 12,
      suffix: "+",
      label: "Years of Experience",
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
    },
    {
      id: "mobileApps",
      icon: Smartphone,
      value: 45,
      suffix: "+",
      label: "Mobile Apps Developed",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      id: "websites",
      icon: Globe,
      value: 20,
      suffix: "+",
      label: "Websites Developed",
      color: "from-pink-500 to-rose-500",
      bgColor: "bg-pink-50",
      iconColor: "text-pink-600",
    },
    {
      id: "developers",
      icon: Code,
      value: 10,
      suffix: "+",
      label: "Dedicated Developers",
      color: "from-orange-600 to-red-600",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
    },
  ];

  // Animation trigger
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Counter animation
  useEffect(() => {
    if (!isVisible) return;

    const animateCounters = () => {
      stats.forEach((stat) => {
        const duration = 2000;
        const steps = 60;
        const increment = stat.value / steps;
        let current = 0;

        const timer = setInterval(() => {
          current += increment;
          if (current >= stat.value) {
            current = stat.value;
            clearInterval(timer);
          }

          setCounters((prev) => ({
            ...prev,
            [stat.id]: Math.floor(current),
          }));
        }, duration / steps);
      });
    };

    const delay = setTimeout(animateCounters, 500);
    return () => clearTimeout(delay);
  }, [isVisible]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-orange-50 via-yellow-50 to-orange-50 py-16 px-4">
      

      <div className="mx-auto flex flex-col md:flex-row justify-center items-start gap-8">
        {/* Left Side Image Section */}
        <div className="flex-1">
          <div className="relative">
            <div className=" lg:h-screen rounded-2xl overflow-hidden shadow-2xl border border-orange-200">
              <img
                src="https://plus.unsplash.com/premium_photo-1661770215081-5263b8e1e92c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGRldmVsb3BtZW50JTIwdGVhbXxlbnwwfHwwfHx8MA%3D%3D"
                alt="Development team working together"
                className="lg:w-full w-screen  h-96 lg:h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Right Side: Stats and Images */}
        <div className="flex-1 flex flex-col gap-8">
          {/* Stats Grid at the top */}
          <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div
                  key={stat.id}
                  className={`group relative overflow-hidden rounded-2xl ${stat.bgColor} p-3 transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-gradient-to-br from-current to-transparent"></div>
                    <div className="absolute -bottom-8 -left-8 w-16 h-16 rounded-full bg-gradient-to-tr from-current to-transparent"></div>
                  </div>

                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${stat.color} p-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                    <div className={`w-full h-full rounded-2xl ${stat.bgColor}`}></div>
                  </div>

                  <div className="relative z-10">
                    <div className={`inline-flex items-center justify-center w-7 h-7 sm:w-10 sm:h-10 rounded-xl bg-white shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className={`w-2 h-2 sm:w-6 sm:h-6 ${stat.iconColor}`} />
                    </div>

                    <div className="mb-2">
                      <div className="flex items-baseline gap-1">
                        <span className={`text-xl sm:text-2xl md:text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                          {counters[stat.id as keyof typeof counters]}
                        </span>
                        <span className={`text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                          {stat.suffix}
                        </span>
                      </div>
                    </div>

                    <p className="text-gray-700 font-medium text-sm sm:text-lg leading-tight">
                      {stat.label}
                    </p>

                    <div className={`absolute top-2 right-2 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gradient-to-r ${stat.color} opacity-60 group-hover:scale-150 transition-transform duration-300`}></div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Two images below stats, same width as stats grid */}
          <div className="flex gap-4">
            <div className="w-full rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-orange-100 to-orange-200 border border-orange-200">
              <img
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&auto=format&fit=crop&q=60"
                alt="Team brainstorming"
                className="w-full h-32 sm:h-40 object-cover"
              />
            </div>
           <div className="w-full rounded-2xl overflow-hidden shadow-lg    flex flex-col justify-center items-center relative group transition-transform duration-500 hover:scale-105 hover:shadow-2xl">
  <Link
    href="https://wa.me/918840250583?text=Hi I want to connect with you for app development"
    target="_blank"
    rel="noopener noreferrer"
    className="w-full   text-lg pb-2  text-center"
  >
    <div className="inline-flex items-center justify-center bg-green-100  text-gray-800 px-4 py-2 rounded-md text-base font-medium hover:bg-orange-600 hover:text-white transition-colors mt-2">
      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
      </svg>
      WhatsApp
    </div>
  </Link>
  
  <Link
    href="tel:+918840250583"
    className=" inline-flex items-center justify-center px-6 py-2 rounded-md bg-green-500 text-white font-medium text-base shadow-md transition-all duration-300 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 "
    
  >
    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M22 16.92V21a2 2 0 0 1-2.18 2A19.72 19.72 0 0 1 3 5.18 2 2 0 0 1 5 3h4.09a2 2 0 0 1 2 1.72c.13.81.36 1.6.68 2.34a2 2 0 0 1-.45 2.11l-1.27 1.27a16 16 0 0 0 6.29 6.29l1.27-1.27a2 2 0 0 1 2.11-.45c.74.32 1.53.55 2.34.68A2 2 0 0 1 22 16.92z" />
    </svg>
    Call Now
  </Link>
</div>
          </div>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="mt-12 text-center">
        <div className="flex flex-wrap justify-center items-center gap-6 opacity-60">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-gray-600 font-medium text-sm sm:text-base">ISO Certified</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-gray-600 font-medium text-sm sm:text-base">CMMI Level 3</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-purple-500 rounded-full animate-pulse"></div>
            <span className="text-gray-600 font-medium text-sm sm:text-base">Google Partner</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-orange-500 rounded-full animate-pulse"></div>
            <span className="text-gray-600 font-medium text-sm sm:text-base">AWS Partner</span>
          </div>
        </div>
      </div>
    </div>
  );
}