import { redirect } from 'next/navigation';
import connectDB from '@/lib/util';
import Project from '@/app/admin/model/project';
import EditProjectForm from '../../EditProjectForm';
import { uploadToCloudinary } from '@/app/admin/lib/cloudinary';

export default async function EditProjectPage({ params }) {
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
    image1: projectDoc.image1,
    image2: projectDoc.image2,
    description: projectDoc.description,
    link: projectDoc.link,
    technologies: projectDoc.technologies,
    shortDescription: projectDoc.shortDescription,
    clientName: projectDoc.clientName,
    previewImage1: projectDoc.previewImage1,
    previewImage2: projectDoc.previewImage2,
    createdAt: projectDoc.createdAt?.toISOString(),
    updatedAt: projectDoc.updatedAt?.toISOString(),
  };

  async function updateProject(id, formData) {
    'use server';
   
    const name = formData.get('name');
    const category = formData.get('category');
    const shortDescription = formData.get('shortDescription');
    const description = formData.get('description');
    const link = formData.get('link');
    const clientName = formData.get('clientName');
    const image1 = formData.get('image1');
    const image2 = formData.get('image2');
    const previewImage1 = formData.get('previewImage1');
    const previewImage2 = formData.get('previewImage2');

    // Extract bulletPoints and technologies as arrays
    const bulletPoints = [];
    formData.forEach((value, key) => {
      if (key.startsWith('bulletPoints[')) {
        bulletPoints[parseInt(key.match(/\[(\d+)\]/)?.[1] || '0')] = value;
      }
    });

    const technologies = [];
    formData.forEach((value, key) => {
      if (key.startsWith('technologies[')) {
        technologies[parseInt(key.match(/\[(\d+)\]/)?.[1] || '0')] = value;
      }
    });

    let finalImageUrl1 = image1;
    let finalImageUrl2 = image2;

    // Handle file uploads to Cloudinary if new files are provided
    const imageFile1 = formData.get('imageFile1');
    const imageFile2 = formData.get('imageFile2');

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];

    if (imageFile1 && imageFile1.size > 0) {
      try {
        // Validate file type
        if (!validTypes.includes(imageFile1.type)) {
          throw new Error('Invalid file type for image 1. Please upload a JPEG, PNG, GIF, or WebP image.');
        }

        // Validate file size (5MB limit)
        if (imageFile1.size > 5 * 1024 * 1024) {
          throw new Error('File size for image 1 must be less than 5MB.');
        }

        // Upload to Cloudinary
        const result = await uploadToCloudinary(imageFile1);
        finalImageUrl1 = result.secure_url;
      } catch (error) {
        console.error('Error uploading image 1 to Cloudinary:', error);
        throw new Error('Failed to upload image 1 to Cloudinary.');
      }
    }

    if (imageFile2 && imageFile2.size > 0) {
      try {
        // Validate file type
        if (!validTypes.includes(imageFile2.type)) {
          throw new Error('Invalid file type for image 2. Please upload a JPEG, PNG, GIF, or WebP image.');
        }

        // Validate file size (5MB limit)
        if (imageFile2.size > 5 * 1024 * 1024) {
          throw new Error('File size for image 2 must be less than 5MB.');
        }

        // Upload to Cloudinary
        const result = await uploadToCloudinary(imageFile2);
        finalImageUrl2 = result.secure_url;
      } catch (error) {
        console.error('Error uploading image 2 to Cloudinary:', error);
        throw new Error('Failed to upload image 2 to Cloudinary.');
      }
    }

    await connectDB();
    try {
      await Project.findByIdAndUpdate(id, {
        name,
        category,
        bulletPoints,
        image1: finalImageUrl1,
        image2: finalImageUrl2,
        description,
        link,
        technologies,
        shortDescription,
        clientName,
        previewImage1: finalImageUrl1,
        previewImage2: finalImageUrl2,
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