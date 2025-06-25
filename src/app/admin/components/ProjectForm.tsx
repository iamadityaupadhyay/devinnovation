"use client";

import React, { useState } from "react";
import { Save, Image as ImageIcon, X, Plus, Trash2, CheckCircle } from "lucide-react";

const ProjectForm = () => {
  const [project, setProject] = useState({
    title: "",
    category: "",
    description: "",
    features: [""],
    technologies: [""],
    image: "",
    link: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProject(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...project.features];
    newFeatures[index] = value;
    setProject(prev => ({ ...prev, features: newFeatures }));
  };

  const handleTechChange = (index: number, value: string) => {
    const newTech = [...project.technologies];
    newTech[index] = value;
    setProject(prev => ({ ...prev, technologies: newTech }));
  };

  const addFeature = () => {
    setProject(prev => ({ ...prev, features: [...prev.features, ""] }));
  };

  const addTechnology = () => {
    setProject(prev => ({ ...prev, technologies: [...prev.technologies, ""] }));
  };

  const removeFeature = (index: number) => {
    const newFeatures = project.features.filter((_, i) => i !== index);
    setProject(prev => ({ ...prev, features: newFeatures }));
  };

  const removeTechnology = (index: number) => {
    const newTech = project.technologies.filter((_, i) => i !== index);
    setProject(prev => ({ ...prev, technologies: newTech }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!project.title.trim()) newErrors.title = "Title is required";
    if (!project.category.trim()) newErrors.category = "Category is required";
    if (!project.description.trim()) newErrors.description = "Description is required";
    if (!project.image.trim()) newErrors.image = "Image URL is required";
    if (project.features.some(f => !f.trim())) newErrors.features = "All features must be filled";
    if (project.technologies.some(t => !t.trim())) newErrors.technologies = "All technologies must be filled";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      // Replace with your actual API endpoint
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(project),
      });

      if (!response.ok) throw new Error('Failed to save project');

      setSuccess(true);
      // Reset form after successful submission
      setProject({
        title: "",
        category: "",
        description: "",
        features: [""],
        technologies: [""],
        image: "",
        link: ""
      });
      
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Error saving project:', error);
      setErrors(prev => ({ ...prev, form: "Failed to save project. Please try again." }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-3xl shadow-lg">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-black text-gray-800">
          <span className="bg-gradient-to-r from-orange-400 to-red-500 text-transparent bg-clip-text">
            ADD NEW PROJECT
          </span>
        </h2>
        {success && (
          <div className="flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full">
            <CheckCircle className="w-5 h-5" />
            <span>Project saved successfully!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {errors.form && (
          <div className="bg-red-100 text-red-800 p-4 rounded-xl">
            {errors.form}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={project.title}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl border ${errors.title ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-orange-400 focus:border-transparent`}
              placeholder="e.g. Fintech Platform"
            />
            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="category"
              value={project.category}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl border ${errors.category ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-orange-400 focus:border-transparent`}
              placeholder="e.g. Finance Technology"
            />
            {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            name="description"
            value={project.description}
            onChange={handleChange}
            rows={3}
            className={`w-full px-4 py-3 rounded-xl border ${errors.description ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-orange-400 focus:border-transparent`}
            placeholder="A brief description of the project..."
          />
          {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
        </div>

        {/* Features */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Features <span className="text-red-500">*</span>
          </label>
          <div className="space-y-2">
            {project.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={feature}
                  onChange={(e) => handleFeatureChange(index, e.target.value)}
                  className={`flex-1 px-4 py-2 rounded-xl border ${errors.features ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-orange-400 focus:border-transparent`}
                  placeholder={`Feature ${index + 1}`}
                />
                {project.features.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="p-2 text-red-500 hover:text-red-700 rounded-full hover:bg-red-50"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
            {errors.features && <p className="mt-1 text-sm text-red-600">{errors.features}</p>}
            <button
              type="button"
              onClick={addFeature}
              className="mt-2 flex items-center gap-2 text-orange-500 hover:text-orange-700 text-sm font-medium"
            >
              <Plus className="w-4 h-4" />
              Add Feature
            </button>
          </div>
        </div>

        {/* Technologies */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Technologies <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, index) => (
              <div key={index} className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
                <input
                  type="text"
                  value={tech}
                  onChange={(e) => handleTechChange(index, e.target.value)}
                  className="bg-transparent outline-none text-sm w-24"
                  placeholder="Technology"
                />
                {project.technologies.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeTechnology(index)}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addTechnology}
              className="flex items-center gap-1 text-orange-500 hover:text-orange-700 text-sm font-medium"
            >
              <Plus className="w-4 h-4" />
              Add Tech
            </button>
          </div>
          {errors.technologies && <p className="mt-1 text-sm text-red-600">{errors.technologies}</p>}
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image URL <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-2">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <ImageIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                name="image"
                value={project.image}
                onChange={handleChange}
                className={`w-full pl-10 px-4 py-3 rounded-xl border ${errors.image ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-orange-400 focus:border-transparent`}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            {project.image && (
              <div className="w-16 h-16 rounded-lg overflow-hidden border">
                <img
                  src={project.image}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>
          {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
        </div>

        {/* Project Link */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Project Link (Optional)
          </label>
          <input
            type="url"
            name="link"
            value={project.link}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-400 focus:border-transparent"
            placeholder="https://example.com"
          />
        </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-4 pt-6">
          <button
            type="button"
            onClick={() => {
              setProject({
                title: "",
                category: "",
                description: "",
                features: [""],
                technologies: [""],
                image: "",
                link: ""
              });
              setErrors({});
            }}
            className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Trash2 className="w-5 h-5" />
              Clear
            </div>
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white font-medium rounded-xl hover:from-orange-600 hover:to-red-700 transition-colors disabled:opacity-70"
          >
            <div className="flex items-center gap-2">
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Save Project
                </>
              )}
            </div>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;