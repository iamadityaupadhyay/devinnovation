"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, Smartphone, Code, Zap, Shield, Users, Star, CheckCircle, Play, ChevronDown } from "lucide-react";
import Link from "next/link";

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  features: string[];
  image: string;
  link?: string;
  technologies: string[];
}

function PreviousProjects() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeProject, setActiveProject] = useState(0);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Default projects in case API fails or while loading
  const defaultProjects: Project[] = [
    {
      id: "1",
      title: "Fintech Platform",
      category: "Finance Technology",
      description: "A revolutionary banking app with AI-powered insights",
      features: ["Real-time analytics", "Biometric authentication", "AI recommendations", "Blockchain security"],
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=500&h=600&fit=crop",
      technologies: ["React Native", "Node.js", "TensorFlow"]
    },
    {
      id: "2",
      title: "E-Commerce Solution",
      category: "Retail Technology",
      description: "Next-generation online shopping experience",
      features: ["AR product preview", "Instant checkout", "Smart recommendations", "Live support"],
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&h=600&fit=crop",
      technologies: ["React", "Next.js", "Stripe"]
    },
    {
      id: "3",
      title: "Health Monitoring",
      category: "Healthcare Technology",
      description: "Comprehensive patient health tracking system",
      features: ["Wearable integration", "Telemedicine", "AI diagnostics", "Emergency alerts"],
      image: "https://plus.unsplash.com/premium_photo-1661670175393-a0c1d2e8bdc3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGhlYWx0aGNhcmUlMjBhcHB8ZW58MHx8MHx8fDA%3D",
      technologies: ["Flutter", "Firebase", "Python"]
    },
    {
      id: "4",
      title: "Ride Sharing App",
      category: "Mobility Solution",
      description: "Urban transportation reimagined",
      features: ["Real-time tracking", "Dynamic pricing", "Multi-modal options", "Carbon footprint tracking"],
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=500&h=600&fit=crop",
      technologies: ["Kotlin", "Swift", "Go"]
    }
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/projects'); // Your API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        // Fallback to default projects if API fails
        setProjects(defaultProjects);
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
    // We'll continue to show default projects even if there's an error
  }

  return (
    <div>
      {/* Projects Showcase */}
      <section className="py-16 px-6 relative bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl text-gray-800 font-black mb-6">
              OUR PROVEN
              <span className="ml-2 bg-gradient-to-r from-orange-400 to-red-500 text-transparent bg-clip-text">
                PROJECTS
              </span>
            </h2>
            <p className="text-xl text-gray-800 max-w-3xl mx-auto">
              See how we've transformed industries with our cutting-edge solutions and exceptional execution.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {(projects.length > 0 ? projects : defaultProjects).map((project, index) => (
              <div
                key={project.id}
                className={`group relative backdrop-blur-xl rounded-3xl p-8 border transition-all duration-500 transform hover:scale-105 ${
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
                    <h3 className="text-3xl font-black text-gray-800 mb-4 group-hover:text-orange-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-700 mb-4">{project.description}</p>
                    <div className="space-y-3 mb-6">
                      {project.features.slice(0, 4).map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-orange-400 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech, techIndex) => (
                        <span key={techIndex} className="bg-gray-200 px-3 py-1 rounded-full text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                    {project.link ? (
                      <Link href={project.link}
                        className="bg-gradient-to-r text-white from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 px-6 py-3 rounded-full font-bold transition-all duration-300 transform group-hover:scale-105 flex items-center gap-2">
                        VIEW CASE STUDY
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    ) : (
                      <button className="bg-gradient-to-r text-white from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 px-6 py-3 rounded-full font-bold transition-all duration-300 transform group-hover:scale-105 flex items-center gap-2">
                        LEARN MORE
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <div className="flex-shrink-0">
                    <div className="relative w-64 h-80 rounded-2xl overflow-hidden transform rotate-3 group-hover:rotate-0 transition-transform duration-500">
                      <img
                        src={project.image}
                        alt={project.title}
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
          <div className="text-center mt-16">
            <div className="inline-flex flex-col sm:flex-row gap-4">
              <Link 
                href="/projects"
                className="border-2 block border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white font-semibold px-8 py-4 lg:text-lg rounded-xl transition-all duration-300">
                View All Projects
              </Link>
              <Link 
                href="/contact"
                className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 text-white font-semibold px-8 py-4 lg:text-lg rounded-xl transition-all duration-300">
                Start Your Project
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PreviousProjects;