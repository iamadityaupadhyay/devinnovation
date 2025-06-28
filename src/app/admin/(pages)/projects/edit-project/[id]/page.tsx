import { redirect } from 'next/navigation';
import connectDB from '@/lib/util';
import Project from '@/app/admin/model/project';
import EditProjectForm from '../../EditProjectForm';

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
    'use server'
    
    const name = formData.get('name') as string;
    const category = formData.get('category') as string;
    const bulletPoints = (formData.get('bulletPoints') as string).split('\n').filter(point => point.trim());
    const imageFile = formData.get('imageFile') as File;
    const imageUrl = formData.get('imageUrl') as string;
    const description = formData.get('description') as string;
    const link = formData.get('link') as string;
    const technologies = (formData.get('technologies') as string).split(',').map(tech => tech.trim());
    const shortDescription = formData.get('shortDescription') as string;
    const clientName = formData.get('clientName') as string;
    const previewImage = formData.get('previewImage') as string;
    
    let finalImageUrl = imageUrl;
    
    // Handle file upload if a new file is provided
    if (imageFile && imageFile.size > 0) {
      try {
        // Create upload directory if it doesn't exist
        const fs = require('fs');
        const path = require('path');
        const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'projects');
        
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }
        
        // Generate unique filename
        const timestamp = Date.now();
        const originalName = imageFile.name;
        const extension = path.extname(originalName);
        const fileName = `project-${timestamp}${extension}`;
        const filePath = path.join(uploadDir, fileName);
        
        // Convert file to buffer and save
        const bytes = await imageFile.arrayBuffer();
        const buffer = Buffer.from(bytes);
        fs.writeFileSync(filePath, buffer);
        
        // Set the URL for database storage
        finalImageUrl = `/uploads/projects/${fileName}`;
        
        // Delete old image if it exists and is not a URL
        if (projectDoc.image && projectDoc.image.startsWith('/uploads/')) {
          const oldImagePath = path.join(process.cwd(), 'public', projectDoc.image);
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        finalImageUrl = projectDoc.image;
      }
    }

    try {
      await connectDB();
      await Project.findByIdAndUpdate(id, {
        name,
        category,
        bulletPoints,
        image: finalImageUrl,
        description,
        link,
        technologies,
        shortDescription,
        clientName,
        previewImage
      });
    }
    catch (error) {
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