"use client"
import React, { useState, useEffect } from 'react';
import { Users, Star, Award, Target } from 'lucide-react';
import Image from 'next/image';

type TeamMember = {
  id: number;
  name: string;
  role: string;
  photo: string;
  skills: string[];
  achievement: string;
};

const TeamShowcase = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleMembers, setVisibleMembers] = useState<number[]>([]);

  // Mock data - replace with your actual API call
  const mockTeamData = [
   
    {
      id: 1,
      name: "Aditya Upadhyay",
      role: "Full Stack | UI/UX Designer | Next.js Master",
      photo: "/aditya.png",
      skills: ["Next.js","Figma", "React,js", "Django","Tailwind CSS"],
      achievement: "Award-Winning Designs"
    },
    {
      id: 2,
      name: "Preeti Upadhyay",
      role: "Superstar Backend Developer",
      photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      skills: ["Next.js", "PHP", "Laravel", "MySQL", "Docker", "Kubernetes", "AWS"],
      achievement: "300% Growth Achieved"
    },
    
    
    
  ];

  // Simulate API call
  const fetchTeamData = async () => {
    try {
      setLoading(true);
      
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setTeamMembers(mockTeamData);
    } catch (error) {
      console.error('Error fetching team data:', error);
      setTeamMembers(mockTeamData); // Fallback to mock data
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeamData();
  }, []);

  // Animate members in sequence
  useEffect(() => {
    if (teamMembers.length > 0) {
      teamMembers.forEach((member, index) => {
        setTimeout(() => {
          setVisibleMembers(prev => [...prev, member.id]);
        }, index * 200);
      });
    }
  }, [teamMembers]);



  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-orange-200 rounded-full animate-spin"></div>
            <div className="w-20 h-20 border-4 border-orange-500 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
          </div>
          <p className="mt-4 text-orange-600 font-semibold text-lg">Loading our amazing team...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200 py-12 px-4">
      {/* Header Section */}
      <div className="text-center mb-16 animate-fade-in">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-500 rounded-full mb-6 shadow-lg">
          <Users className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Meet Our <span className="text-orange-500">Dream Team</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Talented individuals working together to create extraordinary experiences and deliver exceptional results.
        </p>
      </div>

      {/* Team Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={member.id}
              className={`
                ${visibleMembers.includes(member.id) ? 'opacity-100 translate-y-0 translate-x-0 scale-100' : 'opacity-0 translate-y-10 translate-x-10 scale-75'}
                transition-all duration-700 ease-out
                ${index % 2 === 0 ? 'lg:translate-x-0' : 'lg:-translate-x-0'}
                ${index % 3 === 0 ? 'md:rotate-1' : index % 3 === 1 ? 'md:-rotate-1' : 'md:rotate-0'}
              `}
              style={{
                transitionDelay: `${index * 100}ms`
              }}
            >
              <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 p-6 group hover:-translate-y-2 hover:rotate-0 border-l-4 border-orange-500">
                {/* Photo Container */}
                <div className="relative mb-6 overflow-hidden rounded-xl">
                  <div className="aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 p-1">
                    <Image
                    width={400}
                    height={400}
                    loading='lazy'
                    priority={false}
                      src={member.photo}
                      alt={member.name}
                      className="w-full h-full object-cover rounded-lg group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-orange-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                </div>

                {/* Member Info */}
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors duration-300">
                    {member.name}
                  </h3>
                  <p className="text-orange-500 font-semibold mb-4">{member.role}</p>
                  
                  {/* Achievement Badge */}
                  <div className="flex items-center justify-center mb-4">
                    <div className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                      <Award className="w-3 h-3" />
                      {member.achievement}
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 justify-center mb-4">
                    {member.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs font-medium hover:bg-orange-100 hover:text-orange-700 transition-colors duration-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Hover Effect Button */}
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <button className="bg-orange-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-600 transition-colors duration-200 flex items-center gap-2 mx-auto">
                      <Target className="w-4 h-4" />
                      View Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="mt-20 bg-white/50 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-500 mb-2">
              <span className="inline-block animate-bounce">{teamMembers.length}+</span>
            </div>
            <p className="text-gray-600 font-medium">Team Members</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-500 mb-2">
              <span className="inline-block animate-pulse">50+</span>
            </div>
            <p className="text-gray-600 font-medium">Projects Completed</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-500 mb-2">
              <span className="inline-block animate-bounce" style={{animationDelay: '0.5s'}}>99%</span>
            </div>
            <p className="text-gray-600 font-medium">Client Satisfaction</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </div>
  );
};

export default TeamShowcase;