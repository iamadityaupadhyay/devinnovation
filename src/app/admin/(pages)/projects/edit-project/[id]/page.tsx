import { redirect } from 'next/navigation';
import connectDB from '@/lib/util';
import Project from '@/app/admin/model/project';
import EditProjectForm from '../../EditProjectForm';
import { uploadToCloudinary } from '@/app/admin/lib/cloudinary';

export default async function EditProjectPage({ params }: any) {
  const { id } = params;
  
  await connectDB();
  const projectDoc = await Project.findById(id);

  if (!projectDoc) {
    redirect('/admin/projects');
  }

  // Convert MongoDB document to plain object
  const project = {
    _id: projectDoc._id.toString(),
    name: projectDoc.name,
    category: projectDoc.category,
    bulletPoints: projectDoc.bulletPoints,
    image: projectDoc.image,
    description: projectDoc.description,
    link: projectDoc.link,
    technologies: projectDoc.technologies,
    shortDescription: projectDoc.shortDescription,
    clientName: projectDoc.clientName,
    previewImage: projectDoc.previewImage,
    createdAt: projectDoc.createdAt?.toISOString(),
    updatedAt: projectDoc.updatedAt?.toISOString(),
  };

  async function updateProject(formData: FormData) {
    'use server';

    const name = formData.get('name') as string;
    const category = formData.get('category') as string;
    const shortDescription = formData.get('shortDescription') as string;
    const description = formData.get('description') as string;
    const link = formData.get('link') as string;
    const clientName = formData.get('clientName') as string;
    const image = formData.get('image') as string;
    const previewImage = formData.get('previewImage') as string;

    // Extract bulletPoints and technologies as arrays
    const bulletPoints: string[] = [];
    formData.forEach((value, key) => {
      if (key.startsWith('bulletPoints[')) {
        bulletPoints[parseInt(key.match(/\[(\d+)\]/)?.[1] || '0')] = value as string;
      }
    });

    const technologies: string[] = [];
    formData.forEach((value, key) => {
      if (key.startsWith('technologies[')) {
        technologies[parseInt(key.match(/\[(\d+)\]/)?.[1] || '0')] = value as string;
      }
    });

    let finalImageUrl = image;

    // Handle file upload to Cloudinary if a new file is provided
    const imageFile = formData.get('imageFile') as File;
    if (imageFile && imageFile.size > 0) {
      try {
        // Validate file type
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
        if (!validTypes.includes(imageFile.type)) {
          throw new Error('Invalid file type. Please upload a JPEG, PNG, GIF, or WebP image.');
        }

        // Validate file size (5MB limit)
        if (imageFile.size > 5 * 1024 * 1024) {
          throw new Error('File size must be less than 5MB.');
        }

        // Upload to Cloudinary
        const result = await uploadToCloudinary(imageFile);
        finalImageUrl = result.secure_url;
      } catch (error) {
        console.error('Error uploading image to Cloudinary:', error);
        throw new Error('Failed to upload image to Cloudinary.');
      }
    }

    try {
      await connectDB();
      console.log('Updating project with ID:', id);
      
      await Project.findByIdAndUpdate(id, {
        name,
        category,
        bulletPoints: bulletPoints.filter((point) => point.trim()),
        image: finalImageUrl,
        description,
        link,
        technologies: technologies.filter((tech) => tech.trim()),
        shortDescription,
        clientName,
        previewImage: finalImageUrl,
      });
    } catch (error) {
      console.error('Error updating project:', error);
      throw new Error('Failed to update project');
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Edit Project</h1>
            <a
              href="/admin/projects"
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              ← Back to Projects
            </a>
          </div>

          <EditProjectForm project={project} updateProject={updateProject} />
        </div>
      </div>
    </div>
  );
}