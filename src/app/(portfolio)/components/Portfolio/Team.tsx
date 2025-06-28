"use client"
import React, { useState, useEffect } from 'react';
import { Users, Star, MapPin, Calendar, Mail, Linkedin, ExternalLink, Target } from 'lucide-react';
import Image from 'next/image';
import axios from 'axios';

type TeamMember = {
  _id: string;
  name: string;
  position: string;
  department: string;
  bio: string;
  email: string;
  linkedin: string;
  joinDate: string;
  profileImage: string;
  skills: string[];
};

const TeamShowcase = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleMembers, setVisibleMembers] = useState<string[]>([]);
  const [hoveredMember, setHoveredMember] = useState<string | null>(null);

  const fetchTeam = async () => {
    try {
      const response = await axios.get("/admin/api/getTeam");
      const mappedData = response.data.map((member: any) => ({
        _id: member._id,
        name: member.name,
        position: member.position,
        department: member.department,
        bio: member.bio,
        email: member.email,
        linkedin: member.linkedin,
        joinDate: member.joinDate,
        profileImage: member.profileImage,
        skills: member.skills,
      }));
      setTeamMembers(mappedData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching team members:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  useEffect(() => {
    if (teamMembers.length > 0) {
      teamMembers.forEach((member, index) => {
        setTimeout(() => {
          setVisibleMembers((prev) => [...prev, member._id]);
        }, index * 150);
      });
    }
  }, [teamMembers]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200 flex items-center justify-center">
        <div className="text-center">
          
          <p className="mt-4 text-orange-700 font-semibold text-base">Loading our amazing team...</p>
          <div className="mt-2 flex justify-center space-x-1">
            <div className="w-2 h-2 bg-orange-600 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-orange-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-orange-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-orange-100 via-orange-50 to-orange-100 py-10 px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-400/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-400/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-400/5 rounded-full blur-3xl"></div>
      </div>

      {/* Header Section */}
      <div className="text-center mb-8 relative ">
        
        <h1 className="text-3xl font-black text-gray-800 mb-4 leading-tight">
            <Users className="w-4 h-4 text-white" />
            
          Meet Our{' '}
          <span className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 text-transparent bg-clip-text animate-gradient">
            Superstar Team
          </span>
        </h1>
    
        <div className=" flex justify-center">
          <div className="w-20 h-1 bg-gradient-to-r from-orange-600 to-amber-600 rounded-full"></div>
        </div>
      </div>

      {/* Team Members */}
      <div className="max-w-7xl  mx-auto relative z-10 space-y-5">
        {teamMembers.map((member, index) => (
          <div
            key={member._id}
            className={` bg-yellow-100 p-4 rounded-lg shadow-lg transform transition-transform
              ${hoveredMember === member._id ? 'scale-105 shadow-2xl' : 'scale-100 shadow-lg'}
              ${visibleMembers.includes(member._id) ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}
              transition-all duration-700 ease-out flex
              ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center justify-between
            `}
            style={{
              transitionDelay: `${index * 100}ms`,
            }}
            onMouseEnter={() => setHoveredMember(member._id)}
            onMouseLeave={() => setHoveredMember(null)}
          >
            {/* Image and Basic Info */}
            <div className="w-1/3 flex-shrink-0 group relative">
              <div className="relative  rounded-full">
                <div className=" w-96 h-64 rounded-lg  transition-all duration-500">
                  <Image
                    width={400}
                    height={400}
                    loading="lazy"
                    priority={false}
                    src={member.profileImage}
                    alt={member.name}
                    className="w-96 h-64  rounded-lg object-contain group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                  <div className="absolute top-3 right-3 w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
                </div>
              </div>
              
            </div>

            {/* Details */}
            <div className="w-2/3 pl-8 pr-8 group">
            <div className= "">
                <h3 className="text-xl font-bold text-gray-800 group-hover:text-orange-600 transition-colors duration-300">
                  {member.name} | {member.position}
                </h3>
                <p className="text-orange-600 font-semibold text-base"></p>
                <div className="flex items-center  gap-2 text-gray-500 text-base mt-1">
                  <MapPin className="w-3 h-3" />
                  <span>{member.department} | </span>
                  <Calendar className="w-3 h-3" />
                <span>Joined {formatDate(member.joinDate)}</span>
                </div>

              </div>
            
              <div className="bg-orange-50/30 rounded-xl py-4 group-hover:bg-orange-100/30 transition-colors duration-300">

                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                  {member.bio}
                </p>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {member.skills.slice(0, 4).map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="bg-gradient-to-r from-orange-50 to-amber-50 text-gray-80 px-2 py-1 rounded-lg text-sm font-medium group-hover:from-orange-100 group-hover:to-amber-100 transition-all duration-200 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
                {member.skills.length > 3 && (
                  <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-medium">
                    +{member.skills.length - 3} more
                  </span>
                )}
              </div>
              
              <div className="mt-3 flex gap-2">
                {member.email && (
                  <a
                    href={`mailto:${member.email}`}
                    className="flex items-center justify-center w-8 h-8 bg-gray-100 hover:bg-orange-100 text-red-600  rounded-lg transition-all duration-200 hover:scale-110"
                    title="Send Email"
                  >
                    <Mail className="w-3 h-3" />
                  </a>
                )}
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-8 h-8 bg-gray-100 hover:bg-orange-200 text-blue-600 rounded-lg transition-all duration-200 hover:scale-110"
                    title="LinkedIn Profile"
                  >
                    <Linkedin className="w-3 h-3" />
                  </a>
                )}
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-orange-600 hover:text-orange-700 text-sm font-medium group-hover:underline transition-all duration-200"
                >
                  <ExternalLink className="w-3 h-3" />
                  View Profile
                </a>
              </div>
              <div className="absolute top-0 left-0 bg-gradient-to-r from-orange-400 to-amber-500 text-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300">
                <Star className="w-3 h-3" />
              </div>
            </div>
          </div>
        ))}
      </div>

      

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes counter {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        .animate-counter {
          animation: counter 0.8s ease-out;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default TeamShowcase;