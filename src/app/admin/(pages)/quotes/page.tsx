"use client";

import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
interface Quote {
  quote: any;
  _id: string;
  fullName: string;
  email: string;
  countryCode: string;
  mobile: string;
  budget: string;
  projectInfo: string;
  status: 'pending' | 'reviewed' | 'in-progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  submittedAt: string;
  adminNotes?: string;
}

interface FormData {
  status: Quote['status'];
  priority: Quote['priority'];
  adminNotes: string;
}

interface SortConfig {
  key: keyof Quote;
  direction: 'asc' | 'desc';
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
  isHalfScreen?: boolean;
}

const QuoteRequestsTable: React.FC = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [quotesPerPage] = useState<number>(10);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'submittedAt', direction: 'desc' });
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [viewQuote, setViewQuote] = useState<Quote | null>(null);
  const [editQuote, setEditQuote] = useState<Quote | null>(null);
  const [formData, setFormData] = useState<FormData>({ status: 'pending', priority: 'low', adminNotes: '' });
  const [selectedQuotes, setSelectedQuotes] = useState<string[]>([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await axios.get<Quote[]>('/admin/api/getQuote');
        setQuotes(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch quote requests');
        setLoading(false);
      }
    };
    fetchQuotes();
  }, []);

  // Statistics calculation
  const stats = {
    total: quotes.length,
    pending: quotes.filter(q => q.status === 'pending').length,
    reviewed: quotes.filter(q => q.status === 'reviewed').length,
    inProgress: quotes.filter(q => q.status === 'in-progress').length,
    completed: quotes.filter(q => q.status === 'completed').length,
    cancelled: quotes.filter(q => q.status === 'cancelled').length,
  };

  // Sorting function
  const sortQuotes = useCallback((key: keyof Quote) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    setQuotes(prevQuotes => {
      const sortedQuotes = [...prevQuotes].sort((a, b) => {
        const aValue = a[key] || '';
        const bValue = b[key] || '';
        if (key === 'submittedAt') {
          return direction === 'asc'
            ? new Date(aValue).getTime() - new Date(bValue).getTime()
            : new Date(bValue).getTime() - new Date(aValue).getTime();
        }
        if (aValue < bValue) return direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return direction === 'asc' ? 1 : -1;
        return 0;
      });
      return sortedQuotes;
    });
  }, [sortConfig.key, sortConfig.direction]);

  // Handle select all
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedQuotes(currentQuotes.map(quote => quote._id));
    } else {
      setSelectedQuotes([]);
    }
  };

  // Handle individual selection
  const handleSelectQuote = (id: string) => {
    setSelectedQuotes(prev =>
      prev.includes(id)
        ? prev.filter(quoteId => quoteId !== id)
        : [...prev, id]
    );
  };

  // Handle single delete
  const handleDelete = async (id: string) => {
    try {
      await axios.delete('/admin/api/getQuote', { data: { id } });
      setQuotes(prev => prev.filter(quote => quote._id !== id));
      setSelectedQuotes(prev => prev.filter(quoteId => quoteId !== id));
    } catch (err) {
      setError('Failed to delete quote request');
    }
  };

  // Handle bulk delete
  const handleBulkDelete = async () => {
    try {
      await Promise.all(
        selectedQuotes.map(id =>
          axios.delete('/admin/api/getQuote', { data: { id } })
        )
      );
      setQuotes(prev => prev.filter(quote => !selectedQuotes.includes(quote._id)));
      setSelectedQuotes([]);
      setShowDeleteConfirm(false);
    } catch (err) {
      setError('Failed to delete quote requests');
    }
  };

  // Filtering function
  const filteredQuotes = filterStatus === 'all'
    ? quotes
    : quotes.filter(quote => quote.status === filterStatus);

  // Pagination
  const indexOfLastQuote = currentPage * quotesPerPage;
  const indexOfFirstQuote = indexOfLastQuote - quotesPerPage;
  const currentQuotes = filteredQuotes.slice(indexOfFirstQuote, indexOfLastQuote);
  const totalPages = Math.ceil(filteredQuotes.length / quotesPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Handle View
  const handleView = useCallback((quote: Quote) => {
    setViewQuote(quote);
  }, []);

  // Handle Edit
  const handleEdit = useCallback((quote: Quote) => {
    setEditQuote(quote);
    setFormData({
      status: quote.status,
      priority: quote.priority,
      adminNotes: quote.adminNotes || '',
    });
  }, []);

  // Handle Form Change
  const handleFormChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    },
    []
  );

  // Handle Edit Submit
  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editQuote) return;

    try {
      const submitData = { ...formData, id: editQuote._id };
      const response = await axios.put<Quote>("/admin/api/updateQuote", submitData);
      if (response.data){
        toast.success("Quote updated successfully");
      }
      setQuotes(prevQuotes =>
        prevQuotes.map(q => q._id === editQuote._id ? response.data.quote : q)
      );
      setEditQuote(null);
      setFormData({ status: 'pending', priority: 'low', adminNotes: '' });
    } catch (err) {
      setError('Failed to update quote request');
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
    <div className="container px-0 py-8">
      {/* Statistics Section */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-blue-100 p-4 rounded-lg">
          <h3 className="font-semibold">Total Quotes</h3>
          <p className="text-2xl">{stats.total}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg">
          <h3 className="font-semibold">Pending</h3>
          <p className="text-2xl">{stats.pending}</p>
        </div>
        <div className="bg-blue-100 p-4 rounded-lg">
          <h3 className="font-semibold">Reviewed</h3>
          <p className="text-2xl">{stats.reviewed}</p>
        </div>
        <div className="bg-purple-100 p-4 rounded-lg">
          <h3 className="font-semibold">In Progress</h3>
          <p className="text-2xl">{stats.inProgress}</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg">
          <h3 className="font-semibold">Completed</h3>
          <p className="text-2xl">{stats.completed}</p>
        </div>
      </div>

      {/* Filter and Bulk Actions */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <label className="mr-2">Filter by Status:</label>
          <select
            className="border rounded px-2 py-1"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="reviewed">Reviewed</option>
            <option value="in-progress">In-Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        {selectedQuotes.length > 0 && (
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Delete Selected ({selectedQuotes.length})
          </button>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={selectedQuotes.length === currentQuotes.length && currentQuotes.length > 0}
                />
              </th>
              {(['fullName', 'email', 'mobile', 'budget', 'status', 'priority', 'submittedAt'] as Array<keyof Quote>).map(
                (key) => (
                  <th
                    key={key}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => sortQuotes(key)}
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
            {currentQuotes.map((quote) => (
              <React.Fragment key={quote._id}>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedQuotes.includes(quote._id)}
                      onChange={() => handleSelectQuote(quote._id)}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{quote.fullName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{quote.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {quote.countryCode}
                    {quote.mobile}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{quote.budget}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${
                          quote.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : quote.status === 'reviewed'
                            ? 'bg-blue-100 text-blue-800'
                            : quote.status === 'in-progress'
                            ? 'bg-purple-100 text-purple-800'
                            : quote.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                    >
                      {quote.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${
                          quote.priority === 'urgent'
                            ? 'bg-red-100 text-red-800'
                            : quote.priority === 'high'
                            ? 'bg-orange-100 text-orange-800'
                            : quote.priority === 'medium'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                        }`}
                    >
                      {quote.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(quote.submittedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleView(quote)}
                      className="text-indigo-600 hover:text-indigo-900 mr-2"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleEdit(quote)}
                      className="text-blue-600 hover:text-blue-900 mr-2"
                    >
                      {editQuote?._id === quote._id ? 'Close' : 'Edit'}
                    </button>
                    <button
                      onClick={() => handleDelete(quote._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
                {/* Edit Form Row */}
                {editQuote?._id === quote._id && (
                  <tr>
                    <td colSpan={9} className="px-6 py-4">
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
                            <option value="reviewed">Reviewed</option>
                            <option value="in-progress">In-Progress</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Priority</label>
                          <select
                            name="priority"
                            value={formData.priority}
                            onChange={handleFormChange}
                            className="mt-1 block w-full border rounded px-3 py-2"
                          >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                            <option value="urgent">Urgent</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Admin Notes</label>
                          <textarea
                            name="adminNotes"
                            value={formData.adminNotes}
                            onChange={handleFormChange}
                            className="mt-1 block w-full border rounded px-3 py-2"
                            rows={4}
                          />
                        </div>
                        <div className="flex justify-end space-x-2">
                          <button
                            type="button"
                            onClick={() => setEditQuote(null)}
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
          Showing {indexOfFirstQuote + 1} to {Math.min(indexOfLastQuote, filteredQuotes.length)} of{' '}
          {filteredQuotes.length} quotes
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
      <Modal isOpen={!!viewQuote} onClose={() => setViewQuote(null)} title="Quote Request Details">
        {viewQuote && (
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Full Name</h3>
              <p>{viewQuote.fullName}</p>
            </div>
            <div>
              <h3 className="font-semibold">Email</h3>
              <p>{viewQuote.email}</p>
            </div>
            <div>
              <h3 className="font-semibold">Mobile</h3>
              <p>
                {viewQuote.countryCode}
                {viewQuote.mobile}
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Budget</h3>
              <p>{viewQuote.budget}</p>
            </div>
            <div>
              <h3 className="font-semibold">Project Info</h3>
              <textarea
                readOnly
                value={viewQuote.projectInfo}
                rows={15}
                className="w-full border rounded px-3 py-2 whitespace-pre-wrap"
              />
            </div>
            <div>
              <h3 className="font-semibold">Status</h3>
              <p>{viewQuote.status}</p>
            </div>
            TRADEMARK
            <div>
              <h3 className="font-semibold">Priority</h3>
              <p>{viewQuote.priority}</p>
            </div>
            <div>
              <h3 className="font-semibold">Submitted At</h3>
              <p>{new Date(viewQuote.submittedAt).toLocaleString()}</p>
            </div>
            {viewQuote.adminNotes && (
              <div>
                <h3 className="font-semibold">Admin Notes</h3>
                <p>{viewQuote.adminNotes}</p>
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        title="Confirm Delete"
        isHalfScreen={true}
      >
        <div className="space-y-4">
          <p>Are you sure you want to delete {selectedQuotes.length} quote(s)?</p>
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setShowDeleteConfirm(false)}
              className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={handleBulkDelete}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default QuoteRequestsTable;