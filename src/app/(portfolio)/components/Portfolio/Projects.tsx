"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, Smartphone, Code, Zap, Shield, Users, Star, CheckCircle, Play, ChevronDown } from "lucide-react";
import Link from "next/link";
import axios from "axios";

interface Project {
  id: string;
  name: string;
  category: string;
  description: string;
  bulletPoints: string[];
  image: string;
  link?: string;
  technologies: string[];
  shortDescription: string;
  clientName: string;
  previewImage: string;

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
        const response = await axios.get('/admin/api/getProjects'); // Your API endpoint
        
        console.log('Fetched projects:', response.data.projects);

        setProjects(response.data.projects);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        // Fallback to default projects if API fails
       
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading && projects.length === 0) {
    return (
      <div className="py-16 px-6 text-center">
        <div className="max-w-7xl mx-auto">
          <p>Loading our amazing projects...</p>
        </div>
      </div>
    );
  }

  if (error) {
    console.error('Error fetching projects:', error);
   
  }
  
  return (
    <div>
      {/* Projects Showcase */}
      <section className="py-16  bg-gradient-to-r from-orange-50 to-red-50 px-4 relative ">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-5">
            <h2 className="text-3xl text-gray-800 font-black">
              Our Proven
              <span className="ml-2 bg-gradient-to-r from-orange-400 to-red-500 text-transparent bg-clip-text">
                Projects
              </span>
            </h2>
            <p className="text-gray-600 mt-1">
              Explore our diverse portfolio of projects that showcase our expertise and innovation.
            </p>
            
          </div>

          <div className=" gap-8">
            {
            (projects).slice(0,4).map((project, index) => (
              <div
                key={project.id}
                className={`group relative backdrop-blur-xl rounded-3xl p-5 border transition-all duration-500 transform ${
                  activeProject === index ? 'ring-2 ring-orange-400/50 shadow-2xl shadow-orange-500/20' : ''
                }`}
                onMouseEnter={() => setActiveProject(index)}
              >
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-3 h-3 bg-gradient-to-r from-orange-400 to-red-500 rounded-full"></div>
                      <span className="text-sm font-bold text-orange-400 uppercase tracking-wider">
                        {project.category}
                      </span>
                      
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 group-hover:text-orange-400 transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-gray-700 mb-4">{project.shortDescription}</p>
                    <div className="space-y-3 mb-6">
                      {project.bulletPoints.slice(0, 4).map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center text-sm gap-3">
                          <CheckCircle className="w-5 h-5 text-orange-400 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech, techIndex) => (
                        <span key={techIndex} className="bg-gray-100 px-3 py-1 rounded-full text-xs">
                          {tech}
                        </span>
                      ))}
                    </div>
                    {project.link ? (
                      <div className="flex items-center gap-4">
                      <Link href={project.link}
                        className="bg-gradient-to-r text-white from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 px-5 py-2 rounded-lg font-bold transition-all duration-300 transform group-hover:scale-105 flex items-center gap-2">
                        Visit Project
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                      
                      </div>
                      
                    ) : (
                      <button className="bg-gradient-to-r text-white from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 px-6 py-3 rounded-full font-bold transition-all duration-300 transform group-hover:scale-105 flex items-center gap-2">
                        Learn More
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <div className="flex-shrink-0">
                    <div className="relative w-64 h-80 rounded-2xl overflow-hidden transform rotate-3 group-hover:rotate-0 transition-transform duration-500">
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-10">
            <div className="inline-flex flex-col sm:flex-row gap-4">
              <Link 
                href="/projects"
                className="border-2 block border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white font-semibold px-8 py-4 lg:text-lg rounded-xl transition-all duration-300">
                View All Projects
              </Link>
            
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PreviousProjects;