"use client";

import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

interface Contact {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  status: 'pending' | 'responded' | 'resolved';
  createdAt: string;
}

interface SortConfig {
  key: keyof Contact;
  direction: 'asc' | 'desc';
}

interface FormData {
  status: Contact['status'];
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
  isHalfScreen?: boolean; // New prop to control modal width
}

const ContactRequestsTable: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [contactsPerPage] = useState<number>(10);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'createdAt', direction: 'desc' });
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [viewContact, setViewContact] = useState<Contact | null>(null);
  const [editContact, setEditContact] = useState<Contact | null>(null);
  const [formData, setFormData] = useState<FormData>({ status: 'pending' });

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get<Contact[]>('/admin/api/getQueries');
        setContacts(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch contact requests');
        setLoading(false);
      }
    };
    fetchContacts();
  }, []);

  // Sorting function

  // Filtering function
  const filteredContacts =
    filterStatus === 'all' ? contacts : contacts.filter((contact) => contact.status === filterStatus);

  // Pagination
  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = filteredContacts.slice(indexOfFirstContact, indexOfLastContact);
  const totalPages = Math.ceil(filteredContacts.length / contactsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Handle View
  const handleView = useCallback((contact: Contact) => {
    setViewContact(contact);
  }, []);

  // Handle Edit
  const handleEdit = useCallback((contact: Contact) => {
    setEditContact(contact);
    setFormData({
      status: contact.status,
    });
  }, []);

  // Handle Form Change
  const handleFormChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    },
    [formData]
  );

  // Handle Edit Submit
  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editContact) return;

    try {
      const response = await axios.put<Contact>('/admin/api/getQuery', {
        id: editContact._id,
        data: formData,
      });
      setContacts((prevContacts) =>
        prevContacts.map((c) => (c._id === editContact._id ? response.data : c))
      );
      setEditContact(null);
    } catch (err) {
      setError('Failed to update contact request');
    }
  };

  // Modal Component
  const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title, isHalfScreen = false }) => {
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div
          className={`bg-white rounded-lg p-6 w-full ${
            isHalfScreen ? 'max-w-md' : 'max-w-2xl'
          } max-h-[90vh] overflow-y-auto`}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">{title}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">
              ×
            </button>
          </div>
          {children}
        </div>
      </div>
    );
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-0 py-8">
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
          <option value="responded">Responded</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {(['name', 'email', 'phone', 'status', 'createdAt'] as Array<keyof Contact>).map((key) => (
                <th
                  key={key}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  
                >
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                  {sortConfig.key === key && (
                    <span>{sortConfig.direction === 'asc' ? ' ↑' : ' ↓'}</span>
                  )}
                </th>
              ))}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentContacts.map((Contact) => (
              <tr key={Contact._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">{Contact.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{Contact.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{Contact.phone || 'N/A'}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${
                        Contact.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : Contact.status === 'responded'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                  >
                    {Contact.status.charAt(0).toUpperCase() + Contact.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(Contact.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleView(Contact)}
                    className="text-indigo-600 hover:text-indigo-900 mr-2"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleEdit(Contact)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-between items-center">
        <div>
          Showing {indexOfFirstContact + 1} to {Math.min(indexOfLastContact, filteredContacts.length)} of{' '}
          {filteredContacts.length} contacts
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
      <Modal isOpen={!!viewContact} onClose={() => setViewContact(null)} title="Contact Request Details">
        {viewContact && (
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Name</h3>
              <p>{viewContact.name}</p>
            </div>
            <div>
              <h3 className="font-semibold">Email</h3>
              <p>{viewContact.email}</p>
            </div>
            <div>
              <h3 className="font-semibold">Phone</h3>
              <p>{viewContact.phone || 'N/A'}</p>
            </div>
            <div>
              <h3 className="font-semibold">Message</h3>
              <textarea
                readOnly
                value={viewContact.message}
                rows={4}
                className="w-full border rounded px-3 py-2 whitespace-pre-wrap"
              />
            </div>
            <div>
              <h3 className="font-semibold">Status</h3>
              <p>{viewContact.status.charAt(0).toUpperCase() + viewContact.status.slice(1)}</p>
            </div>
            <div>
              <h3 className="font-semibold">Created At</h3>
              <p>{new Date(viewContact.createdAt).toLocaleString()}</p>
            </div>
          </div>
        )}
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={!!editContact}
        onClose={() => setEditContact(null)}
        title="Edit Contact Request"
        isHalfScreen={true} // Set half-screen for edit modal
      >
        {editContact && (
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleFormChange}
                className="mt-1 block w-full border rounded px-3 py-2"
              >
                <option value="pending">Pending</option>
                <option value="responded">Responded</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setEditContact(null)}
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
        )}
      </Modal>
    </div>
  );
};

export default ContactRequestsTable;