"use client";

import React, { useState, useRef } from "react";
import { Save, Image as ImageIcon, X, Plus, Trash2, CheckCircle } from "lucide-react";
import { uploadToCloudinary } from "../lib/cloudinary";
import axios from "axios";
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";
const ProjectForm = () => {
  const router = useRouter();
  const [project, setProject] = useState({
    name: "",
    category: "",
    shortDescription: "",
    bulletPoints: ["", "", "", ""],
    technologies: [""],
    description: "",
    clientName: "",
    image: "",
    previewImage: "",
    link: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Reference to the hidden file input
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleBulletPointChange = (index, value) => {
    const newBulletPoints = [...project.bulletPoints];
    newBulletPoints[index] = value;
    setProject((prev) => ({ ...prev, bulletPoints: newBulletPoints }));
  };

  const handleTechChange = (index, value) => {
    const newTech = [...project.technologies];
    newTech[index] = value;
    setProject((prev) => ({ ...prev, technologies: newTech }));
  };

  const addTechnology = () => {
    setProject((prev) => ({ ...prev, technologies: [...prev.technologies, ""] }));
  };

  const removeTechnology = (index) => {
    const newTech = project.technologies.filter((_, i) => i !== index);
    setProject((prev) => ({ ...prev, technologies: newTech }));
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0]; // Access the first file
    if (!file) {
      setErrors((prev) => ({ ...prev, image: "No file selected" }));
      return;
    }

    // Validate file
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setErrors((prev) => ({ ...prev, image: "Please select a valid image file (JPEG, PNG, GIF, WebP)" }));
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      // 5MB
      setErrors((prev) => ({ ...prev, image: "File size must be less than 5MB" }));
      return;
    }

    try {
      setIsSubmitting(true);
      setErrors((prev) => ({ ...prev, image: "" }));

      const result = await uploadToCloudinary(file);

      setProject((prev) => ({
        ...prev,
        image: result.secure_url,
        previewImage: result.secure_url,
      }));

      // Reset file input after successful upload
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Upload error:", error);
      setErrors((prev) => ({ ...prev, image: "Failed to upload image" }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!project.name.trim()) newErrors.name = "Project name is required";
    if (!project.category.trim()) newErrors.category = "Category is required";
    if (!project.shortDescription.trim()) newErrors.shortDescription = "Short description is required";
    if (project.bulletPoints.some((b) => !b.trim())) newErrors.bulletPoints = "All bullet points must be filled";
    if (project.technologies.some((t) => !t.trim())) newErrors.technologies = "All technologies must be filled";
    if (!project.description.trim()) newErrors.description = "Description is required";
    if (!project.clientName.trim()) newErrors.clientName = "Client name is required";
    if (!project.image) newErrors.image = "Image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("name", project.name);
      formData.append("category", project.category);
      formData.append("shortDescription", project.shortDescription);
      project.bulletPoints.forEach((bp, i) => formData.append(`bulletPoints[${i}]`, bp));
      project.technologies.forEach((tech, i) => formData.append(`technologies[${i}]`, tech));
      formData.append("description", project.description);
      formData.append("clientName", project.clientName);
      if (project.image) formData.append("image", project.image);
      formData.append("link", project.link);

      const response = await axios.post("/admin/api/addProjects", {
        project,
      });

      if (response.data.success){
        toast.success("Project saved successfully!");
        router.push("/admin/projects");
      }

      setSuccess(true);
      setProject({
        name: "",
        category: "",
        shortDescription: "",
        bulletPoints: ["", "", "", ""],
        technologies: [""],
        description: "",
        clientName: "",
        image: "",
        previewImage: "",
        link: "",
      });

      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error("Error saving project:", error);
      setErrors((prev) => ({ ...prev, form: "Failed to save project. Please try again." }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-8 px-0 gap-4">
      <div className="col-span-1 mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-black text-gray-800">
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
            <div className="bg-red-100 text-red-800 p-4 rounded-xl">{errors.form}</div>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={project.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-orange-400 focus:border-transparent`}
                placeholder="e.g. Fintech Platform"
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="category"
                value={project.category}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.category ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-orange-400 focus:border-transparent`}
                placeholder="e.g. Finance Technology"
              />
              {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Short Description <span className="text-red-500">*</span>
            </label>
            <input
              name="shortDescription"
              value={project.shortDescription}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.shortDescription ? "border-red-500" : "border-gray-300"
              } focus:ring-2 focus:ring-orange-400 focus:border-transparent`}
              placeholder="A revolutionary banking app with AI-powered insights"
            />
            {errors.shortDescription && (
              <p className="mt-1 text-sm text-red-600">{errors.shortDescription}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Key Features (4 bullet points) <span className="text-red-500">*</span>
            </label>
            <div className="space-y-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.bulletPoints.map((point, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="text-gray-500">•</span>
                  <input
                    type="text"
                    value={point}
                    onChange={(e) => handleBulletPointChange(index, e.target.value)}
                    className={`flex-1 px-4 py-2 rounded-xl border ${
                      errors.bulletPoints ? "border-red-500" : "border-gray-300"
                    } focus:ring-2 focus:ring-orange-400 focus:border-transparent`}
                    placeholder={`Feature ${index + 1}`}
                  />
                </div>
              ))}
              {errors.bulletPoints && <p className="mt-1 text-sm text-red-600">{errors.bulletPoints}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Technologies Used <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-wrap items-center gap-2">
              {project.technologies.map((tech, index) => (
                <div key={index} className="flex items-center gap-1 px-3 py-1">
                  <input
                    type="text"
                    value={tech}
                    onChange={(e) => handleTechChange(index, e.target.value)}
                    className="bg-transparent rounded-lg text-sm w-36"
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Detailed Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={project.description}
              onChange={handleChange}
              rows={4}
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.description ? "border-red-500" : "border-gray-300"
              } focus:ring-2 focus:ring-orange-400 focus:border-transparent`}
              placeholder="A detailed description of the project..."
            />
            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Client Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="clientName"
              value={project.clientName}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.clientName ? "border-red-500" : "border-gray-300"
              } focus:ring-2 focus:ring-orange-400 focus:border-transparent`}
              placeholder="Client or company name"
            />
            {errors.clientName && <p className="mt-1 text-sm text-red-600">{errors.clientName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project Image <span className="text-red-500">*</span>
            </label>
            {/* Hidden file input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isSubmitting}
              className={`w-full px-4 py-6 border-2 rounded-xl ${
                errors.image ? "border-red-500" : "border-gray-300 hover:border-orange-400"
              } transition-colors`}
            >
              {project.previewImage ? (
                <img
                  src={project.previewImage}
                  alt="Preview"
                  className="h-32 mx-auto object-contain"
                />
              ) : (
                <div className="text-center">
                  <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">Click to upload an image</p>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF, WebP up to 5MB</p>
                </div>
              )}
            </button>
            {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
          </div>

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

          <div className="flex justify-end gap-4 pt-6">
            <button
              type="button"
              onClick={() => {
                setProject({
                  name: "",
                  category: "",
                  shortDescription: "",
                  bulletPoints: ["", "", "", ""],
                  technologies: [""],
                  description: "",
                  clientName: "",
                  image: "",
                  previewImage: "",
                  link: "",
                });
                setErrors({});
                if (fileInputRef.current) {
                  fileInputRef.current.value = "";
                }
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
                    <svg
                      className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
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

     
    </div>
  );
};

export default ProjectForm;