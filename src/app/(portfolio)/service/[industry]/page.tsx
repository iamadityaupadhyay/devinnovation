import ServiceForm from "../../components/Forms/CommonForm";
import DevelopmentRoadmap from "../../components/Landing/DevelopmentLifecycle";
import { OurServices } from "../../components/Landing/OurServices";
import ServicesComponent from "../../components/Landing/Service";
import CallToAction from "../../components/Portfolio/CallToAction";
import OurMagicalProcess from "../../components/Portfolio/OurMagicalProcess";

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
  },
  // Additional services from the new image
  {
    name: "Mobile App Development",
    href: "mobile-app-development",
    imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Comprehensive mobile app development services"
  },
  {
    name: "Android App Development",
    href: "android-app-development",
    imageUrl: "https://images.unsplash.com/photo-1591200636279-6d832b3a2e0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Expert Android app development solutions"
  },
  {
    name: "Android VR App Development",
    href: "android-vr-app-development",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Innovative VR app development for Android"
  },
  {
    name: "Blockchain App Development",
    href: "blockchain-app-development",
    imageUrl: "https://images.unsplash.com/photo-1640932663090-83e24c9d6b5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Secure blockchain-based app development"
  },
  {
    name: "Chatbot App Development",
    href: "chatbot-app-development",
    imageUrl: "https://images.unsplash.com/photo-1600585154526-990d71a92051?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Intelligent chatbot application development"
  },
  {
    name: "Flutter App Development",
    href: "flutter-app-development",
    imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Cross-platform apps with Flutter"
  },
  {
    name: "Hybrid App Development",
    href: "hybrid-app-development",
    imageUrl: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Efficient hybrid app development services"
  },
  {
    name: "iOS App Development",
    href: "ios-app-development",
    imageUrl: "https://images.unsplash.com/photo-1591200636279-6d832b3a2e0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "High-quality iOS app development"
  },
  {
    name: "IoT App Development",
    href: "iot-app-development",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
    description: "IoT-enabled app development solutions"
  },
  {
    name: "Kotlin App Development",
    href: "kotlin-app-development",
    imageUrl: "https://images.unsplash.com/photo-1534126511022-8e5b7f7b8b4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Robust Kotlin-based app development"
  },
  {
    name: "Mobile App Consultancy",
    href: "mobile-app-consultancy",
    imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
    description: "Expert consultancy for mobile app projects"
  },
  {
    name: "React Native App Development",
    href: "react-native-app-development",
    imageUrl: "https://images.unsplash.com/photo-1607990281513-2c110a25bd90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Cross-platform apps with React Native"
  },
  {
    name: "Software Quality Assurance",
    href: "software-quality-assurance",
    imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Ensuring software reliability through quality assurance"
  },
  {
    name: "SEO Service",
    href: "seo-service",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80",
    description: "Optimize your site with expert SEO services"
  },
  {
    name: "Wearable App Development",
    href: "wearable-app-development",
    imageUrl: "https://images.unsplash.com/photo-1576091160597-9e1e597d6bc1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Apps designed for wearable devices"
  },
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
  },
  
  // Additional Technical Services
  {
    name: "Mobile App Development",
    href: "mobile-app-development",
    imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Comprehensive mobile app development services"
  },
  {
    name: "Android App Development",
    href: "android-app-development",
    imageUrl: "https://images.unsplash.com/photo-1591200636279-6d832b3a2e0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Expert Android app development solutions"
  },
  {
    name: "Android VR App Development",
    href: "android-vr-app-development",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Innovative VR app development for Android"
  },
  {
    name: "Blockchain App Development",
    href: "blockchain-app-development",
    imageUrl: "https://images.unsplash.com/photo-1640932663090-83e24c9d6b5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Secure blockchain-based app development"
  },
  {
    name: "Chatbot App Development",
    href: "chatbot-app-development",
    imageUrl: "https://images.unsplash.com/photo-1600585154526-990d71a92051?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Intelligent chatbot application development"
  },
  {
    name: "Flutter App Development",
    href: "flutter-app-development",
    imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Cross-platform apps with Flutter"
  },
  {
    name: "Hybrid App Development",
    href: "hybrid-app-development",
    imageUrl: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Efficient hybrid app development services"
  },
  {
    name: "iOS App Development",
    href: "ios-app-development",
    imageUrl: "https://images.unsplash.com/photo-1591200636279-6d832b3a2e0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "High-quality iOS app development"
  },
  {
    name: "IoT App Development",
    href: "iot-app-development",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
    description: "IoT-enabled app development solutions"
  },
  {
    name: "Kotlin App Development",
    href: "kotlin-app-development",
    imageUrl: "https://images.unsplash.com/photo-1534126511022-8e5b7f7b8b4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Robust Kotlin-based app development"
  },
  {
    name: "Mobile App Consultancy",
    href: "mobile-app-consultancy",
    imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
    description: "Expert consultancy for mobile app projects"
  },
  {
    name: "React Native App Development",
    href: "react-native-app-development",
    imageUrl: "https://images.unsplash.com/photo-1607990281513-2c110a25bd90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Cross-platform apps with React Native"
  },
  {
    name: "Software Quality Assurance",
    href: "software-quality-assurance",
    imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Ensuring software reliability through quality assurance"
  },
  {
    name: "SEO Service",
    href: "seo-service",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80",
    description: "Optimize your site with expert SEO services"
  },
  {
    name: "Wearable App Development",
    href: "wearable-app-development",
    imageUrl: "https://images.unsplash.com/photo-1576091160597-9e1e597d6bc1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Apps designed for wearable devices"
  },

  // Industry-Specific Services
  {
    name: "Healthcare",
    href: "healthcare",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Digital healthcare solutions to improve patient care and medical efficiency"
  },
  {
    name: "Education",
    href: "education",
    imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2022&q=80",
    description: "Educational technology solutions for modern learning environments"
  },
  {
    name: "Finance",
    href: "finance",
    imageUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Secure financial applications and digital banking solutions"
  },
  {
    name: "Real Estate",
    href: "real-estate",
    imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1973&q=80",
    description: "Property management and real estate technology solutions"
  },
  {
    name: "Travel & Tourism",
    href: "travel-tourism",
    imageUrl: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2035&q=80",
    description: "Travel booking platforms and tourism management solutions"
  },
  {
    name: "Construction",
    href: "construction",
    imageUrl: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Construction project management and digital solutions"
  },
  {
    name: "Agriculture",
    href: "agriculture",
    imageUrl: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2129&q=80",
    description: "Smart farming solutions and agricultural technology"
  },
  {
    name: "Electric Vehicle",
    href: "electric-vehicle",
    imageUrl: "https://images.unsplash.com/photo-1593941707882-a5bac6861d75?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
    description: "Electric vehicle management and charging solutions"
  },
  {
    name: "Fintech",
    href: "fintech",
    imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Financial technology solutions for digital payments and banking"
  },
  {
    name: "Milk Delivery",
    href: "milk-delivery",
    imageUrl: "https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2026&q=80",
    description: "Dairy delivery management and subscription platforms"
  },
  {
    name: "Fleet Management",
    href: "fleet-management",
    imageUrl: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
    description: "Vehicle tracking and fleet optimization solutions"
  },
  {
    name: "Lawyer",
    href: "lawyer",
    imageUrl: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2012&q=80",
    description: "Legal practice management and client communication tools"
  },
  {
    name: "AI Application",
    href: "ai-application",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2332&q=80",
    description: "Artificial intelligence applications for business automation"
  },
  {
    name: "Oil & Gas",
    href: "oil-gas",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2a73?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2025&q=80",
    description: "Energy sector digital solutions and management systems"
  },
  {
    name: "Banking",
    href: "banking",
    imageUrl: "https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Digital banking platforms and financial management systems"
  },
  {
    name: "Business",
    href: "business",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Business process automation and management solutions"
  },
  {
    name: "Car Rental",
    href: "car-rental",
    imageUrl: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2014&q=80",
    description: "Vehicle rental management and booking platforms"
  },
  {
    name: "NGO",
    href: "ngo",
    imageUrl: "https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Non-profit organization management and donation platforms"
  },
  {
    name: "Game",
    href: "game",
    imageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
    description: "Mobile and web game development solutions"
  },
  {
    name: "Courier",
    href: "courier",
    imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Package delivery tracking and courier management systems"
  },
  {
    name: "Online Examination",
    href: "online-examination",
    imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Digital examination platforms and assessment tools"
  },
  {
    name: "Taxi Booking",
    href: "taxi-booking",
    imageUrl: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Ride-hailing and taxi booking platform solutions"
  },
  {
    name: "Augmented Reality",
    href: "augmented-reality",
    imageUrl: "https://images.unsplash.com/photo-1592478411213-6153e4ebc696?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2012&q=80",
    description: "AR applications for immersive user experiences"
  },
  {
    name: "CRM & ERP",
    href: "crm-erp",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80",
    description: "Customer relationship and enterprise resource planning systems"
  },
  {
    name: "Automotive",
    href: "automotive",
    imageUrl: "https://images.unsplash.com/photo-1486496146582-9ffcd0b2b2b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Automotive industry digital solutions and connected car technologies"
  },
  {
    name: "Influencer",
    href: "influencer",
    imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
    description: "Influencer marketing platforms and content management tools"
  },
  {
    name: "Restaurant",
    href: "restaurant",
    imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
    description: "Restaurant management and food ordering solutions"
  },
  {
    name: "SaaS",
    href: "saas",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
    description: "Software as a Service platforms and cloud-based solutions"
  },
  {
    name: "Social Networking",
    href: "social-networking",
    imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
    description: "Social media platforms and community building applications"
  },
  {
    name: "Sports",
    href: "sports",
    imageUrl: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Sports management and fitness tracking applications"
  },
  {
    name: "Travel App",
    href: "travel-app",
    imageUrl: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2035&q=80",
    description: "Travel planning and booking mobile applications"
  },
  {
    name: "Wellness App",
    href: "wellness-app",
    imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Health and wellness tracking applications"
  },
  {
    name: "Car Wash",
    href: "car-wash",
    imageUrl: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
    description: "Car wash booking and management solutions"
  },
  {
    name: "Astrology",
    href: "astrology",
    imageUrl: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
    description: "Astrology consultation and horoscope applications"
  },
  {
    name: "Doctor",
    href: "doctor",
    imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
    description: "Doctor appointment and telemedicine platforms"
  },
  {
    name: "Salon",
    href: "salon",
    imageUrl: "https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
    description: "Beauty salon booking and management systems"
  },
  {
    name: "Laundry",
    href: "laundry",
    imageUrl: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
    description: "Laundry service booking and pickup management"
  },
  {
    name: "Medicine Delivery",
    href: "medicine-delivery",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Pharmacy delivery and medication tracking systems"
  },
  {
    name: "Airline",
    href: "airline",
    imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
    description: "Airline booking and flight management systems"
  },
  {
    name: "E-Scooter App",
    href: "e-scooter-app",
    imageUrl: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
    description: "Electric scooter sharing and rental platforms"
  },
  {
    name: "Entertainment",
    href: "entertainment",
    imageUrl: "https://images.unsplash.com/photo-1489599328109-135d4d5c2e28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Entertainment and media streaming platforms"
  },
  {
    name: "News App",
    href: "news-app",
    imageUrl: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "News aggregation and media publishing platforms"
  },
  {
    name: "On-Demand",
    href: "on-demand",
    imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    description: "On-demand service platforms and marketplace solutions"
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
      <div className="relative bg-gradient-to-r from-orange-50 via-yellow-100 to-orange-100 overflow-hidden">
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
              <ServiceForm/>
              <WhyChooseUs/>
              
              
            </div>
          </div>
        </div>
        <WhyChooseUsSection/>
        
        <OurMagicalProcess/>
        <CallToAction/>
        <ServicesComponent/>

      </div>

     
    </>
  );
}

export async function generateStaticParams() {
  return servicesData.map(service => ({
    industry: service.href
  }));
}