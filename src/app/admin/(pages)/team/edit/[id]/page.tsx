import { Save } from 'lucide-react';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import connectDB from '@/lib/util';
import Team from '@/app/admin/model/team';
import Link from 'next/link';
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

async function updateTeamMember(formData: FormData) {
  'use server';
  const memberId = formData.get('memberId');
  const name = formData.get('name');
  const position = formData.get('position');
  const department = formData.get('department');
  const bio = formData.get('bio');
  const email = formData.get('email');
  const linkedin = formData.get('linkedin');
  const profileImage = formData.get('profileImage');
  const skills = formData.get('skills')?.toString().split(',').map(s => s.trim()) || [];

  try {
    await connectDB();
    await Team.findByIdAndUpdate(memberId, {
      name,
      position,
      department,
      bio,
      email,
      linkedin,
      profileImage,
      skills,
    });
    revalidatePath('/team');
    redirect('/team');
  } catch (error) {
    console.error('Error updating team member:', error);
    throw new Error('Failed to update team member');
  }
}

export default async function EditTeamMember({ params }: any) {
  await connectDB();
  const member = await Team.findById(params.id).lean() as TeamMember | null;

  if (!member) {
    return <div>Team member not found</div>;
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Edit Team Member</h2>
        <form action={updateTeamMember}>
          <input type="hidden" name="memberId" value={member._id} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm font-medium">Name</label>
              <input
                type="text"
                name="name"
                defaultValue={member.name}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">Position</label>
              <input
                type="text"
                name="position"
                defaultValue={member.position}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">Department</label>
              <input
                type="text"
                name="department"
                defaultValue={member.department}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                defaultValue={member.email}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">LinkedIn</label>
              <input
                type="url"
                name="linkedin"
                defaultValue={member.linkedin}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">Profile Image URL</label>
              <input
                type="url"
                name="profileImage"
                defaultValue={member.profileImage}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block mb-2 text-sm font-medium">Bio</label>
              <textarea
                name="bio"
                defaultValue={member.bio}
                className="w-full p-2 border rounded"
                rows={3}
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block mb-2 text-sm font-medium">Skills (comma separated)</label>
              <input
                type="text"
                name="skills"
                defaultValue={member.skills.join(', ')}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Link
              href="/admin/team"
              className="px-4 py-2 bg-gray-500 text-white rounded"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded flex items-center gap-2"
            >
              <Save size={16} />
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}