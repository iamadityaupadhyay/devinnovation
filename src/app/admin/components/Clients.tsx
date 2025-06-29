"use client";
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';

// Define interfaces for type safety
interface Client {
  _id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  projectName: string;
  joiningDate: string;
  numberOfProjects: number;
  status: 'pending' | 'active' | 'inactive';
  createdAt: string;
}

interface FormData {
  name: string;
  address: string;
  phone: string;
  email: string;
  projectName: string;
  joiningDate: string;
  numberOfProjects: number;
  status: Client['status'];
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
  const [formData, setFormData] = useState<FormData>({
    name: '',
    address: '',
    phone: '',
    email: '',
    projectName: '',
    joiningDate: '',
    numberOfProjects: 0,
    status: 'pending',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

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
        numberOfProjects: editClient.numberOfProjects,
        status: editClient.status,
      });
      setErrors({});
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

  // Handle Form Change
  const handleFormChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    },
    []
  );

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
   

    if (Object.keys(validationErrors).length > 0) {
      toast.error('Please fix the form errors');
      setErrors(validationErrors);
      return;
    }

    try {
      const updateData = { ...formData, id: editClient._id };
      const response = await axios.put<Client>('/admin/api/addClient', updateData);
      setClients(prevClients =>
        prevClients.map(c =>c._id === editClient._id ? response.data : c)
      );
      setEditClient(null);
      toast.success('Client updated successfully');
    } catch (err) {
      toast.error('Failed to update client');
    }
  };

  // Modal Component
  const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
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
      {/* <Toaster position="top-right" /> */}
      
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
              {(['name', 'email', 'phone', 'projectName', 'status', 'joiningDate', 'numberOfProjects'] as Array<keyof Client>).map(
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
                  <td className="px-6 py-4 whitespace-nowrap">{client.numberOfProjects}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleView(client)}
                      className="text-indigo-600 hover:text-indigo-900 mr-2"
                    >
                      View
                    </button>
                    <button
                      onClick={() => setEditClient(editClient?._id === client._id ? null : client)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      {editClient?._id === client._id ? 'Close' : 'Edit'}
                    </button>
                  </td>
                </tr>
                {/* Edit Form Row */}
                {editClient?._id === client._id && (
                  <tr>
                    <td colSpan={5} className="px-6 py-4">
                      <form onSubmit={handleEditSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleFormChange}
                              className={`mt-1 block w-full border rounded px-3 py-2 ${errors.name ? 'border-red-500' : ''}`}
                              maxLength={100}
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleFormChange}
                              className={`mt-1 block w-full border rounded px-3 py-2 ${errors.email ? 'border-red-500' : ''}`}
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Phone</label>
                            <input
                              type="text"
                              name="phone"
                              value={formData.phone}
                              onChange={handleFormChange}
                              className={`mt-1 block w-full border rounded px-3 py-2 ${errors.phone ? 'border-red-500' : ''}`}
                            />
                            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Project Name</label>
                            <input
                              type="text"
                              name="projectName"
                              value={formData.projectName}
                              onChange={handleFormChange}
                              className={`mt-1 block w-full border rounded px-3 py-2 ${errors.projectName ? 'border-red-500' : ''}`}
                              maxLength={200}
                            />
                            {errors.projectName && <p className="text-red-500 text-sm mt-1">{errors.projectName}</p>}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Joining Date</label>
                            <input
                              type="date"
                              name="joiningDate"
                              value={formData.joiningDate}
                              onChange={handleFormChange}
                              className={`mt-1 block w-full border rounded px-3 py-2 ${errors.joiningDate ? 'border-red-500' : ''}`}
                            />
                            {errors.joiningDate && <p className="text-red-500 text-sm mt-1">{errors.joiningDate}</p>}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Number of Projects</label>
                            <input
                              type="number"
                              name="numberOfProjects"
                              value={formData.numberOfProjects}
                              onChange={handleFormChange}
                              className={`mt-1 block w-full border rounded px-3 py-2 ${errors.numberOfProjects ? 'border-red-500' : ''}`}
                              min={0}
                            />
                            {errors.numberOfProjects && <p className="text-red-500 text-sm mt-1">{errors.numberOfProjects}</p>}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Status</label>
                            <select
                              name="status"
                              value={formData.status}
                              onChange={handleFormChange}
                              className="mt-1 block w-full border rounded px-3 py-2"
                            >
                              <option value="pending">Pending</option>
                              <option value="active">Active</option>
                              <option value="inactive">Inactive</option>
                            </select>
                          </div>
                          <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Address</label>
                            <textarea
                              name="address"
                              value={formData.address}
                              onChange={handleFormChange}
                              className={`mt-1 block w-full border rounded px-3 py-2 ${errors.address ? 'border-red-500' : ''}`}
                              rows={4}
                              maxLength={500}
                            />
                            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                          </div>
                        </div>
                        <div className="flex justify-end space-x-2">
                          <button
                            type="button"
                            onClick={() => setEditClient(null)}
                            className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                          >
                            Save
                          </button>
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
                rows={3}
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
              <h3 className="font-semibold">Number of Projects</h3>
              <p>{viewClient.numberOfProjects}</p>
            </div>
            <div>
              <h3 className="font-semibold">Status</h3>
              <p>{viewClient.status}</p>
            </div>
            <div>
              <h3 className="font-semibold">Created At</h3>
              <p>{new Date(viewClient.createdAt).toLocaleString()}</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ClientsTable;