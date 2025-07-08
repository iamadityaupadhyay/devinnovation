"use client";
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqData = [
  {
    question: "How do you ensure the security and quality of the software you develop?",
    answer:
      "We implement multiple layers of security and quality assurance including code reviews, automated testing, penetration testing, secure coding practices, and compliance with industry standards like OWASP. Our QA process includes unit testing, integration testing, performance testing, and user acceptance testing to ensure your software meets the highest quality standards.",
  },
  {
    question: "Will the app be customized as per my requirements?",
    answer:
      "Absolutely! Every app we develop is fully customized to meet your specific business requirements. We work closely with you to understand your vision, target audience, and unique needs. Our team creates tailored solutions that align with your brand identity, business goals, and user expectations.",
  },
  {
    question: "What platforms do you develop apps for?",
    answer:
      "We develop apps for all major platforms including iOS (iPhone/iPad), Android, web applications, and cross-platform solutions using React Native and Flutter. We also specialize in wearable app development for Apple Watch, Android Wear, and other IoT devices.",
  },
  {
    question: "How long does it typically take to develop an app?",
    answer:
      "Development timelines vary based on app complexity and features. Simple apps typically take 2-3 months, medium complexity apps take 4-6 months, and complex enterprise applications can take 6-12 months. We provide detailed project timelines during the consultation phase.",
  },
  {
    question: "Do you provide ongoing support and maintenance?",
    answer:
      "Yes, we provide comprehensive post-launch support including bug fixes, performance monitoring, security updates, feature enhancements, and platform compatibility updates. We offer flexible maintenance packages to ensure your app stays current and performs optimally.",
  },
  {
    question: "What is the process for app development?",
    answer:
      "Our app development process follows a comprehensive 6-stage approach: Discovery & Planning, UI/UX Design, Development, Quality Assurance, Deployment, and Maintenance. We start by understanding your business requirements, create wireframes and prototypes, develop using agile methodology, conduct rigorous testing, launch your app on relevant platforms, and provide ongoing support and updates.",
  },
];

const FAQComponent = () => {
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (index) => {
    setOpenItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="bg-gradient-to-r from-white to-gray-50 px-2 py-16 flex justify-center">
      <div className="w-full max-w-full mx-auto">
        {/* Header */}
        <div className="text-center mb-10 animate-fade-in">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mb-4 shadow-lg animate-bounce-slow">
            <span className="text-2xl font-bold text-white">?</span>
          </div>
          <h1 className="text-3xl font-bold sm:tracking-tight mb-4">
            Frequently{" "}
            <span className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
              Asked Questions
            </span>
          </h1>
        </div>

        {/* FAQ Items */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2 animate-fade-in-up">
          {faqData.map((item, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl shadow-lg border border-orange-100 overflow-hidden transition-all duration-500 hover:shadow-xl transform hover:-translate-y-1 ${
                openItems[index] ? "shadow-orange-200" : ""
              }`}
              style={{
                animationDelay: `${index * 100}ms`,
                animation: "slideInUp 0.6s ease-out forwards",
              }}
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between text-gray-800 hover:from-orange-100 hover:to-red-200 transition-all duration-300"
              >
                <span className="font-semibold text-base pr-4">{item.question}</span>
                <div className="flex-shrink-0 transition-transform duration-300">
                  {openItems[index] ? (
                    <ChevronUp className="w-6 h-6 transition-transform duration-300" />
                  ) : (
                    <ChevronDown className="w-6 h-6 transition-transform duration-300" />
                  )}
                </div>
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openItems[index] ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 py-5 text-gray-700 leading-relaxed bg-gradient-to-r from-orange-50 to-transparent">
                  <div className="transform transition-transform duration-300">
                    {item.answer}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <style jsx>{`
          @keyframes slideInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes fade-in {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes fade-in-up {
            from {
              opacity: 0;
              transform: translateY(40px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes bounce-slow {
            0%, 20%, 50%, 80%, 100% {
              transform: translateY(0);
            }
            40% {
              transform: translateY(-10px);
            }
            60% {
              transform: translateY(-5px);
            }
          }
          .animate-fade-in {
            animation: fade-in 0.8s ease-out;
          }
          .animate-fade-in-up {
            animation: fade-in-up 1s ease-out 0.5s both;
          }
          .animate-bounce-slow {
            animation: bounce-slow 3s infinite;
          }
        `}</style>
      </div>
    </div>
  );
};

export default FAQComponent;
