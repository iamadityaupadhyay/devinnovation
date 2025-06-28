import React from 'react';
import { CheckCircle, Shield, Clock, Users, Target, Award, Zap, Globe } from 'lucide-react';

const WhyChooseUsSection = () => {
  const features = [
    {
      icon: Shield,
      title: "Security & Privacy Assured",
      description: "NDA documents are handled with utmost confidentiality and security protocols are strictly maintained.",
      bgImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    {
      icon: Users,
      title: "Expert Team Deployed",
      description: "Seasoned professionals with extensive experience are assigned to every project for optimal results.",
      bgImage: "https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80"
    },
    {
      icon: Target,
      title: "Client Satisfaction Guaranteed",
      description: "Solutions are tailored to exceed expectations and ensure complete client satisfaction.",
      bgImage: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80"
    },
    {
      icon: Zap,
      title: "Innovative Processes Implemented",
      description: "Cutting-edge development methodologies and agile processes are utilized for superior outcomes.",
      bgImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80"
    },
    {
      icon: Globe,
      title: "Market Compatibility Ensured",
      description: "Strategic planning and market analysis are conducted to ensure perfect market alignment.",
      bgImage: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1174&q=80"
    },
    {
      icon: Clock,
      title: "Timeline Adherence Maintained",
      description: "Cost-effective delivery schedules are established and strictly followed for optimal project completion.",
      bgImage: "https://images.unsplash.com/photo-1501139083538-0139583c060f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    
  ];

  return (
    <section className=" py-8 bg-gradient-to-r from-orange-50 to yellow-50 px-4 sm:px-6 lg:px-8">
      <div className=" mx-auto">
        <div className="grid lg:grid-cols-3   gap-12 items-center">
          {/* Left Side - Mobile App Showcase */}
          <div className="relative hidden sm:block col-span-1 flex justify-center items-center">
            <div className="relative">
             
              {/* Main phone mockup */}
              <div className="relative bg-gradient-to-b opacity-50 hover:opacity-100 from-gray-800 to-gray-900 rounded-[2.5rem] p-2 shadow-2xl">
                <div className="bg-black rounded-[2rem] p-1">
                  <div className="bg-white rounded-[1.5rem] overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                      alt="Mobile App Interface"
                      className="w-full lg:h-[400px]  sm:h-[150px] object-cover"
                    />
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              
              <div className="absolute -bottom-4 -left-4 bg-orange-600 text-white px-3 py-1 rounded-full 
               font-semibold shadow-lg">
                100+ Projects
              </div>
            </div>
          </div>

          {/* Right Side - Why Choose Us Content */}
          <div className="lg:col-span-2  space-y-8">
            

            <div className="mt-5">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <div className="w-3 h-7 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full mr-3"></div>
                Connect with Excellence Today!
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {features.map((feature, index) => (
                  <div 
                    key={index} 
                    className="relative flex items-start space-x-3 p-3 rounded-lg hover:bg-orange-50 transition-colors duration-300 group overflow-hidden"
                  >
                    {/* Background image that appears on hover */}
                    <div className="absolute backdrop-blur-lg inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-20">
                      <img 
                        src={feature.bgImage} 
                        alt="" 
                        className="w-full h-full  object-cover"
                      />
                    </div>
                    
                    <div className="flex-shrink-0 z-10">
                      <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <feature.icon className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <div className="flex-1 z-10">
                      <h4 className="font-semibold text-gray-900 text-base mb-1">
                        {feature.title}
                      </h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;