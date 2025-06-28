// app/admin/services/edit-service/[id]/page.js
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import connectDB from '@/lib/util';
import Service from '@/app/admin/model/service';
import EditServiceForm from '@/app/admin/components/EditServiceForm';

export default async function EditServicePage({ params }) {
  const { id } = params;
  
  await connectDB();
  const serviceDoc = await Service.findById(id);
  
  if (!serviceDoc) {
    redirect('/admin/services');
  }

  // Convert MongoDB document to plain object
  const service = {
    _id: serviceDoc._id.toString(),
    name: serviceDoc.name,
    category: serviceDoc.category,
    bulletPoints: serviceDoc.bulletPoints,
    image: serviceDoc.image,
    createdAt: serviceDoc.createdAt?.toISOString(),
    updatedAt: serviceDoc.updatedAt?.toISOString(),
  };

  async function updateService(formData) {
    'use server'
    
    const name = formData.get('name');
    const category = formData.get('category');
    const bulletPoints = formData.get('bulletPoints').split('\n').filter(point => point.trim());
    const imageFile = formData.get('imageFile');
    const imageUrl = formData.get('imageUrl');
    
    let finalImageUrl = imageUrl;
    
    // Handle file upload if a new file is provided
    if (imageFile && imageFile.size > 0) {
      try {
        // Create upload directory if it doesn't exist
        const fs = require('fs');
        const path = require('path');
        const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'services');
        
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }
        
        // Generate unique filename
        const timestamp = Date.now();
        const originalName = imageFile.name;
        const extension = path.extname(originalName);
        const fileName = `service-${timestamp}${extension}`;
        const filePath = path.join(uploadDir, fileName);
        
        // Convert file to buffer and save
        const bytes = await imageFile.arrayBuffer();
        const buffer = Buffer.from(bytes);
        fs.writeFileSync(filePath, buffer);
        
        // Set the URL for database storage
        finalImageUrl = `/uploads/services/${fileName}`;
        
        // Delete old image if it exists and is not a URL
        if (serviceDoc.image && serviceDoc.image.startsWith('/uploads/')) {
          const oldImagePath = path.join(process.cwd(), 'public', serviceDoc.image);
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        // Keep the original image URL if upload fails
        finalImageUrl = serviceDoc.image;
      }
    }
    
    try {
      await connectDB();
      await Service.findByIdAndUpdate(id, {
        name,
        category,
        bulletPoints,
        image: finalImageUrl
      });
    
    } catch (error) {
      console.error('Error updating service:', error);
      throw new Error('Failed to update service');
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Edit Service</h1>
            <a
              href="/admin/services"
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              ← Back to Services
            </a>
          </div>
          
          <EditServiceForm service={service} updateService={updateService} />
        </div>
      </div>
    </div>
  );
}