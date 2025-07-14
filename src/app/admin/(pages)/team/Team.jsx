"use server"
import { revalidatePath } from 'next/cache';
import connectDB from '@/lib/util';
import Team from '../../model/team';
import TeamMemberCard from './TeamMemberCard';

// Server Actions
export async function deleteTeamMember(formData) {
  'use server';
  const memberId = formData.get('memberId');
  
  try {
    await connectDB();
    await Team.findByIdAndDelete(memberId);
    revalidatePath('/admin/team');
    return { success: true };
  } catch (error) {
    console.error('Error deleting team member:', error);
    return { success: false, error: 'Failed to delete team member' };
  }
}

export async function updateTeamMember(formData) {
  'use server';
  const memberId = formData.get('memberId');
  const name = formData.get('name');
  const position = formData.get('position');
  const department = formData.get('department');
  const bio = formData.get('bio');
  const skills = formData.get('skills').split(',').map(skill => skill.trim());
  const email = formData.get('email');
  const linkedin = formData.get('linkedin');
  const profileImage = formData.get('image');
  
  try {
    await connectDB();
    await Team.findByIdAndUpdate(memberId, {
      name,
      position,
      department,
      bio,
      skills,
      email,
      linkedin,
      profileImage,
    });
    revalidatePath('/admin/team');
    return { success: true };
  } catch (error) {
    console.error('Error updating team member:', error);
    return { success: false, error: 'Failed to update team member' };
  }
}

// Helper function to calculate team statistics
const calculateTeamStats = (teamMembers) => {
  const totalMembers = teamMembers.length;
  
  // Department distribution
  const departmentCounts = teamMembers.reduce((acc, member) => {
    acc[member.department] = (acc[member.department] || 0) + 1;
    return acc;
  }, {});
  
  // Skills analysis
  const allSkills = teamMembers.flatMap(member => member.skills || []);
  const skillCounts = allSkills.reduce((acc, skill) => {
    acc[skill] = (acc[skill] || 0) + 1;
    return acc;
  }, {});
  
  const topSkills = Object.entries(skillCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  
  // Recent hires (last 30 days)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const recentHires = teamMembers.filter(member => 
    member.joinDate && new Date(member.joinDate) > thirtyDaysAgo
  ).length;
  
  return {
    totalMembers,
    departmentCounts,
    topSkills,
    recentHires,
    totalDepartments: Object.keys(departmentCounts).length,
    totalSkills: Object.keys(skillCounts).length
  };
};

const TeamShowcase = async () => {
  await connectDB();
  const teamMembers = await Team.find().sort({ joinDate: -1 }).lean();
  
  // Convert MongoDB documents to plain objects
  const serializedMembers = teamMembers.map(member => ({
    ...member,
    _id: member._id.toString(),
    joinDate: member.joinDate ? member.joinDate.toISOString() : null,
    createdAt: member.createdAt ? member.createdAt.toISOString() : null,
    updatedAt: member.updatedAt ? member.updatedAt.toISOString() : null,
  }));
  
  const stats = calculateTeamStats(serializedMembers);
  
  return (
    <div className="container mx-auto px-0">
      {/* Team Statistics Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Team Statistics</h2>
        
        {/* Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl font-bold text-blue-600">{stats.totalMembers}</div>
            <div className="text-sm text-gray-600 mt-1">Total Members</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl font-bold text-green-600">{stats.totalDepartments}</div>
            <div className="text-sm text-gray-600 mt-1">Departments</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl font-bold text-purple-600">{stats.totalSkills}</div>
            <div className="text-sm text-gray-600 mt-1">Total Skills</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl font-bold text-orange-600">{stats.recentHires}</div>
            <div className="text-sm text-gray-600 mt-1">Recent Hires</div>
          </div>
        </div>
        
        {/* Department & Skills Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Department Distribution */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Department Distribution</h3>
            <div className="space-y-3">
              {Object.entries(stats.departmentCounts).map(([department, count]) => (
                <div key={department} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{department}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${(count / stats.totalMembers) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-800">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Top Skills */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Top Skills</h3>
            <div className="space-y-3">
              {stats.topSkills.map(([skill, count]) => (
                <div key={skill} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{skill}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${(count / stats.totalMembers) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-800">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Team Members Grid */}
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Team Members</h2>
        <div className="gap-4 grid grid-cols-2 md:grid-cols-3">
          {serializedMembers.map((member) => (
            <TeamMemberCard
              key={member._id}
              member={member}
              deleteTeamMember={deleteTeamMember}
              updateTeamMember={updateTeamMember}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamShowcase;