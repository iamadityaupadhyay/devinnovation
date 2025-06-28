"use client";

import React, { useState, useRef } from "react";
import { Save, Image as ImageIcon, X, Plus, Trash2, CheckCircle } from "lucide-react";
import { uploadToCloudinary } from "../lib/cloudinary";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from "next/navigation";

const TeamForm = () => {
  const [member, setMember] = useState({
    name: "",
    position: "",
    department: "",
    bio: "",
    skills: ["", "", "", ""],
    email: "",
    linkedin: "",
    image: "",
  });
  const [imageMode, setImageMode] = useState("upload"); // "upload" or "url"
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMember((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSkillChange = (index, value) => {
    const newSkills = [...member.skills];
    newSkills[index] = value;
    setMember((prev) => ({ ...prev, skills: newSkills }));
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
      

      const result = await uploadToCloudinary(file);

      setMember((prev) => ({
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
    if (!member.name.trim()) newErrors.name = "Member name is required";
    if (!member.position.trim()) newErrors.position = "Position is required";
    if (!member.department.trim()) newErrors.department = "Department is required";
    if (!member.bio.trim()) newErrors.bio = "Bio is required";
    if (member.skills.some((s) => !s.trim()))
      newErrors.skills = "All skill fields must be filled";
    
    if (member.email && !isValidEmail(member.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (member.linkedin && !isValidUrl(member.linkedin)) {
      newErrors.linkedin = "Please enter a valid LinkedIn URL";
    }

    if (imageMode === "url" && !member.image.trim()) {
      newErrors.image = "Image URL is required";
    } else if (imageMode === "url" && !isValidUrl(member.image)) {
      newErrors.image = "Please enter a valid URL";
    } else if (imageMode === "upload" && !member.image) {
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

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    console.log("Submitting team member:", member);

    setIsSubmitting(true);
    
    try {
      const formData = new FormData();
      formData.append("name", member.name);
      formData.append("position", member.position);
      formData.append("department", member.department);
      formData.append("bio", member.bio);
      member.skills.forEach((skill, i) => formData.append(`skills[${i}]`, skill));
      formData.append("email", member.email);
      formData.append("linkedin", member.linkedin);
      formData.append("image", member.image);

      const response = await axios.post("/admin/api/addTeam", {
        member,
      });

      if (response.data.success) {
        // console.log("Team member saved successfully:", response.data);
        setSuccess(true);
        setMember({
          name: "",
          position: "",
          department: "",
          bio: "",
          skills: ["", "", "", ""],
          email: "",
          linkedin: "",
          image: "",
        });
        setImageMode("upload");
        toast.success("Team member saved successfully!");
        router.push("/admin/team"); // Redirect to team page after success
      }
    } catch (error) {
      console.error("Error saving team member:", error);
      setErrors((prev) => ({ ...prev, form: "Failed to save team member. Please try again." }));
      toast.error("Failed to save team member. Please try again.");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSuccess(false), 3000);
    }
  };

  return (
    <div className=" py-10  gap-4">
      {/* <Toaster position="top-right" /> */}
      <div className=" mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-black text-gray-800">
            <span className="bg-gradient-to-r from-orange-400 to-orange-500 text-transparent bg-clip-text">
              ADD TEAM MEMBER
            </span>
          </h2>
          {success && (
            <div className="flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full">
              <CheckCircle className="w-5 h-5" />
              <span>Team member saved successfully!</span>
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
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={member.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-orange-400 focus:border-transparent`}
                placeholder="e.g. John Doe"
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
                value={member.position}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.position ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-orange-400 focus:border-transparent`}
                placeholder="e.g. Senior Developer"
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
              value={member.department}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.department ? "border-red-500" : "border-gray-300"
              } focus:ring-2 focus:ring-orange-400 focus:border-transparent`}
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
              value={member.bio}
              onChange={handleChange}
              rows={3}
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.bio ? "border-red-500" : "border-gray-300"
              } focus:ring-2 focus:ring-orange-400 focus:border-transparent`}
              placeholder="Brief description about the team member..."
            />
            {errors.bio && <p className="mt-1 text-sm text-red-600">{errors.bio}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Key Skills (4 skills) <span className="text-red-500">*</span>
            </label>
            <div className="space-y-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              {member.skills.map((skill, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="text-gray-500">•</span>
                  <input
                    type="text"
                    value={skill}
                    onChange={(e) => handleSkillChange(index, e.target.value)}
                    className={`flex-1 px-4 py-2 rounded-xl border ${
                      errors.skills ? "border-red-500" : "border-gray-300"
                    } focus:ring-2 focus:ring-orange-400 focus:border-transparent`}
                    placeholder={`Skill ${index + 1}`}
                  />
                </div>
              ))}
              {errors.skills && (
                <p className="mt-1 text-sm text-red-600">{errors.skills}</p>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={member.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-orange-400 focus:border-transparent`}
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
                value={member.linkedin}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.linkedin ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-orange-400 focus:border-transparent`}
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
                  checked={imageMode === "upload"}
                  onChange={() => {
                    setImageMode("upload");
                    setMember((prev) => ({ ...prev, image: "" }));
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
                    setMember((prev) => ({ ...prev, image: "" }));
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
                  {member.image ? (
                    <img
                      src={member.image}
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
                  value={member.image}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.image ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-orange-400 focus:border-transparent`}
                  placeholder="https://example.com/profile-image.jpg"
                />
                {member.image && (
                  <img
                    src={member.image}
                    alt="URL Preview"
                    className="h-32 w-32 mx-auto object-cover rounded-full mt-2"
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
                setMember({
                  name: "",
                  position: "",
                  department: "",
                  bio: "",
                  skills: ["", "", "", ""],
                  email: "",
                  linkedin: "",
                  image: "",
                });
                setImageMode("upload");
                setErrors({});
                if (fileInputRef.current) {
                  fileInputRef.current.value = "";
                }
                toast.success("Form cleared successfully!");
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
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium rounded-xl hover:from-orange-600 hover:to-orange-700 transition-colors disabled:opacity-70"
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
                    Save Team Member
                  </>
                )}
              </div>
            </button>
          </div>
        </form>
      </div>
      <h1 className="text-center mt-5">Preview Card</h1>
      <div className=" justify-center mt-2 items-center flex">
        
        <img
          src="/team.png"
          alt="Team Form Illustration"
          
          className="w-64 h-96 object-cover rounded-lg"
        />
      </div>
    </div>
  );
};

export default TeamForm;