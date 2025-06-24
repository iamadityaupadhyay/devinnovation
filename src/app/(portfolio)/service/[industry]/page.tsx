import ServiceForm from "../../components/Forms/CommonForm";
import DevelopmentRoadmap from "../../components/Landing/DevelopmentLifecycle";

import WhyChooseUs from "../WhyChooseUs";
import WhyChooseUsSection from "../Whychooseuss";
interface ServiceItem {
  name: string;
  href: string;
  imageUrl: string;
  description: string;
}

const servicesData: ServiceItem[] = [
  {
    name: "Web Development",
    href: "web-development",
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
    description: "Custom web applications and responsive websites built with modern technologies"
  },
  {
    name: "Mobile Apps",
    href: "mobile-apps",
    imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Native and cross-platform mobile applications for iOS and Android"
  },
  {
    name: "UI/UX Design",
    href: "ui-ux-design",
    imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2064&q=80",
    description: "User-centered design solutions that create engaging digital experiences"
  },
  {
    name: "Digital Marketing",
    href: "digital-marketing",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80",
    description: "Strategic digital marketing campaigns to grow your online presence"
  },
  {
    name: "E-commerce",
    href: "e-commerce",
    imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    description: "Powerful e-commerce platforms that drive sales and customer engagement"
  },
  {
    name: "Cloud Solutions",
    href: "cloud-solutions",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
    description: "Scalable cloud infrastructure and migration services for modern businesses"
  },
  {
    name: "AI & ML",
    href: "ai-ml",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2332&q=80",
    description: "Intelligent automation and machine learning solutions for business optimization"
  },
  {
    name: "DevOps",
    href: "devops",
    imageUrl: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
    description: "Streamlined development operations and continuous integration pipelines"
  },
  {
    name: "Quality Assurance",
    href: "quality-assurance",
    imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Comprehensive testing and quality assurance services for reliable software"
  },
  {
    name: "Consulting",
    href: "consulting",
    imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
    description: "Strategic technology consulting to guide your digital transformation"
  }
];

interface IndustryPageProps {
  params: {
    industry: string;
  };
}

export default function IndustryPage({ params }: any) {
  const currentService = servicesData.find(service => service.href === params.industry) || {
    name: params.industry.replace(/-/g, ' '),
    imageUrl: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Professional IT solutions for your business needs"
  };

  return (
    <>
      <div className="relative  overflow-hidden">
        {/* Background Image with Arc at Bottom */}
        <div 
          className="absolute inset-0 lg:h-[80vh] h-[30vh] bg-cover bg-center"
          style={{
            backgroundImage: `url(${currentService.imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            clipPath: 'ellipse(100% 85% at 50% 0%)'
          }}
        >
          {/* Overlay for better content readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60"></div>
        </div>

        {/* Content Overlay - Positioned at half height */}
        <div className="relative pb-10 z-10 ">
          <div className="container mx-auto px-4 lg:px-8">
            {/* Hero Title Section - Top of image */}
            <div className="pt-12 pb-10 text-center">
              <h1 className="text-3xl lg:text-4xl uppercase font-bold text-white mb-4">
                {currentService.name}
              </h1>
              <p className="text-lg text-white/90 max-w-2xl mx-auto">
                {currentService.description}
              </p>
            </div>

            {/* Main Content Section - At half height */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start" >
              {/* Left Side - Your Content */}
              
              <WhyChooseUs/>
              <ServiceForm/>
              
            </div>
          </div>
        </div>
        <WhyChooseUsSection/>
        <DevelopmentRoadmap/>
        

      </div>

     
    </>
  );
}

export async function generateStaticParams() {
  return servicesData.map(service => ({
    industry: service.href
  }));
}