"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Mail, Linkedin, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

const TeamShowcase = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [typingBio, setTypingBio] = useState({ text: "", index: -1, memberId: null });
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

  const cardRefs = useRef({});

  const fetchTeam = async () => {
    try {
      const response = await fetch("/admin/api/getTeam"); // Replace with your API endpoint
      const data = await response.json();
      setTeamMembers(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching team members:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, rotate: 2 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: { duration: 0.6, delay: index * 0.2, ease: "easeOut" },
    }),
    hover: { scale: 1.03, transition: { duration: 0.3, ease: "easeOut" } },
  };

  const popupVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
  };

  useEffect(() => {
    let timer;
    if (typingBio.index >= 0) {
      timer = setInterval(() => {
        setTypingBio((prev) => {
          const member = teamMembers.find((m) => m._id === prev.memberId);
          if (!member) return prev;
          const nextChar = member.bio[prev.index];
          if (!nextChar) {
            clearInterval(timer);
            return { ...prev, index: -1 };
          }
          return { ...prev, text: prev.text + nextChar, index: prev.index + 1 };
        });
      }, 12);
    }
    return () => clearInterval(timer);
  }, [typingBio, teamMembers]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-orange-600 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-orange-600 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
          <div className="w-2 h-2 bg-orange-600 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50  mx-auto pb-16 relative">
      {/* Header */}
      <div className="relative mb-6">
        <div
          className="h-[20vh] lg:h-[25vh] bg-center bg-cover"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1548705085-101177834f47?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0)",
            backgroundColor: "#e5e7eb",
          }}
        >
          <div className="absolute inset-0 bg-black/80"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-3xl lg:text-4xl font-bold text-white">
              Meet Our <span className="text-orange-400">Superstar Team</span>
            </h1>
          </div>
        </div>
      </div>

      {/* Team Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {teamMembers.length === 0 ? (
          <p className="text-center text-gray-600">No team members available.</p>
        ) : (
          teamMembers.map((member, index) => (
            <motion.div
              key={member._id}
              ref={(el) => (cardRefs.current[member._id] = el)}
              className="bg-transparent py-4 hover:bg-orange-50/50 relative"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              custom={index}
              onHoverStart={() => {
                const card = cardRefs.current[member._id];
                if (card) {
                  const rect = card.getBoundingClientRect();
                  setPopupPosition({
                    top: rect.top + window.scrollY - 160, // position above
                    left: rect.left + rect.width / 2,
                  });
                  setTypingBio({ text: "", index: 0, memberId: member._id });
                }
              }}
              onHoverEnd={() => {
                setTypingBio({ text: "", index: -1, memberId: null });
              }}
            >
              <div className="flex py-2 justify-center mb-4">
                <Image
                  width={80}
                  height={80}
                  loading="lazy"
                  src={member.profileImage || "/default-image.jpg"}
                  alt={member.name}
                  className="w-48 h-48 border-2 border-orange-400 rounded-full hover:border-orange-800  object-cover"
                  style={{ backgroundColor: "#f3f4f6" }}
                />
              </div>
              <div className="flex items-center px-7 justify-center space-x-4">
                <div className="flex flex-col items-center  justify-center flex-1">
                  <h3 className="text-lg font-semibold text-orange-800">{member.name}</h3>
                  <p className="text-base text-gray-600">{member.position}</p>
                  <p className="text-base text-gray-500">
                    {member.department} | {formatDate(member.joinDate)}
                  </p>
                  <div className="mt-3 flex gap-3">
                    {member.email && (
                      <motion.a
                        href={`mailto:${member.email}`}
                        className="text-red-600 hover:text-red-800"
                        title="Send Email"
                        whileHover={{ scale: 1.2 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Mail className="w-4 h-4" />
                      </motion.a>
                    )}
                    {member.linkedin && (
                      <>
                        <motion.a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800"
                          title="LinkedIn Profile"
                          whileHover={{ scale: 1.2 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Linkedin className="w-4 h-4" />
                        </motion.a>
                        <motion.a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ExternalLink className="w-4 h-4" />
                          Profile
                        </motion.a>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Typing Bio Popup */}
      {typingBio.memberId && typingBio.text && (
        <motion.div
          className="absolute bg-gray-900 text-white p-4 rounded-lg shadow-lg border border-orange-400 z-50"
          variants={popupVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          style={{
            top: popupPosition.top,
            left: popupPosition.left,
            transform: "translateX(-50%)",
            minWidth: "200px",
            minHeight: "100px",
            maxWidth: "250px",
          }}
        >
          <p className="text-sm">
            <span className="font-semibold"> 🤖 </span>
            <br />
            {typingBio.text}
            <span className="animate-blink">|</span>
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default TeamShowcase;
