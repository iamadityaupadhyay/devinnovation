import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import connectDB from '@/lib/util';
import Service from '@/app/admin/model/service';
import EditServiceForm from '@/app/admin/components/EditServiceForm';
import { uploadToCloudinary } from '@/app/admin/lib/cloudinary';

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
    technologies: serviceDoc.technologies || [],
    description: serviceDoc.description || '',
    link: serviceDoc.link || '',
    createdAt: serviceDoc.createdAt?.toISOString(),
    updatedAt: serviceDoc.updatedAt?.toISOString(),
  };

  async function updateService(formData) {
    'use server';

    const name = formData.get('name');
    const category = formData.get('category');
    const bulletPoints = formData.get('bulletPoints').split('\n').filter(point => point.trim());
    const imageFile = formData.get('imageFile');
    const imageUrl = formData.get('imageUrl');
    const technologies = formData.get('technologies')?.split(',').map(t => t.trim()) || [];
    const description = formData.get('description') || '';
    const link = formData.get('link') || '';

    let finalImageUrl = imageUrl || serviceDoc.image;

    // Handle file upload to Cloudinary if a new file is provided
    if (imageFile && imageFile.size > 0) {
      try {
        const result = await uploadToCloudinary(imageFile);
        finalImageUrl = result.secure_url;
      } catch (error) {
        console.error('Error uploading image to Cloudinary:', error);
        throw new Error('Failed to upload image to Cloudinary');
      }
    }

    try {
      await connectDB();
      await Service.findByIdAndUpdate(id, {
        name,
        category,
        bulletPoints,
        technologies,
        description,
        image: finalImageUrl,
        link,
      });
      revalidatePath('/services');
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