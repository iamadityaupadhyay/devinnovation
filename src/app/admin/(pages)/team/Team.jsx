import { Mail, Linkedin, Trash2, Edit2 } from 'lucide-react';
import Image from 'next/image';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import connectDB from '@/lib/util';
import Team from '../../model/team';
import Link from 'next/link';



// Server Actions
async function deleteTeamMember(formData) {
  'use server';
  const memberId = formData.get('memberId');

  try {
    await connectDB();
    await Team.findByIdAndDelete(memberId);
    revalidatePath('/admin/team');
  } catch (error) {
    console.error('Error deleting team member:', error);
    throw new Error('Failed to delete team member');
  }
}

const TeamShowcase = async () => {
  await connectDB();
  const teamMembers = await Team.find().sort({ joinDate: -1 }).lean();

  return (
    <div className="container mx-auto px-0 py-2">
      {/* Team Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member) => {
          const typedMember = member
          return (
            <div key={typedMember._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
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
              <div className="flex space-x-2">
                <Link
                  href={`/admin/team/edit/${member._id}`}
                  className="text-gray-500 hover:text-blue-500"
                  title="Edit"
                >
                  <Edit2 size={16} />
                </Link>
                <form action={deleteTeamMember}>
                  <input type="hidden" name="memberId" value={member._id} />
                  <button
                    type="submit"
                    className="text-gray-500 hover:text-red-500"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </form>
              </div>
        
      </div>
    </div>
  );
})}
      </div>
      
      
    </div>
  );
};


export default TeamShowcase;