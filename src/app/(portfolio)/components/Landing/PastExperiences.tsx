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
    <div className="min-h-screen bg-gradient-to-br from-white-50 via-yellow-50 to-orange-50 py-16 px-4">
      

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
                  className={`group relative overflow-hidden rounded-2xl ${stat.bgColor} p-5 transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
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
                    <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-white shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className={`w-4 h-4 sm:w-8 sm:h-8 ${stat.iconColor}`} />
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
            <div className="w-full rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-orange-100 to-orange-200 border border-orange-200 flex flex-col justify-center items-center relative group transition-transform duration-500 hover:scale-105 hover:shadow-2xl">
              <Link href="/hire" className="block w-full h-full lg:p-7 p-4 text-center">
                
                <p className="font-bold lg:text-lg text-orange-900 group-hover:text-orange-950 transition-colors duration-300">
                  Superstar Software Developers
                </p>
                 <span
                
                className="inline-block bg-orange-500 text-white px-4 py-2 rounded-md text-sm lg:text-base font-medium hover:bg-orange-600 transition-colors mt-2"
              >
                Consult Experts
              </span>
                
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