
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

const TeamShowcase = async () => {
  await connectDB();
  const teamMembers = await Team.find().sort({ joinDate: -1 }).lean();

  // Convert MongoDB documents to plain objects
  const serializedMembers = teamMembers.map(member => ({
    ...member,
    _id: member._id.toString(), // Convert ObjectId to string
    joinDate: member.joinDate ? member.joinDate.toISOString() : null, // Convert Date to string
    createdAt: member.createdAt ? member.createdAt.toISOString() : null, // Convert Date to string
    updatedAt: member.updatedAt ? member.updatedAt.toISOString() : null, // Convert Date to string
  }));

  return (
    <div className="container mx-auto px-0 ">
      <div className="space-y-4">
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
  );
};

export default TeamShowcase;