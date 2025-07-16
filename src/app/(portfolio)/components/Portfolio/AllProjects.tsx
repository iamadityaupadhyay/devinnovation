"use client"
import React, { useEffect, useRef, useState } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import axios from 'axios';

// Type definitions
interface Project {
  _id: string;
  name: string;
  title: string;
  shortDescription: string;
  bulletPoints: string[];
  technologies: string[];
  image: string;
  image1?: string;
  image2?: string;
  link?: string;
}

interface ContactData {
  whatsapp: string;
}

interface ProjectsApiResponse {
  projects: Project[];
}

const ProjectsShowcase: React.FC = () => {
  const [visibleProjects, setVisibleProjects] = useState<Set<string>>(new Set());
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [whatsapp, setWhatsapp] = useState<string>("");
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  const fetchWhatsapp = async (): Promise<void> => {
    try {
      const response = await fetch("/admin/api/getContact");
      const data: ContactData = await response.json();
      setWhatsapp(data.whatsapp);
    } catch (err) {
      console.error('Error fetching WhatsApp:', err);
    }
  };

  const fetchProjects = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await axios.get<ProjectsApiResponse>('/admin/api/getProjects');
      setProjects(response.data.projects);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchWhatsapp();
  }, []);

  useEffect(() => {
    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '0px 0px -20% 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const projectId = (entry.target as HTMLDivElement).dataset.projectId;
          if (projectId) {
            setVisibleProjects(prev => new Set([...prev, projectId]));
          }
        }
      });
    }, observerOptions);

    projectRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [projects]);

  const getAnimationClasses = (isVisible: boolean): string => {
    const baseClasses = "transition-all duration-1000 ease-out";
    
    if (!isVisible) {
      return `${baseClasses} transform translate-y-20 opacity-0`;
    }
    
    return `${baseClasses} transform translate-y-0 opacity-100`;
  };

  const getGradientForProject = (index: number): string => {
    const gradients = [
      "from-teal-400 to-green-400",
      "from-orange-400 to-red-400",
      "from-blue-400 to-purple-400",
      "from-pink-400 to-rose-400",
      "from-indigo-400 to-blue-400",
      "from-yellow-400 to-orange-400"
    ];
    return gradients[index % gradients.length];
  };

  if (loading && projects.length === 0) {
    return (
      <div className="py-16 min-h-screen px-6 flex flex-col items-center justify-center">
        <div className="flex items-center space-x-2 mb-4">
          <span className="w-4 h-4 rounded-full bg-orange-400 animate-bounce"></span>
          <span className="w-4 h-4 rounded-full bg-red-400 animate-bounce [animation-delay:.2s]"></span>
          <span className="w-4 h-4 rounded-full bg-orange-400 animate-bounce [animation-delay:.4s]"></span>
        </div>
        <div className="text-center text-lg text-gray-700 font-semibold">
          Loading our amazing projects...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-16 min-h-screen px-6 flex flex-col items-center justify-center">
        <div className="text-center text-lg text-red-600 font-semibold">
          Error loading projects: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full mx-auto px-4 py-12 bg-white">
      {/* Header Section */}
      <div
        className="h-[24vh] lg:h-[24vh] absolute inset-0 px-2 bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1549923746-c502d488b3ea?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-3xl lg:text-4xl font-black mb-4">
            Our Proven
            <span className="ml-2 bg-gradient-to-r from-orange-400 to-red-500 text-transparent bg-clip-text">
              Projects
            </span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto">
            Explore our diverse portfolio of successful projects
          </p>
        </div>
      </div>
      <div className='pt-[20vh] lg:pt-[20vh]'></div>
        
      {projects.map((project, index) => (
        <div 
          key={project._id}
          ref={el => { projectRefs.current[index] = el; }}
          data-project-id={project._id}
          className={`grid md:grid-cols-2 py-8 gap-8 ${getAnimationClasses(visibleProjects.has(project._id))}`}
        >
          {/* Project Image Display */}
          <div className={`relative md:min-h-[500px] lg:min-h-[450px] hover:-translate-y-2 transition-all duration-300 rounded-2xl bg-gradient-to-br ${getGradientForProject(index)} p-4 flex items-center justify-center ${
            visibleProjects.has(project._id) ? 'animate-fade-in-up' : ''
          }`}>
            <div className="flex space-x-4 items-center">
              {/* Main Project Image */}
              <div 
                className={`relative transform transition-all duration-700 scale-110 z-10 ${
                  visibleProjects.has(project._id) ? 'animate-slide-up' : 'translate-y-8 opacity-0'
                }`}
                style={{
                  transitionDelay: '300ms'
                }}
              >
                <div className="w-32 h-56 lg:w-56 lg:h-96 bg-black rounded-3xl p-2 shadow-2xl">
                  <div className="w-full h-full bg-white rounded-2xl overflow-hidden relative">
                    {/* Phone notch */}
                    <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-12 h-2 bg-black rounded-full z-10"></div>
                    
                    {/* Project image */}
                    <div className="w-full h-full ">
                      <img 
                        src={project.image1 || project.image} 
                        alt={project.title}
                        className="w-full h-full object-center rounded-lg"
                        loading="lazy"
                      />
                    </div>
                    
                    {/* Home indicator */}
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-black rounded-full z-10"></div>
                  </div>
                </div>
              </div>
              
              {/* Preview Image (if available) */}
              {project.image2 && (
                <div 
                  className={`relative transform transition-all duration-700 scale-100 ${
                    visibleProjects.has(project._id) ? 'animate-slide-up' : 'translate-y-8 opacity-0'
                  }`}
                  style={{
                    transitionDelay: '100ms'
                  }}
                >
                  <div className="w-28 h-48 lg:w-52 mt-14 lg:h-80 bg-black rounded-3xl p-2 shadow-xl">
                    <div className="w-full h-full bg-white rounded-2xl overflow-hidden relative">
                      <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-10 h-1.5 bg-black rounded-full z-10"></div>
                      
                      <div className="w-full h-full ">
                        <img 
                          src={project.image2} 
                          alt={`${project.title} preview`}
                          className="w-full h-full object-center rounded-lg"
                          loading="lazy"
                        />
                      </div>
                      
                      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-black rounded-full z-10"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="md:space-y-8 space-y-5 flex flex-col justify-center">
            <div className={`transition-all duration-700 ${
              visibleProjects.has(project._id) ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
            style={{ transitionDelay: '200ms' }}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-red-500 rounded-full"></div>
                <span className="text-sm font-bold text-gray-800 uppercase tracking-wider">
                  {project.name}
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                {project.title}
              </h2>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                {project.shortDescription}
              </p>
            </div>

            <div className="md:space-y-4 space-y-3">
              {project.bulletPoints.slice(0, 4).map((feature, featureIndex) => (
                <div 
                  key={featureIndex} 
                  className={`flex items-start space-x-3 transition-all duration-600 ${
                    visibleProjects.has(project._id) ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                  }`}
                  style={{
                    transitionDelay: `${400 + (featureIndex * 100)}ms`
                  }}
                >
                  <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-0.5">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-700 lg:text-lg font-medium">{feature}</span>
                </div>
              ))}
            </div>

            {/* Technologies */}
            <div className={`transition-all duration-700 ${
              visibleProjects.has(project._id) ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
            style={{ transitionDelay: '800ms' }}>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.slice(0, 4).map((tech, techIndex) => (
                  <span 
                    key={techIndex}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              {project.link && (
                <Link
                  href={project.link}
                  target="_blank"
                  className={`bg-orange-600 border-orange-300 border-2 w-1/2 text-white px-6 py-3 rounded-xl font-semibold text-lg hover:bg-gray-800 text-center transition-all duration-300 shadow-lg transform hover:scale-105 flex items-center justify-center gap-2 ${
                    visibleProjects.has(project._id) ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                  }`}
                  style={{
                    transitionDelay: '100ms'
                  }}
                >
                  Live Preview
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
              
              <Link
                href={`/projects/${project._id}`}
                className={`text-orange-500 hover:text-orange-600 w-1/2 font-semibold text-lg flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105 ${
                  visibleProjects.has(project._id) ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                }`}
                style={{
                  transitionDelay: '1000ms'
                }}
              >
                Read More
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectsShowcase;