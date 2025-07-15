'use client'

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

export default function EditServiceForm({ service, updateService }) {
  const router = useRouter();
  const [previewImage, setPreviewImage] = useState(service.image);
  const [imageType, setImageType] = useState(service.image?.startsWith('http') ? 'url' : 'file');
  const [imageUrl, setImageUrl] = useState(service.image?.startsWith('http') ? service.image : '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
      };
      reader.readAsDataURL(file);
      setImageType('file');
    }
  };

  const handleImageUrlChange = (e) => {
    const url = e.target.value;
    setImageUrl(url);
    setPreviewImage(url);
    setImageType('url');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    

    const formData = new FormData(e.target);

    if (imageType === 'url') {
      formData.set('imageUrl', imageUrl);
    } else {
      formData.set('imageUrl', service.image);
    }

    try {
      await updateService(formData);
      toast.success('Service updated successfully!');
      router.push('/admin/services');
    } catch (error) {
      console.error('Error updating service:', error);
      
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
    
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Service Name
        </label>
        <input
          type="text"
          name="name"
          defaultValue={service.name}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors text-sm"
          required
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Category
        </label>
        <input
          type="text"
          name="category"
          defaultValue={service.category}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors text-sm"
          required
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Bullet Points (one per line)
        </label>
        <textarea
          name="bulletPoints"
          defaultValue={service.bulletPoints.join('\n')}
          className="w-full p-2 border border-gray-300 rounded-lg h-24 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors text-sm"
          placeholder="Enter each bullet point on a new line"
          required
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Service Image
        </label>

        <div className="mb-2">
          <div className="flex space-x-3">
            <label className="flex items-center">
              <input
                type="radio"
                name="imageType"
                value="file"
                checked={imageType === 'file'}
                onChange={(e) => setImageType(e.target.value)}
                className="mr-1"
              />
              Upload File
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="imageType"
                value="url"
                checked={imageType === 'url'}
                onChange={(e) => setImageType(e.target.value)}
                className="mr-1"
              />
              Image URL
            </label>
          </div>
        </div>

        {imageType === 'file' && (
          <div className="mb-2">
            <input
              type="file"
              name="imageFile"
              accept="image/*"
              onChange={handleImageFileChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100 text-sm"
            />
            <p className="text-xs text-gray-500 mt-1">
              Supported formats: JPG, PNG, GIF, WebP (Max 5MB)
            </p>
          </div>
        )}

        {imageType === 'url' && (
          <div className="mb-2">
            <input
              type="url"
              name="imageUrl"
              value={imageUrl}
              onChange={handleImageUrlChange}
              placeholder="https://example.com/image.jpg"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors text-sm"
            />
          </div>
        )}

        {previewImage && (
          <div className="mb-2">
            <p className="text-xs font-medium text-gray-700 mb-1">Preview:</p>
            <div className="relative w-full h-40 bg-gray-100 rounded-lg overflow-hidden border-2 border-dashed border-gray-300">
              <Image
                src={previewImage}
                alt="Service preview"
                fill
                className="object-cover"
                onError={() => setPreviewImage('/placeholder-image.jpg')}
              />
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-3 pt-4 border-t">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 disabled:bg-orange-300 disabled:cursor-not-allowed font-semibold transition-colors duration-200 flex items-center justify-center text-xs"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Updating...
            </>
          ) : (
            'Update Service'
          )}
        </button>

        <a
          href="/admin/services"
          className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 font-semibold text-center transition-colors duration-200 text-xs"
        >
          Cancel
        </a>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <h4 className="font-semibold text-blue-900 mb-1 text-xs">Tips:</h4>
        <ul className="text-xs text-blue-800 space-y-1">
          <li>• Use high-quality images for better visual appeal</li>
          <li>• Recommended image size: 400x300 pixels or similar aspect ratio</li>
          <li>• Each bullet point should be concise and descriptive</li>
          <li>• Category should be short and relevant (e.g., "Development", "Design")</li>
        </ul>
      </div>
    </form>
  );
}