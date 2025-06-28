"use client";

import React, { useState, useRef } from "react";
import { Save, Image as ImageIcon, X, Plus, Trash2, CheckCircle } from "lucide-react";
import { uploadToCloudinary } from "../lib/cloudinary";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

const ServicesForm = () => {
  const [service, setService] = useState({
    name: "",
    category: "",
    bulletPoints: ["", "", "", ""],
    image: "",
  });
  const [imageMode, setImageMode] = useState("upload"); // "upload" or "url"
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setService((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleBulletPointChange = (index, value) => {
    const newBulletPoints = [...service.bulletPoints];
    newBulletPoints[index] = value;
    setService((prev) => ({ ...prev, bulletPoints: newBulletPoints }));
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      setErrors((prev) => ({ ...prev, image: "No file selected" }));
      toast.error("No file selected for upload.");
      return;
    }

    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        image: "Please select a valid image file (JPEG, PNG, GIF, WebP)",
      }));
      toast.error("Please select a valid image file (JPEG, PNG, GIF, WebP).");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, image: "File size must be less than 5MB" }));
      toast.error("File size must be less than 5MB.");
      return;
    }

    try {
      setIsSubmitting(true);
      setErrors((prev) => ({ ...prev, image: "" }));
      toast.loading("Uploading image...");

      const result = await uploadToCloudinary(file);

      setService((prev) => ({
        ...prev,
        image: result.secure_url,
      }));

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      toast.success("Image uploaded successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      setErrors((prev) => ({ ...prev, image: "Failed to upload image" }));
      toast.error("Failed to upload image.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!service.name.trim()) newErrors.name = "Service name is required";
    if (!service.category.trim()) newErrors.category = "Category is required";
    if (service.bulletPoints.some((b) => !b.trim()))
      newErrors.bulletPoints = "All bullet points must be filled";
   
    if (imageMode === "url" && !service.image.trim()) {
      newErrors.image = "Image URL is required";
    } else if (imageMode === "url" && !isValidUrl(service.image)) {
      newErrors.image = "Please enter a valid URL";
    } else if (imageMode === "upload" && !service.image) {
      newErrors.image = "Image upload is required";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      Object.values(newErrors).forEach((error) => toast.error(error));
    }
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    console.log("Submitting service:", service);

    setIsSubmitting(true);
    toast.loading("Saving service...");
    try {
      const formData = new FormData();
      formData.append("name", service.name);
      formData.append("category", service.category);
      service.bulletPoints.forEach((bp, i) => formData.append(`bulletPoints[${i}]`, bp));
      formData.append("image", service.image);

      const response = await axios.post("/admin/api/addServices", {
        service,
      });

      if (response.data.success) {
        console.log("Service saved successfully:", response.data);
        setSuccess(true);
        setService({
          name: "",
          category: "",
          bulletPoints: ["", "", "", ""],
          image: "",
        });
        setImageMode("upload");
        toast.success("Service saved successfully!");
      }
    } catch (error) {
      console.error("Error saving service:", error);
      setErrors((prev) => ({ ...prev, form: "Failed to save service. Please try again." }));
      toast.error("Failed to save service. Please try again.");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSuccess(false), 3000);
    }
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:px-5 px-2 py-10">
      <div className="col-span-1 p-6 bg-white rounded-3xl shadow-lg">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-black text-gray-800">
            <span className="bg-gradient-to-r from-orange-400 to-red-500 text-transparent bg-clip-text">
              Add New Service
            </span>
          </h2>
          {success && (
            <div className="flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full">
              <CheckCircle className="w-5 h-5" />
              <span>Service saved successfully!</span>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {errors.form && (
            <div className="bg-red-100 text-red-800 p-4 rounded-xl">{errors.form}</div>
          )}

          <div className="grid gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Service Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={service.name}
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
                value={service.category}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.category ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-orange-400 focus:border-transparent`}
                placeholder="e.g. Finance Technology"
              />
              {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Key Features (4 bullet points) <span className="text-red-500">*</span>
              </label>
              <div className="space-y-2">
                {service.bulletPoints.map((point, index) => (
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
                {errors.bulletPoints && (
                  <p className="mt-1 text-sm text-red-600">{errors.bulletPoints}</p>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>

      <div className="col-span-1 p-6 bg-white rounded-3xl shadow-lg">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Service Image <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-4 mb-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="imageMode"
                value="upload"
                checked={imageMode === "upload"}
                onChange={() => {
                  setImageMode("upload");
                  setService((prev) => ({ ...prev, image: "" }));
                  setErrors((prev) => ({ ...prev, image: "" }));
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
                checked={imageMode === "url"}
                onChange={() => {
                  setImageMode("url");
                  setService((prev) => ({ ...prev, image: "" }));
                  setErrors((prev) => ({ ...prev, image: "" }));
                }}
                className="text-orange-400 focus:ring-orange-400"
              />
              Enter URL
            </label>
          </div>

          {imageMode === "upload" ? (
            <>
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
                {service.image ? (
                  <img
                    src={service.image}
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
            </>
          ) : (
            <>
              <input
                type="url"
                name="image"
                value={service.image}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.image ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-orange-400 focus:border-transparent`}
                placeholder="https://example.com/image.jpg"
              />
              {service.image && (
                <img
                  src={service.image}
                  alt="URL Preview"
                  className="h-32 mx-auto object-contain mt-2"
                  onError={() =>
                    setErrors((prev) => ({ ...prev, image: "Invalid image URL" }))
                  }
                />
              )}
            </>
          )}
          {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
        </div>

        <div className="flex justify-end gap-4 pt-6">
          <button
            type="button"
            onClick={() => {
              setService({
                name: "",
                category: "",
                bulletPoints: ["", "", "", ""],
                image: "",
              });
              setImageMode("upload");
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
            form="service-form"
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
                  Save Service
                </>
              )}
            </div>
          </button>
        </div>
      </div>

      
    </div>
  );
};

export default ServicesForm;