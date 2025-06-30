"use client";
import React, { useState, useEffect } from 'react';
import { Mail, Linkedin, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import axios from 'axios';
import { motion } from 'framer-motion';

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
      setTeamMembers(mappedData.slice(0, 3)); // Limit to 3 members
      setLoading(false);
    } catch (error) {
      console.error("Error fetching team members:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
    });
  };

  // Animation variants for cards
  const cardVariants = {
    hidden: { opacity: 0, y: 50, rotate: 2 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.2,
        ease: 'easeOut',
      },
    }),
    hover: {
      scale: 1.03,
      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
      borderColor: "#2563eb",
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          
          <div className="mt-2 flex justify-center space-x-2">
            <div className="w-2 h-2 bg-orange-600 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-orange-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-orange-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 max-w-7xl pb-20">
      {/* Hero Section */}
      <div className="relative mb-10">
        <div
          className="h-[20vh] lg:h-[25vh]  bg-center "
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1548705085-101177834f47?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0)`,
            backgroundColor: '#e5e7eb', // Fallback color
          }}
        >
          <div className="absolute inset-0 bg-black/80"></div> {/* Subtle overlay */}
          <div className="absolute inset-0 flex flex-col  items-center  justify-center">
            <h1 className="text-3xl lg:text-3xl font-black text-white">Meet Our
              <span className='text-orange-400'> Superstar Team</span>
               
               
               </h1>
            
            {/* <div className='w-10 h-2 bg-orange-400 rounded-lg mt-1'></div> */}
          </div>
        </div>
      </div>

      {/* Team Cards */}
      <div className="max-w-6xl mx-auto  relative z-10">
        {teamMembers.length === 0 ? (
          <p className="text-center text-gray-600">No team members available at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member._id}
                className="bg-gray-50/90 backdrop-blur-lg rounded-md shadow-md p-4 border border-gray-200"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                custom={index}
              >
                <div className="flex justify-center mb-4">
                    <Image
                      width={80}
                      height={80}
                      loading="lazy"
                      src={member.profileImage}
                      alt={member.name}
                      className="w-40 h-40 rounded-full object-cover"
                      style={{ backgroundColor: '#f3f4f6' }} // Fallback color
                    />
                  </div>
                <div className="flex items-center justify-center space-x-4">
                  
                  <div className="flex flex-col items-center justify-center flex-1">
                    <h3 className="text-base font-semibold text-gray-800">{member.name}</h3>
                    <p className="text-sm text-gray-600">{member.position}</p>
                    <p className="text-sm text-gray-500">{member.department} | {formatDate(member.joinDate)}</p>
                    {/* <p className="text-sm text-gray-600 mt-2 line-clamp-4">{member.bio}</p> */}
                    <div className="mt-3 flex gap-3">
                      {member.email && (
                        <motion.a
                          href={`mailto:${member.email}`}
                          className="text-red-600 hover:text-red-800 transition-colors duration-200"
                          title="Send Email"
                          whileHover={{ scale: 1.2 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Mail className="w-4 h-4" />
                        </motion.a>
                      )}
                      {member.linkedin && (
                        <motion.a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                          title="LinkedIn Profile"
                          whileHover={{ scale: 1.2 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Linkedin className="w-4 h-4" />
                        </motion.a>
                      )}
                      {member.linkedin && (
                        <motion.a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm transition-colors duration-200"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ExternalLink className="w-4 h-4" />
                          Profile
                        </motion.a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamShowcase;