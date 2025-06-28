"use client";

import React, { useState, useEffect, useRef } from "react";
import { Save, X, CheckCircle, Edit2 } from "lucide-react";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
const ContactForm = () => {
  const [contact, setContact] = useState({
    address: "",
    phoneNumber: "",
    whatsapp: "",
    email: "",
    emailHR: "",
    linkedin: "",
    twitter: "",
    facebook: "",
    instagram: "",
  });
  const [originalContact, setOriginalContact] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch contact data on component mount
  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await axios.get("/admin/api/getContact");
        if (response.data) {
          setContact(response.data);
          setOriginalContact(response.data);
          setIsEditing(true);
        }
       toast.success("Contact data fetched successfully!");
      } catch (error) {
        console.error("Error fetching contact:", error);
      }
    };
    fetchContact();
  }, []);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!contact.address.trim()) newErrors.address = "Address is required";
    if (!contact.phoneNumber.trim()) newErrors.phoneNumber = "Primary phone is required";
    else if (!/^\+?\d{10,15}$/.test(contact.phoneNumber)) newErrors.phoneNumber = "Invalid phone number";
    if (contact.whatsapp && !/^\+?\d{10,15}$/.test(contact.whatsapp)) newErrors.whatsapp = "Invalid phone number";
    if (!contact.email.trim()) newErrors.email = "Sales email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) newErrors.email = "Invalid email";
    if (!contact.emailHR.trim()) newErrors.emailHR = "HR email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.emailHR)) newErrors.emailHR = "Invalid email";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdateField = async (field) => {
    const updatedValue = contact[field];
    if (updatedValue === originalContact[field]) return;

    setIsSubmitting(true);
    try {
      const response = await axios.put("/admin/api/updateContact", {
        field,
        value: updatedValue,
      });
      if (response.data.success) {
        setOriginalContact((prev) => ({ ...prev, [field]: updatedValue }));
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      }
      toast.success(`${field.charAt(0).toUpperCase() + field.slice(1)} updated successfully!`);
    } catch (error) {
      console.error("Error updating field:", error);
      setErrors((prev) => ({ ...prev, [field]: "Failed to update field. Please try again." }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    console.log("Submitting contact:", contact);

    setIsSubmitting(true);
    try {
      const response = await axios.post("/admin/api/addContact", { contact });
      if (response.data.success) {
        console.log("Contact saved successfully:", response.data);
        setOriginalContact(contact);
        setIsEditing(true);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (error) {
      console.error("Error saving contact:", error);
      setErrors((prev) => ({ ...prev, form: "Failed to save contact. Please try again." }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto p-6 bg-white rounded-3xl shadow-lg">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-black text-gray-800">
          <span className="bg-gradient-to-r from-orange-400 to-red-500 text-transparent bg-clip-text">
            {isEditing ? "Update Contact" : "Add Contact"}
          </span>
        </h2>
        {success && (
          <div className="flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full">
            <CheckCircle className="w-5 h-5" />
            <span>{isEditing ? "Contact updated successfully!" : "Contact saved successfully!"}</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {errors.form && (
          <div className="bg-red-100 text-red-800 p-4 rounded-xl">{errors.form}</div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Address <span className="text-red-500">*</span>
          </label>
          <textarea
            name="address"
            value={contact.address}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-xl border ${
              errors.address ? "border-red-500" : "border-gray-300"
            } focus:ring-2 focus:ring-orange-400 focus:border-transparent`}
            rows="3"
            placeholder="Enter address"
          />
          {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
          {isEditing && (
            <button
              type="button"
              onClick={() => handleUpdateField("address")}
              disabled={isSubmitting || contact.address === originalContact?.address}
              className="mt-2 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 disabled:bg-orange-300"
            >
              Update
            </button>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mobile Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={contact.phoneNumber}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.phoneNumber ? "border-red-500" : "border-gray-300"
              } focus:ring-2 focus:ring-orange-400 focus:border-transparent`}
              placeholder="+91-XXX-XXX-XXXX"
            />
            {errors.phoneNumber && <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>}
            {isEditing && (
              <button
                type="button"
                onClick={() => handleUpdateField("phoneNumber")}
                disabled={isSubmitting || contact.phoneNumber === originalContact?.phoneNumber}
                className="mt-2 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 disabled:bg-orange-300"
              >
                Update
              </button>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Whatsapp Number
            </label>
            <input
              type="tel"
              name="whatsapp"
              value={contact.whatsapp}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.whatsapp ? "border-red-500" : "border-gray-300"
              } focus:ring-2 focus:ring-orange-400 focus:border-transparent`}
              placeholder="+91-XXX-XXX-XXXX"
            />
            {errors.whatsapp && <p className="mt-1 text-sm text-red-600">{errors.whatsapp}</p>}
            {isEditing && (
              <button
                type="button"
                onClick={() => handleUpdateField("whatsapp")}
                disabled={isSubmitting || contact.whatsapp === originalContact?.whatsapp}
                className="mt-2 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 disabled:bg-orange-300"
              >
                Update
              </button>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sales Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={contact.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } focus:ring-2 focus:ring-orange-400 focus:border-transparent`}
              placeholder="sales@example.com"
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            {isEditing && (
              <button
                type="button"
                onClick={() => handleUpdateField("email")}
                disabled={isSubmitting || contact.email === originalContact?.email}
                className="mt-2 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 disabled:bg-orange-300"
              >
                Update
              </button>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Main Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="emailHR"
              value={contact.emailHR}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.emailHR ? "border-red-500" : "border-gray-300"
              } focus:ring-2 focus:ring-orange-400 focus:border-transparent`}
              placeholder="hr@example.com"
            />
            {errors.emailHR && <p className="mt-1 text-sm text-red-600">{errors.emailHR}</p>}
            {isEditing && (
              <button
                type="button"
                onClick={() => handleUpdateField("emailHR")}
                disabled={isSubmitting || contact.emailHR === originalContact?.emailHR}
                className="mt-2 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 disabled:bg-orange-300"
              >
                Update
              </button>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              LinkedIn
            </label>
            <input
              type="url"
              name="linkedin"
              value={contact.linkedin}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-400 focus:border-transparent"
              placeholder="https://linkedin.com/company/example"
            />
            {isEditing && (
              <button
                type="button"
                onClick={() => handleUpdateField("linkedin")}
                disabled={isSubmitting || contact.linkedin === originalContact?.linkedin}
                className="mt-2 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 disabled:bg-orange-300"
              >
                Update
              </button>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Twitter
            </label>
            <input
              type="url"
              name="twitter"
              value={contact.twitter}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-400 focus:border-transparent"
              placeholder="https://twitter.com/example"
            />
            {isEditing && (
              <button
                type="button"
                onClick={() => handleUpdateField("twitter")}
                disabled={isSubmitting || contact.twitter === originalContact?.twitter}
                className="mt-2 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 disabled:bg-orange-300"
              >
                Update
              </button>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Facebook
            </label>
            <input
              type="url"
              name="facebook"
              value={contact.facebook}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-400 focus:border-transparent"
              placeholder="https://facebook.com/example"
            />
            {isEditing && (
              <button
                type="button"
                onClick={() => handleUpdateField("facebook")}
                disabled={isSubmitting || contact.facebook === originalContact?.facebook}
                className="mt-2 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 disabled:bg-orange-300"
              >
                Update
              </button>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Instagram
            </label>
            <input
              type="url"
              name="instagram"
              value={contact.instagram}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-400 focus:border-transparent"
              placeholder="https://instagram.com/example"
            />
            {isEditing && (
              <button
                type="button"
                onClick={() => handleUpdateField("instagram")}
                disabled={isSubmitting || contact.instagram === originalContact?.instagram}
                className="mt-2 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 disabled:bg-orange-300"
              >
                Update
              </button>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-6">
          <button
            type="button"
            onClick={() =>
              setContact({
                address: originalContact?.address || "",
                phoneNumber: originalContact?.phoneNumber || "",
                whatsapp: originalContact?.whatsapp || "",
                email: originalContact?.email || "",
                emailHR: originalContact?.emailHR || "",
                linkedin: originalContact?.linkedin || "",
                twitter: originalContact?.twitter || "",
                facebook: originalContact?.facebook || "",
                instagram: originalContact?.instagram || "",
              })
            }
            className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <X className="w-5 h-5" />
              Clear
            </div>
          </button>
          {!isEditing && (
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
                    Save Contact
                  </>
                )}
              </div>
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ContactForm;