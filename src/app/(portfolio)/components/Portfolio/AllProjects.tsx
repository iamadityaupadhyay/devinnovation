"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";
import axios from "axios";

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  bulletPoints: string[];
  image: string;
  link?: string;
  technologies: string[];
  shortDescription: string;
  clientName: string;
  previewImage: string;
  name: string;
  _id: string; // Added _id for MongoDB compatibility
}

function PreviousProjects() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeProject, setActiveProject] = useState(0);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/admin/api/getProjects');
        setProjects(response.data.projects);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading && projects.length === 0) {
    return (
      <div className="py-16 min-h-screen px-6 max-w-7xl flex flex-col items-center justify-center">
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
    console.error('Error fetching projects:', error);
  }

  return (
    <div>
      <style jsx>{`
        .gradient-reveal {
          position: relative;
          overflow: hidden;
        }
        
        .gradient-reveal::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          right: 50%;
          bottom: 0;
          background: transparent;
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 1;
        }
        
        .gradient-reveal:hover::before {
          left: 0;
          right: 0;
        }
        
        .image-container {
          position: relative;
          overflow: hidden;
        }
        
        .project-image {
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          filter: grayscale(100%);
          transform: scale(1);
          clip-path: polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%);
        }
        
        .gradient-reveal:hover .project-image {
          filter: grayscale(0%);
          transform: scale(1.05);
          clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
        }
        
        .project-image-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          filter: grayscale(100%);
          z-index: -1;
        }
      `}</style>
      
      <section className="pb-20 max-w-7xl bg-gray-50">
        <div className="relative">
        <div
          className="h-[25vh] lg:h-[30vh]  bg-cover bg-center"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
            backgroundColor: '#e5e7eb', // Fallback color
          }}
        >
          <div className="absolute inset-0 bg-black/80"></div> {/* Subtle overlay */}
          <div className="absolute inset-0 flex flex-col items-center  justify-center">
            <h1 className="text-3xl lg:text-3xl font-black text-white">Our 
              Proven
              <span className="ml-2 bg-gradient-to-r from-orange-400 to-red-500 text-transparent bg-clip-text">
                
               Projects
               </span></h1>
            <p className="text-center text-gray-300 mt-2">Explore our diverse portfolio of successful projects</p>
          
          </div>
        </div>
      </div>
        <div className="max-w-6xl py-5 px-2 mx-auto">
          

          <div className="grid md:grid-cols-3 grid-cols-1 gap-8">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={`group relative rounded-md p-5 border transition-all duration-500 transform hover:scale-100 ${
                  activeProject === index ? 'ring-2 ring-orange-400/50 shadow-2xl shadow-orange-500/20' : ''
                }`}
                onMouseEnter={() => setActiveProject(index)}
              >
                <div className="w-full  mb-2 relative overflow-hidden rounded-lg gradient-reveal">
                  <div className="image-container">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover project-image-bg"
                    />
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover  project-image"
                    />
                  </div>
                </div>
                
                <div className="flex flex-col items-center gap-4">
                  <div className="w-full">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-red-500 rounded-full group-hover:animate-pulse"></div>
                      <span className="text-sm font-bold text-orange-400 uppercase tracking-wider group-hover:text-red-500 transition-colors duration-300">
                        {project.name} | {project.category} 
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-gray-800 mb-2 group-hover:text-orange-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-700 mb-2 group-hover:text-gray-900 transition-colors">{project.shortDescription}</p>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {project.bulletPoints.slice(0, 4).map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-5 h-5 text-orange-400 group-hover:text-green-500 transition-colors duration-300" />
                          <span className="text-gray-700 group-hover:text-gray-900 transition-colors">{feature}</span>
                        </div>
                      ))}
                    </div>
                    {project.link ? (
                      <div className="flex items-center justify-between gap-4">
                        <Link
                          href={project.link}
                          className=" bg-white border-orange-400  border-2 text-orange-400  hover:bg-gradient-to-r hover:text-white from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 px-2 py-1.5 rounded-lg  transition-all duration-300 flex items-center gap-2 transform hover:scale-105 hover:shadow-lg"
                        >
                          Live Preview
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                          href={`/projects/${project._id}`} 
                          className="text-orange-500 flex gap-2 items-center"
                        >
                          Learn More
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    ) : (
                      null
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default PreviousProjects;