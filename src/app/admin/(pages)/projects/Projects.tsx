"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, Smartphone, Code, Zap, Shield, Users, Star, CheckCircle, Play, ChevronDown, Trash2, Edit } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

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
  _id:string
}

function PreviousProjects() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeProject, setActiveProject] = useState(0);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

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

  const handleDelete = async (projectId: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        await axios.delete(`/admin/api/projects/${projectId}`);
        setProjects(projects.filter(project => project.id !== projectId));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to delete project');
      }
    }
  };

  if (loading && projects.length === 0) {
    return (
      <div className="py-16 px-6 text-center">
        <div className=" mx-auto">
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
      <section className="px-0 relative">
        <div className="py-2  mx-auto">
          <div className="grid gap-8">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={`group relative backdrop-blur-xl rounded-sm px-4 py-2 border transition-all duration-500 transform ${
                  activeProject === index ? 'ring-2 ring-orange-400/50 shadow-2xl shadow-orange-500/20' : ''
                }`}
                onMouseEnter={() => setActiveProject(index)}
              >
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-1">
                    <div className="flex items-center justify-between  gap-3 mb-4">
                      
                
                      {/* upper line */}
                      <div className="flex items-center">
                      <div className="w-3 h-3 bg-gradient-to-r from-orange-400  to-red-500 rounded-full"></div>
                      <span className="text-sm font-bold text-orange-400 uppercase tracking-wider">
                        {project.category}
                      </span>
                      </div>
                      
                      {/* lower line */}
                      
{/* the control button */}


                        <div className="flex items-center gap-2">
                        <button
                        onClick={() => router.push(`/admin/projects/edit-project/${project._id}`)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-600 transition-all duration-300 flex items-center gap-2"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-600 transition-all duration-300 flex items-center gap-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                        </div>
                      </div>
                      
                    
                    
                    <h3 className="text-gray-800 mb-4 group-hover:text-orange-400 transition-colors">
                      {project.name} - {project.shortDescription}
                    </h3>
                   
                    <p className="text-gray-700 mb-4">{project.description}</p>

                    <div className="space-y-3 grid grid-cols-2 mb-6">
                      {project.bulletPoints.slice(0, 4).map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center text-sm gap-3">
                          <CheckCircle className="w-5 h-5 text-orange-400 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech, techIndex) => (
                        <span key={techIndex} className="bg-gray-200 px-3 py-1 rounded-full text-xs">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-4">
                      {project.link && (
                        <Link href={project.link}
                          className="bg-gradient-to-r text-white from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 px-5 py-2 rounded-lg font-bold transition-all duration-300 transform group-hover:scale-105 flex items-center gap-2">
                          Visit Project
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      )}
                      
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="relative w-64 h-80 rounded-md overflow-hidden transform rotate-3 group-hover:rotate-0 transition-transform duration-500">
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
        </div>
      </section>
    </div>
  );
}

export default PreviousProjects;