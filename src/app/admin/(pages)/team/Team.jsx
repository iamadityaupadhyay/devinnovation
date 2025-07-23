export const dynamic = "force-dynamic"
import { revalidatePath } from 'next/cache'
import connectDB from '@/lib/util'
import Team from '../../model/team'
import TeamTable from './TeamTable'

// Server Actions

export async function deleteTeamMember(formData) {
  'use server'
  const memberId = formData.get('memberId')
  
  try {
    await connectDB()
    await Team.findByIdAndDelete(memberId)
    revalidatePath('/admin/team')
    return { success: true }
  } catch (error) {
    console.error('Error deleting team member:', error)
    return { success: false, error: 'Failed to delete team member' }
  }
}

export async function bulkDeleteTeamMembers(formData) {
  'use server'
  const memberIds = formData.getAll('memberIds')
  
  try {
    await connectDB()
    await Team.deleteMany({ _id: { $in: memberIds } })
    revalidatePath('/admin/team')
    return { success: true, message: `${memberIds.length} members deleted successfully` }
  } catch (error) {
    console.error('Error deleting team members:', error)
    return { success: false, error: 'Failed to delete team members' }
  }
}

export async function updateTeamMember(formData) {
  'use server'
  const memberId = formData.get('memberId')
  const name = formData.get('name')
  const position = formData.get('position')
  const department = formData.get('department')
  const bio = formData.get('bio')
  const skills = formData.get('skills').split(',').map(skill => skill.trim())
  const email = formData.get('email')
  const linkedin = formData.get('linkedin')
  const profileImage = formData.get('image')
  
  try {
    await connectDB()
    await Team.findByIdAndUpdate(memberId, {
      name,
      position,
      department,
      bio,
      skills,
      email,
      linkedin,
      profileImage,
    })
    revalidatePath('/admin/team')
    return { success: true }
  } catch (error) {
    console.error('Error updating team member:', error)
    return { success: false, error: 'Failed to update team member' }
  }
}

const TeamShowcase = async () => {
  await connectDB()
  const teamMembers = await Team.find().sort({ createdAt: -1 }).lean()
  
  const serializedMembers = teamMembers.map(member => ({
    ...member,
    _id: member._id.toString(),
    joinDate: member.joinDate ? member.joinDate.toISOString() : null,
    createdAt: member.createdAt ? member.createdAt.toISOString() : null,
    updatedAt: member.updatedAt ? member.updatedAt.toISOString() : null,
  }))
  
  return (
    <div className="container mx-auto px-2 ">
      <h1 className="text-3xl font-bold mb-4">Team Management</h1>
      <TeamTable 
        members={serializedMembers} 
        deleteTeamMember={deleteTeamMember} 
        updateTeamMember={updateTeamMember}
        bulkDeleteTeamMembers={bulkDeleteTeamMembers}
      />
    </div>
  )
}

export default TeamShowcase
