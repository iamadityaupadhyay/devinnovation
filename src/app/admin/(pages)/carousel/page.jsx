"use client"
import React, { useEffect, useState, useRef } from 'react'
import { uploadToCloudinary } from '../../lib/cloudinary';
import { ImageIcon, Plus, Trash2, Edit, Save, X } from 'lucide-react';

function CarouselManagementPage() {
  const fileInputRefs = useRef({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState({});
  const [editingIndex, setEditingIndex] = useState(null);
  const [carousel, setCarousel] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch carousel data from API
  const fetchCarouselData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/admin/api/carousel');
      if (!response.ok) {
        throw new Error('Failed to fetch carousel data');
      }
      const data = await response.json();
      console.log(data)

      setCarousel(data.map(item => ({
        id: item.id,
        title: item.title,
        images: {
          image1: item.image1 || '',
          image2: item.image2 || ''
        },
        previewImages: {
          image1: item.image1 || '',
          image2: item.image2 || ''
        },
        description: item.description || '',
        link: item.link || '',
        isActive: item.isActive !== undefined ? item.isActive : true
      })));
    } catch (error) {
      console.error("Error fetching carousel data:", error);
      setErrors(prev => ({ ...prev, general: "Failed to load carousel data" }));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCarouselData();
  }, []);

  // Handle file upload for specific carousel item and image slot
  const handleFileUpload = async (event, index, imageSlot) => {
    const file = event.target.files[0];
    if (!file) {
      setErrors(prev => ({ ...prev, [`${imageSlot}_${index}`]: "No file selected" }));
      return;
    }

    // Validate file
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setErrors(prev => ({ ...prev, [`${imageSlot}_${index}`]: "Please select a valid image file (JPEG, PNG, GIF, WebP)" }));
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, [`${imageSlot}_${index}`]: "File size must be less than 5MB" }));
      return;
    }

    try {
      setIsSubmitting(prev => ({ ...prev, [`${imageSlot}_${index}`]: true }));
      setErrors(prev => ({ ...prev, [`${imageSlot}_${index}`]: "" }));

      const result = await uploadToCloudinary(file);

      setCarousel(prev => prev.map((item, i) => 
        i === index ? {
          ...item,
          images: {
            ...item.images,
            [imageSlot]: result.secure_url
          },
          previewImages: {
            ...item.previewImages,
            [imageSlot]: result.secure_url
          }
        } : item
      ));

      // Reset file input after successful upload
      const inputKey = `${index}_${imageSlot}`;
      if (fileInputRefs.current[inputKey]) {
        fileInputRefs.current[inputKey].value = "";
      }
    } catch (error) {
      console.error("Upload error:", error);
      setErrors(prev => ({ ...prev, [`${imageSlot}_${index}`]: "Failed to upload image" }));
    } finally {
      setIsSubmitting(prev => ({ ...prev, [`${imageSlot}_${index}`]: false }));
    }
  };

  // Handle input changes
  const handleInputChange = (index, field, value) => {
    setCarousel(prev => prev.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    ));
  };

  // Add new carousel item
  const addNewCarouselItem = () => {
    const newItem = {
      id: null,
      title: "",
      images: {
        image1: "",
        image2: ""
      },
      previewImages: {
        image1: "",
        image2: ""
      },
      description: "",
      link: "",
      isActive: true
    };
    setCarousel(prev => [...prev, newItem]);
    setEditingIndex(carousel.length);
  };

  // Delete carousel item
  const deleteCarouselItem = async (index) => {
    if (confirm("Are you sure you want to delete this carousel item?")) {
      const item = carousel[index];
      
      try {
        if (item.id) {
          const response = await fetch(`/admin/api/carousel/${item.id}`, {
            method: 'DELETE',
          });
          if (!response.ok) {
            throw new Error('Failed to delete carousel item');
          }
        }
        
        setCarousel(prev => prev.filter((_, i) => i !== index));
        setEditingIndex(null);
      } catch (error) {
        console.error("Error deleting carousel item:", error);
        setErrors(prev => ({ ...prev, general: "Failed to delete carousel item" }));
      }
    }
  };

  // Save carousel item
  const saveCarouselItem = async (index) => {
    const item = carousel[index];
    
    // Validate required fields
    if (!item.title.trim()) {
      setErrors(prev => ({ ...prev, [`title_${index}`]: "Title is required" }));
      return;
    }
    if (!item.images.image1 && !item.images.image2) {
      setErrors(prev => ({ ...prev, [`images_${index}`]: "At least one image is required" }));
      return;
    }

    try {
      setIsSubmitting(prev => ({ ...prev, [`save_${index}`]: true }));
      setErrors(prev => ({ 
        ...prev, 
        [`title_${index}`]: "", 
        [`images_${index}`]: "" 
      }));

      const method = item.id ? 'PUT' : 'POST';
      const url = item.id ? `/admin/api/carousel` : '/admin/api/carousel';
      
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: item._id,
          title: item.title,
          image1: item.images.image1,
          image2: item.images.image2,
          description: item.description,
          link: item.link,
          isActive: item.isActive
        }),
      });
      

      if (!response.ok) {
        throw new Error('Failed to save carousel item');
      }

      const savedItem = await response.json();
      
      // Update the item with the returned data
      setCarousel(prev => prev.map((carouselItem, i) => 
        i === index ? { ...carouselItem, id: savedItem.id } : carouselItem
      ));
      
      setEditingIndex(null);
    } catch (error) {
      console.error("Error saving carousel item:", error);
      setErrors(prev => ({ ...prev, general: "Failed to save carousel item" }));
    } finally {
      setIsSubmitting(prev => ({ ...prev, [`save_${index}`]: false }));
    }
  };

  // Cancel editing
  const cancelEdit = (index) => {
    if (carousel[index].id === null) {
      setCarousel(prev => prev.filter((_, i) => i !== index));
    } else {
      fetchCarouselData();
    }
    setEditingIndex(null);
  };

  // Render image upload component
  const renderImageUpload = (index, imageSlot, label) => {
    const item = carousel[index];
    const inputKey = `${index}_${imageSlot}`;
    const errorKey = `${imageSlot}_${index}`;
    const submittingKey = `${imageSlot}_${index}`;

    return (
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label} <span className="text-red-500">*</span>
        </label>
        <input
          type="file"
          ref={(el) => fileInputRefs.current[inputKey] = el}
          onChange={(e) => handleFileUpload(e, index, imageSlot)}
          accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
          className="hidden"
        />
        <button
          type="button"
          onClick={() => fileInputRefs.current[inputKey]?.click()}
          disabled={isSubmitting[submittingKey]}
          className={`w-full px-4 py-6 border-2 rounded-xl transition-colors ${
            errors[errorKey] ? "border-red-500" : "border-gray-300 hover:border-blue-400"
          } ${isSubmitting[submittingKey] ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {item.previewImages[imageSlot] ? (
            <div className="relative">
              <img
                src={item.previewImages[imageSlot]}
                alt={`${label} Preview`}
                className="h-32 mx-auto object-contain rounded"
              />
              {isSubmitting[submittingKey] && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded">
                  <span className="text-white">Uploading...</span>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center">
              <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">
                {isSubmitting[submittingKey] ? 'Uploading...' : `Click to upload ${label.toLowerCase()}`}
              </p>
              <p className="text-xs text-gray-500">PNG, JPG, GIF, WebP up to 5MB</p>
            </div>
          )}
        </button>
        {errors[errorKey] && (
          <p className="mt-1 text-sm text-red-600">{errors[errorKey]}</p>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-lg">Loading carousel data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Hero Section Carousel</h1>
          {/* <button
            onClick={addNewCarouselItem}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus size={20} />
            Add New Slide
          </button> */}
        </div>

        {errors.general && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {errors.general}
          </div>
        )}

        <div className="space-y-6">
          {carousel.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No carousel items found. Add your first slide!</p>
            </div>
          ) : (
            carousel.map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      {editingIndex === index ? (
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Title <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              value={item.title}
                              onChange={(e) => handleInputChange(index, 'title', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Enter slide title"
                            />
                            {errors[`title_${index}`] && (
                              <p className="mt-1 text-sm text-red-600">{errors[`title_${index}`]}</p>
                            )}
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Description
                            </label>
                            <textarea
                              value={item.description}
                              onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              rows="3"
                              placeholder="Enter slide description"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Link URL
                            </label>
                            <input
                              type="url"
                              value={item.link}
                              onChange={(e) => handleInputChange(index, 'link', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="https://example.com"
                            />
                          </div>
                          
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id={`active_${index}`}
                              checked={item.isActive}
                              onChange={(e) => handleInputChange(index, 'isActive', e.target.checked)}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor={`active_${index}`} className="ml-2 block text-sm text-gray-900">
                              Active
                            </label>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <h2 className="text-xl font-semibold mb-2">{item.title || 'Untitled Slide'}</h2>
                          {item.description && (
                            <p className="text-gray-600 mb-2">{item.description}</p>
                          )}
                          {item.link && (
                            <p className="text-blue-600 text-sm mb-2">
                              <a href={item.link} target="_blank" rel="noopener noreferrer">
                                {item.link}
                              </a>
                            </p>
                          )}
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            item.isActive 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {item.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 ml-4">
                      {editingIndex === index ? (
                        <>
                          <button
                            onClick={() => saveCarouselItem(index)}
                            disabled={isSubmitting[`save_${index}`]}
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded flex items-center gap-1 transition-colors disabled:opacity-50"
                          >
                            <Save size={16} />
                            {isSubmitting[`save_${index}`] ? 'Saving...' : 'Save'}
                          </button>
                          <button
                            onClick={() => cancelEdit(index)}
                            className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded flex items-center gap-1 transition-colors"
                          >
                            <X size={16} />
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => setEditingIndex(index)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded flex items-center gap-1 transition-colors"
                          >
                            <Edit size={16} />
                            Edit
                          </button>
                          <button
                            onClick={() => deleteCarouselItem(index)}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded flex items-center gap-1 transition-colors"
                          >
                            <Trash2 size={16} />
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                  
                  {/* Images Section */}
                  <div className="mt-6">
                    <h3 className="text-lg font-medium text-gray-700 mb-4">Slide Images</h3>
                    {errors[`images_${index}`] && (
                      <p className="mb-4 text-sm text-red-600">{errors[`images_${index}`]}</p>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {renderImageUpload(index, 'image1', 'Primary Image')}
                      {renderImageUpload(index, 'image2', 'Secondary Image')}
                    </div>
                  </div>
                  
                 
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default CarouselManagementPage;