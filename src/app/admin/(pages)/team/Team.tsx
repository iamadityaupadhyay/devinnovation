"use client"
import React, { useState, useEffect } from 'react';
import { Mail, Linkedin, ExternalLink, Edit2, Save } from 'lucide-react';
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
  const [editMember, setEditMember] = useState<TeamMember | null>(null);

  const fetchTeam = async () => {
    try {
      const response = await axios.get("/admin/api/getTeam");
      setTeamMembers(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching team members:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  const handleEditClick = (member: TeamMember) => {
    setEditMember({ ...member });
  };

  const handleUpdate = async () => {
    if (!editMember) return;
    try {
      await axios.put(`/admin/api/addTeam`, { editMember });
      setTeamMembers(teamMembers.map(member => 
        member._id === editMember._id ? editMember : member
      ));
      setEditMember(null);
    } catch (error) {
      console.error("Error updating team member:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <p>Loading team members...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-0 py-2">
      {/* Edit Form (shown as modal or inline) */}
      {editMember && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-bold mb-4">Edit Team Member</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={editMember.name}
                onChange={(e) => setEditMember({...editMember, name: e.target.value})}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-2">Position</label>
              <input
                type="text"
                name="position"
                value={editMember.position}
                onChange={(e) => setEditMember({...editMember, position: e.target.value})}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-2">Department</label>
              <input
                type="text"
                name="department"
                value={editMember.department}
                onChange={(e) => setEditMember({...editMember, department: e.target.value})}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={editMember.email}
                onChange={(e) => setEditMember({...editMember, email: e.target.value})}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block mb-2">Bio</label>
              <textarea
                name="bio"
                value={editMember.bio}
                onChange={(e) => setEditMember({...editMember, bio: e.target.value})}
                className="w-full p-2 border rounded"
                rows={3}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block mb-2">Skills (comma separated)</label>
              <input
                type="text"
                value={editMember.skills.join(', ')}
                onChange={(e) => setEditMember({
                  ...editMember, 
                  skills: e.target.value.split(',').map(s => s.trim())
                })}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button 
              onClick={() => setEditMember(null)}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              Cancel
            </button>
            <button 
              onClick={handleUpdate}
              className="px-4 py-2 bg-blue-500 text-white rounded flex items-center gap-2"
            >
              <Save size={16} />
              Save
            </button>
          </div>
        </div>
      )}

      {/* Team Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map(member => (
          <div key={member._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-4">
              <div className="flex items-center space-x-4">
                <div className="relative h-16 w-16 rounded-full overflow-hidden">
                  <Image
                    src={member.profileImage}
                    alt={member.name}
                    width={64}
                    height={64}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{member.name}</h3>
                  <p className="text-gray-600 text-sm">{member.position}</p>
                  <p className="text-gray-500 text-xs">{member.department}</p>
                </div>
              </div>
              
              <p className="mt-3 text-gray-700 text-sm line-clamp-3">
                {member.bio}
              </p>
              
              <div className="mt-3 flex flex-wrap gap-1">
                {member.skills.slice(0, 4).map((skill, i) => (
                  <span key={i} className="bg-gray-100 px-2 py-1 rounded text-xs">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="bg-gray-50 px-4 py-3 flex justify-between items-center">
              <div className="flex space-x-2">
                {member.email && (
                  <a 
                    href={`mailto:${member.email}`} 
                    className="text-gray-500 hover:text-blue-500"
                    title="Email"
                  >
                    <Mail size={16} />
                  </a>
                )}
                {member.linkedin && (
                  <a 
                    href={member.linkedin} 
                    target="_blank"
                    className="text-gray-500 hover:text-blue-700"
                    title="LinkedIn"
                  >
                    <Linkedin size={16} />
                  </a>
                )}
              </div>
              <button 
                onClick={() => handleEditClick(member)}
                className="text-gray-500 hover:text-blue-500"
                title="Edit"
              >
                <Edit2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamShowcase;