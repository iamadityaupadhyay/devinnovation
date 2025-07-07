'use client';
import { useState, useTransition, useRef } from 'react';
import { Mail, Linkedin, Trash2, Edit2, Save, X, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { updateTeamMember, deleteTeamMember } from './Team';
import toast, { Toaster } from 'react-hot-toast';
import { uploadToCloudinary } from '../../lib/cloudinary';

const TeamMemberCard = ({ member }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: member.name || '',
    position: member.position || '',
    department: member.department || '',
    bio: member.bio || '',
    skills: Array.isArray(member.skills) ? member.skills.join(', ') : '',
    email: member.email || '',
    linkedin: member.linkedin || '',
    image: member.profileImage || '',
  });
  const [imageMode, setImageMode] = useState(member.profileImage ? 'url' : 'upload');
  const [errors, setErrors] = useState({});
  const [isPending, startTransition] = useTransition();
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      setErrors((prev) => ({ ...prev, image: 'No file selected' }));
      toast.error('No file selected for upload.');
      return;
    }

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        image: 'Please select a valid image file (JPEG, PNG, GIF, WebP)',
      }));
      toast.error('Please select a valid image file (JPEG, PNG, GIF, WebP).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, image: 'File size must be less than 5MB' }));
      toast.error('File size must be less than 5MB.');
      return;
    }

    try {
      setErrors((prev) => ({ ...prev, image: '' }));
      const result = await uploadToCloudinary(file);
      setFormData((prev) => ({ ...prev, image: result.secure_url }));
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      toast.success('Image uploaded successfully!');
    } catch (error) {
      console.error('Upload error:', error);
      setErrors((prev) => ({ ...prev, image: 'Failed to upload image' }));
      toast.error('Failed to upload image.');
    }
  };

  const isValidUrl = (string) => {
    if (!string) return true; // Empty string is valid (optional field)
    try {
      new URL(string);
      return true;
    } catch {
      return false;
    }
  };

  const isValidEmail = (email) => {
    if (!email) return true; // Empty email is valid (optional field)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Member name is required';
    if (!formData.position.trim()) newErrors.position = 'Position is required';
    if (!formData.department.trim()) newErrors.department = 'Department is required';
    if (!formData.bio.trim()) newErrors.bio = 'Bio is required';
    if (!formData.skills.trim()) newErrors.skills = 'At least one skill is required';
    if (formData.email && !isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (formData.linkedin && !isValidUrl(formData.linkedin)) {
      newErrors.linkedin = 'Please enter a valid LinkedIn URL';
    }
    if (imageMode === 'url' && formData.image && !isValidUrl(formData.image)) {
      newErrors.image = 'Please enter a valid image URL';
    }
    if (imageMode === 'upload' && !formData.image) {
      newErrors.image = 'Image upload is required';
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      Object.values(newErrors).forEach((error) => toast.error(error));
    }
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = async (formDataAction) => {
    if (!validate()) return;

    // Create a new FormData object to ensure all fields are included
    const updatedFormData = new FormData();
    updatedFormData.append('memberId', member._id);
    updatedFormData.append('name', formData.name);
    updatedFormData.append('position', formData.position);
    updatedFormData.append('department', formData.department);
    updatedFormData.append('bio', formData.bio);
    updatedFormData.append('skills', formData.skills);
    updatedFormData.append('email', formData.email);
    updatedFormData.append('linkedin', formData.linkedin);
    updatedFormData.append('image', formData.image);

    

    startTransition(async () => {
      const result = await updateTeamMember(updatedFormData);
      if (!result.success) {
        setErrors((prev) => ({ ...prev, form: result.error }));
        toast.error(result.error);
      } else {
        setIsEditing(false);
        setErrors({});
        toast.success('Team member updated successfully!');
      }
    });
  };

  const handleDelete = async (formDataAction) => {
    startTransition(async () => {
      const result = await deleteTeamMember(formDataAction);
      if (!result.success) {
        setErrors((prev) => ({ ...prev, form: result.error }));
        toast.error(result.error);
      } else {
        toast.success('Team member deleted successfully!');
      }
    });
  };

  return (
    <div className="bg-white  rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      
      {isEditing ? (
        <form action={handleUpdate} className="p-4 space-y-6">
          <input type="hidden" name="memberId" value={member._id} />
          {errors.form && (
            <div className="bg-red-100 text-red-800 p-4 rounded-xl">{errors.form}</div>
          )}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                } focus:ring-2 focus:ring-orange-400 focus:border-transparent text-sm`}
                placeholder="e.g. John Doe"
                required
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Position <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.position ? 'border-red-500' : 'border-gray-300'
                } focus:ring-2 focus:ring-orange-400 focus:border-transparent text-sm`}
                placeholder="e.g. Senior Developer"
                required
              />
              {errors.position && <p className="mt-1 text-sm text-red-600">{errors.position}</p>}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Department <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.department ? 'border-red-500' : 'border-gray-300'
              } focus:ring-2 focus:ring-orange-400 focus:border-transparent text-sm`}
              placeholder="e.g. Engineering"
            />
            {errors.department && <p className="mt-1 text-sm text-red-600">{errors.department}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bio <span className="text-red-500">*</span>
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.bio ? 'border-red-500' : 'border-gray-300'
              } focus:ring-2 focus:ring-orange-400 focus:border-transparent text-sm`}
              rows="3"
              placeholder="Brief description about the team member..."
            />
            {errors.bio && <p className="mt-1 text-sm text-red-600">{errors.bio}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Skills (comma-separated) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.skills ? 'border-red-500' : 'border-gray-300'
              } focus:ring-2 focus:ring-orange-400 focus:border-transparent text-sm`}
              placeholder="e.g. JavaScript, React, Node.js"
            />
            {errors.skills && <p className="mt-1 text-sm text-red-600">{errors.skills}</p>}
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                } focus:ring-2 focus:ring-orange-400 focus:border-transparent text-sm`}
                placeholder="john.doe@company.com"
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                LinkedIn URL
              </label>
              <input
                type="url"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.linkedin ? 'border-red-500' : 'border-gray-300'
                } focus:ring-2 focus:ring-orange-400 focus:border-transparent text-sm`}
                placeholder="https://linkedin.com/in/johndoe"
              />
              {errors.linkedin && <p className="mt-1 text-sm text-red-600">{errors.linkedin}</p>}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Profile Image <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-4 mb-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="imageMode"
                  value="upload"
                  checked={imageMode === 'upload'}
                  onChange={() => {
                    setImageMode('upload');
                    setFormData((prev) => ({ ...prev, image: '' }));
                    setErrors((prev) => ({ ...prev, image: '' }));
                  }}
                  className="text-orange-400 focus:ring-orange-400"
                />
                Upload Image
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="imageMode"
                  value="url"
                  checked={imageMode === 'url'}
                  onChange={() => {
                    setImageMode('url');
                    setFormData((prev) => ({ ...prev, image: member.profileImage || '' }));
                    setErrors((prev) => ({ ...prev, image: '' }));
                  }}
                  className="text-orange-400 focus:ring-orange-400"
                />
                Enter URL
              </label>
            </div>
            {imageMode === 'upload' ? (
              <>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                  className="hidden"
                  name="image"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isPending}
                  className={`w-full px-4 py-6 border-2 rounded-xl ${
                    errors.image ? 'border-red-500' : 'border-gray-300 hover:border-orange-400'
                  } transition-colors`}
                >
                  {formData.image ? (
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="h-32 w-32 mx-auto object-cover rounded-full"
                    />
                  ) : (
                    <div className="text-center">
                      <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-600">Click to upload profile image</p>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF, WebP up to 5MB</p>
                    </div>
                  )}
                </button>
              </>
            ) : (
              <>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.image ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-orange-400 focus:border-transparent text-sm`}
                  placeholder="https://example.com/profile-image.jpg"
                />
                {formData.image && (
                  <img
                    src={formData.image}
                    alt="URL Preview"
                    className="h-32 w-32 mx-auto object-cover rounded-full mt-2"
                    onError={() =>
                      setErrors((prev) => ({ ...prev, image: 'Invalid image URL' }))
                    }
                  />
                )}
              </>
            )}
            {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
          </div>
          <div className="bg-gray-50 px-4 py-3 flex justify-between items-center">
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setFormData({
                  name: member.name || '',
                  position: member.position || '',
                  department: member.department || '',
                  bio: member.bio || '',
                  skills: Array.isArray(member.skills) ? member.skills.join(', ') : '',
                  email: member.email || '',
                  linkedin: member.linkedin || '',
                  image: member.profileImage || '',
                });
                setImageMode(member.profileImage ? 'url' : 'upload');
                setErrors({});
              }}
              className="text-gray-500 hover:text-red-500"
              title="Cancel"
              disabled={isPending}
            >
              <X size={16} />
            </button>
            <button
              type="submit"
              className="text-gray-500 hover:text-orange-600"
              title="Save"
              disabled={isPending}
            >
              <Save size={16} />
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="p-4 ">
            <div className="flex items-center space-x-4">
              <div className="relative h-16 w-16 rounded-full overflow-hidden">
                <Image
                  src={formData.image || '/default-profile.jpg'}
                  alt={formData.name || 'Team Member'}
                  width={64}
                  height={64}
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-bold text-lg">{formData.name || 'Unknown'}</h3>
                <p className="text-gray-600 text-sm">{formData.position || 'No position'}</p>
                <p className="text-gray-500 text-xs">{formData.department || 'No department'}</p>
              </div>
            </div>
            <p className="mt-3 text-gray-700 text-sm line-clamp-3">{formData.bio || 'No bio available'}</p>
            <div className="mt-3 flex flex-wrap gap-1">
              {formData.skills.split(',').filter(skill => skill.trim()).slice(0, 4).map((skill, i) => (
                <span key={i} className="bg-gray-100 px-2 py-1 rounded text-xs">
                  {skill.trim()}
                </span>
              ))}
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 flex justify-between items-center">
            <div className="flex space-x-2">
              {formData.email && (
                <a
                  href={`mailto:${formData.email}`}
                  className="text-gray-500 hover:text-orange-600"
                  title="Email"
                >
                  <Mail size={16} />
                </a>
              )}
              {formData.linkedin && (
                <a
                  href={formData.linkedin}
                  target="_blank"
                  className="text-gray-500 hover:text-orange-600"
                  title="LinkedIn"
                >
                  <Linkedin size={16} />
                </a>
              )}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setIsEditing(true)}
                className="text-gray-500 hover:text-orange-600"
                title="Edit"
                disabled={isPending}
              >
                <Edit2 size={16} />
              </button>
              <form action={handleDelete}>
                <input type="hidden" name="memberId" value={member._id} />
                <button
                  type="submit"
                  className="text-gray-500 hover:text-red-500"
                  title="Delete"
                  disabled={isPending}
                >
                  <Trash2 size={16} />
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TeamMemberCard;