
"use client";

import React, { useState, useEffect, useCallback, useRef, useTransition } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { Image as ImageIcon, Trash2, Save } from 'lucide-react';
import { uploadToCloudinary } from '@/app/admin/lib/cloudinary';

// Define interfaces for type safety
interface Client {
  _id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  projectName: string;
  joiningDate: string;
  status: 'pending' | 'active' | 'inactive';
  createdAt: string;
  image: string;
  feedback: string;
}

interface FormData {
  name: string;
  address: string;
  phone: string;
  email: string;
  projectName: string;
  joiningDate: string;
  status: Client['status'];
  image: string;
  feedback: string;
}

interface SortConfig {
  key: keyof Client;
  direction: 'asc' | 'desc';
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

const ClientsTable: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [clientsPerPage] = useState<number>(10);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'createdAt', direction: 'desc' });
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [viewClient, setViewClient] = useState<Client | null>(null);
  const [editClient, setEditClient] = useState<Client | null>(null);
  const [deleteClient, setDeleteClient] = useState<Client | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    address: '',
    phone: '',
    email: '',
    projectName: '',
    joiningDate: '',
    status: 'pending',
    image: '',
    feedback: ''
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isPending, startTransition] = useTransition();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageMode, setImageMode] = useState<'upload' | 'url'>('upload');

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get<Client[]>('/admin/api/addClient');
        setClients(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch clients');
        setLoading(false);
      }
    };
    fetchClients();
  }, []);

  // Initialize form data when editClient changes
  useEffect(() => {
    if (editClient) {
      setFormData({
        name: editClient.name,
        address: editClient.address,
        phone: editClient.phone,
        email: editClient.email,
        projectName: editClient.projectName,
        joiningDate: editClient.joiningDate.split('T')[0],
        status: editClient.status,
        image: editClient.image,
        feedback: editClient.feedback
      });
      setErrors({});
      setImageMode(editClient.image ? 'url' : 'upload');
    }
  }, [editClient]);

  // Sorting function
  const sortClients = useCallback((key: keyof Client) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    setClients(prevClients => {
      const sortedClients = [...prevClients].sort((a, b) => {
        if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
        if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
        return 0;
      });
      return sortedClients;
    });
  }, [sortConfig.key, sortConfig.direction]);

  // Filtering function
  const filteredClients = filterStatus === 'all'
    ? clients
    : clients.filter(client => client.status === filterStatus);

  // Pagination
  const indexOfLastClient = currentPage * clientsPerPage;
  const indexOfFirstClient = indexOfLastClient - clientsPerPage;
  const currentClients = filteredClients.slice(indexOfFirstClient, indexOfLastClient);
  const totalPages = Math.ceil(filteredClients.length / clientsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Handle View
  const handleView = useCallback((client: Client) => {
    setViewClient(client);
  }, []);

  // Handle Edit
  const handleEdit = useCallback((client: Client) => {
    setEditClient(client);
  }, []);

  // Handle Delete
  const handleDelete = useCallback(async (client: Client) => {
    try {
      await axios.delete('/admin/api/addClient', { data: { id: client._id } });
      setClients(prevClients => prevClients.filter(c => c._id !== client._id));
      setDeleteClient(null);
      toast.success('Client deleted successfully');
    } catch (err) {
      toast.error('Failed to delete client');
    }
  }, []);

  // Handle Form Change
  const handleFormChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
      if (errors) {
        setErrors(prev => ({ ...prev, [name]: null }));
      }
    },
    [errors]
  );

  // Handle File Upload
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      setErrors(prev => ({ ...prev, image: 'No file selected' }));
      toast.error('No file selected for upload.');
      return;
    }

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setErrors(prev => ({
        ...prev,
        image: 'Please select a valid image file (JPEG, PNG, GIF, WebP)',
      }));
      toast.error('Please select a valid image file (JPEG, PNG, GIF, WebP).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, image: 'File size must be less than 5MB' }));
      toast.error('File size must be less than 5MB.');
      return;
    }

    try {
      setErrors(prev => ({ ...prev, image: '' }));
      const result = await uploadToCloudinary(file);
      setFormData(prev => ({
        ...prev,
        image: result.secure_url,
      }));
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      toast.success('Image uploaded successfully!');
    } catch (error) {
      console.error('Upload error:', error);
      setErrors(prev => ({ ...prev, image: 'Failed to upload image' }));
      toast.error('Failed to upload image.');
    }
  };

  // Validate URL
  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch {
      return false;
    }
  };

  // Handle Edit Submit
  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editClient) return;

    // Validation
    const validationErrors: Partial<FormData> = {};
    if (!formData.name || formData.name.length < 2) {
      validationErrors.name = 'Name must be at least 2 characters long';
    }
    if (!formData.address) {
      validationErrors.address = 'Address is required';
    }
    if (!formData.phone || !/^\+?\d{7,15}$/.test(formData.phone)) {
      validationErrors.phone = 'Phone number must be 7-15 digits';
    }
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      validationErrors.email = 'Please provide a valid email address';
    }
    if (!formData.projectName) {
      validationErrors.projectName = 'Project name is required';
    }
    if (!formData.joiningDate) {
      validationErrors.joiningDate = 'Joining date is required';
    }
    if (imageMode === 'upload' && !formData.image) {
      validationErrors.image = 'Image upload is required';
    } else if (imageMode === 'url' && !formData.image) {
      validationErrors.image = 'Image URL is required';
    } else if (imageMode === 'url' && !isValidUrl(formData.image)) {
      validationErrors.image = 'Please enter a valid URL';
    }

    if (Object.keys(validationErrors).length > 0) {
      toast.error('Please fix the form errors');
      setErrors(validationErrors);
      return;
    }

    startTransition(async () => {
      try {
        const updateData = { ...formData, id: editClient._id };
        const response = await axios.put<Client>('/admin/api/addClient', updateData);
        setClients(prevClients =>
          prevClients.map(c => c._id === editClient._id ? response.data : c)
        );
        setEditClient(null);
        toast.success('Client updated successfully');
      } catch (err) {
        toast.error('Failed to update client');
      }
    });
  };

  // Modal Component
  const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">{title}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
          </div>
          {children}
        </div>
      </div>
    );
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-0">
 
      
      {/* Filter Section */}
      <div className="mb-6">
        <label className="mr-2">Filter by Status:</label>
        <select
          className="border rounded px-2 py-1"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {(['name', 'email', 'phone', 'projectName', 'status', 'joiningDate'] as Array<keyof Client>).map(
                (key) => (
                  <th
                    key={key}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => sortClients(key)}
                  >
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                    {sortConfig.key === key && (
                      <span>{sortConfig.direction === 'asc' ? ' ↑' : ' ↓'}</span>
                    )}
                  </th>
                )
              )}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentClients.map((client) => (
              <React.Fragment key={client._id}>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">{client.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{client.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{client.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{client.projectName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${client.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          client.status === 'active' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'}`}
                    >
                      {client.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(client.joiningDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleView(client)}
                      className="text-indigo-600 hover:text-indigo-900 mr-2"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleEdit(client)}
                      className="text-blue-600 hover:text-blue-900 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleteClient(client)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
                {/* Edit Form Row */}
                {editClient?._id === client._id && (
                  <tr>
                    <td colSpan={7} className="px-6 py-4">
                      <form onSubmit={handleEditSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-sm shadow-md">
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name <span className="text-red-500">*</span></label>
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleFormChange}
                              className={`w-full px-3 py-2 rounded-xl border ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-indigo-400 focus:border-transparent`}
                              maxLength={100}
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number <span className="text-red-500">*</span></label>
                            <input
                              type="text"
                              name="phone"
                              value={formData.phone}
                              onChange={handleFormChange}
                              className={`w-full px-3 py-2 rounded-xl border ${errors.phone ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-indigo-400 focus:border-transparent`}
                              placeholder="+1234567890"
                            />
                            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email <span className="text-red-500">*</span></label>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleFormChange}
                              className={`w-full px-3 py-2 rounded-xl border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-indigo-400 focus:border-transparent`}
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Project Name <span className="text-red-500">*</span></label>
                            <input
                              type="text"
                              name="projectName"
                              value={formData.projectName}
                              onChange={handleFormChange}
                              className={`w-full px-3 py-2 rounded-xl border ${errors.projectName ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-indigo-400 focus:border-transparent`}
                              maxLength={200}
                            />
                            {errors.projectName && <p className="text-red-500 text-sm mt-1">{errors.projectName}</p>}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Joining Date <span className="text-red-500">*</span></label>
                            <input
                              type="date"
                              name="joiningDate"
                              value={formData.joiningDate}
                              onChange={handleFormChange}
                              className={`w-full px-3 py-2 rounded-xl border ${errors.joiningDate ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-indigo-400 focus:border-transparent`}
                            />
                            {errors.joiningDate && <p className="text-red-500 text-sm mt-1">{errors.joiningDate}</p>}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <select
                              name="status"
                              value={formData.status}
                              onChange={handleFormChange}
                              className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                            >
                              <option value="pending">Pending</option>
                              <option value="active">Active</option>
                              <option value="inactive">Inactive</option>
                            </select>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Address <span className="text-red-500">*</span></label>
                            <textarea
                              name="address"
                              value={formData.address}
                              onChange={handleFormChange}
                              className={`w-full px-3 py-2 rounded-xl border ${errors.address ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-indigo-400 focus:border-transparent`}
                              rows={4}
                              maxLength={500}
                            />
                            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Feedback</label>
                            <textarea
                              name="feedback"
                              value={formData.feedback}
                              onChange={handleFormChange}
                              className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                              rows={4}
                              maxLength={1000}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Client Image <span className="text-red-500">*</span>
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
                                    setFormData(prev => ({ ...prev, image: '' }));
                                    setErrors(prev => ({ ...prev, image: '' }));
                                  }}
                                  className="text-indigo-600 focus:ring-indigo-600"
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
                                    setFormData(prev => ({ ...prev, image: '' }));
                                    setErrors(prev => ({ ...prev, image: '' }));
                                  }}
                                  className="text-indigo-600 focus:ring-indigo-600"
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
                                />
                                <button
                                  type="button"
                                  onClick={() => fileInputRef.current?.click()}
                                  disabled={isPending}
                                  className={`w-full px-4 py-4 border-2 rounded-xl ${
                                    errors.image ? 'border-red-500' : 'border-gray-300 hover:border-indigo-400'
                                  } transition-colors`}
                                >
                                  {formData.image ? (
                                    <img
                                      src={formData.image}
                                      alt="Preview"
                                      className="h-24 mx-auto object-contain"
                                    />
                                  ) : (
                                    <div className="text-center">
                                      <ImageIcon className="mx-auto h-10 w-10 text-gray-400" />
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
                                  value={formData.image}
                                  onChange={handleFormChange}
                                  className={`w-full px-3 py-2 rounded-xl border ${
                                    errors.image ? 'border-red-500' : 'border-gray-300'
                                  } focus:ring-2 focus:ring-indigo-400 focus:border-transparent`}
                                  placeholder="https://example.com/image.jpg"
                                />
                                {formData.image && (
                                  <img
                                    src={formData.image}
                                    alt="URL Preview"
                                    className="h-24 mx-auto object-contain mt-2"
                                    onError={() =>
                                      setErrors(prev => ({ ...prev, image: 'Invalid image URL' }))
                                    }
                                  />
                                )}
                              </>
                            )}
                            {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
                          </div>
                          <div className="flex justify-end gap-4 pt-4">
                            <button
                              type="button"
                              onClick={() => {
                                setFormData({
                                  name: '',
                                  address: '',
                                  phone: '',
                                  email: '',
                                  projectName: '',
                                  joiningDate: '',
                                  status: 'pending',
                                  image: '',
                                  feedback: ''
                                });
                                setImageMode('upload');
                                setErrors({});
                                if (fileInputRef.current) {
                                  fileInputRef.current.value = '';
                                }
                              }}
                              className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
                            >
                              <div className="flex items-center gap-2">
                                <Trash2 className="w-4 h-4" />
                                Clear
                              </div>
                            </button>
                            <button
                              type="button"
                              onClick={() => setEditClient(null)}
                              className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              disabled={isPending}
                              className={`px-4 py-2 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                              <div className="flex items-center gap-2">
                                {isPending ? (
                                  <>
                                    <svg
                                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                                    <Save className="w-4 h-4" />
                                    Save
                                  </>
                                )}
                              </div>
                            </button>
                          </div>
                        </div>
                      </form>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-between items-center">
        <div>
          Showing {indexOfFirstClient + 1} to {Math.min(indexOfLastClient, filteredClients.length)} of {filteredClients.length} clients
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* View Modal */}
      <Modal isOpen={!!viewClient} onClose={() => setViewClient(null)} title="Client Details">
        {viewClient && (
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Name</h3>
              <p>{viewClient.name}</p>
            </div>
            <div>
              <h3 className="font-semibold">Address</h3>
              <textarea
                readOnly
                value={viewClient.address}
                rows={4}
                className="w-full border rounded px-3 py-2 whitespace-pre-wrap"
              />
            </div>
            <div>
              <h3 className="font-semibold">Phone</h3>
              <p>{viewClient.phone}</p>
            </div>
            <div>
              <h3 className="font-semibold">Email</h3>
              <p>{viewClient.email}</p>
            </div>
            <div>
              <h3 className="font-semibold">Project Name</h3>
              <p>{viewClient.projectName}</p>
            </div>
            <div>
              <h3 className="font-semibold">Joining Date</h3>
              <p>{new Date(viewClient.joiningDate).toLocaleDateString()}</p>
            </div>
            <div>
              <h3 className="font-semibold">Status</h3>
              <p>{viewClient.status}</p>
            </div>
            <div>
              <h3 className="font-semibold">Feedback</h3>
              <textarea
                readOnly
                value={viewClient.feedback}
                rows={4}
                className="w-full border rounded px-3 py-2 whitespace-pre-wrap"
              />
            </div>
            <div>
              <h3 className="font-semibold">Image</h3>
              {viewClient.image ? (
                <img
                  src={viewClient.image}
                  alt="Client"
                  className="h-24 object-contain"
                />
              ) : (
                <p>No image available</p>
              )}
            </div>
            <div>
              <h3 className="font-semibold">Created At</h3>
              <p>{new Date(viewClient.createdAt).toLocaleString()}</p>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={!!deleteClient} onClose={() => setDeleteClient(null)} title="Confirm Deletion">
        {deleteClient && (
          <div className="space-y-4">
            <p>Are you sure you want to delete the client <strong>{deleteClient.name}</strong>? This action cannot be undone.</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setDeleteClient(null)}
                className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteClient)}
                className="px-4 py-2 bg-red-600 text-white font-medium rounded-xl hover:bg-red-700 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Trash2 className="w-4 h-4" />
                  Delete
                </div>
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ClientsTable;
