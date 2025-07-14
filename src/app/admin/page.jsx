import connectDB from "@/lib/util";
import Contact from "./model/contact";
import Team from "./model/team";
import Service from "./model/service";
import Project from "./model/project";
import QuoteRequest from "./model/Quote";
import Client from "./model/client";
import ContactRequest from "../(portfolio)/model/Contact";
import Link from "next/link";
import { auth } from "@/auth";

// since this page is dynamic and needs to fetch data on each request, we set dynamic to 'force-dynamic'
export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  await connectDB();
  let data, loading, error;
  
  try {
    loading = true;
    const contact = await Contact.find().lean();
    const team = await Team.find().sort({ joinDate: -1 });
    const services = await Service.find().sort({ createdAt: -1 });
    const projects = await Project.find().sort({ createdAt: -1 });
    const quotes = await QuoteRequest.find().sort({ createdAt: -1 });
    const clients = await Client.find().sort({ createdAt: -1 });
    const contacts = await ContactRequest.find().sort({ createdAt: -1 });
    
    data = {
      contact: contact ? contact : { email: "No contact info available" },
      team,
      services,
      projects,
      quotes,
      clients,
      contacts,
    };
    loading = false;
    error = null;
  } catch (err) {
    error = "Failed to load dashboard data";
    data = {
      contact: [],
      team: [],
      services: [],
      projects: [],
      quotes: [],
      clients: [],
      contacts: [],
    };
    loading = false;
  }

  // Statistics calculation
  const getStats = () => {
    const today = new Date();
    const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const lastMonth = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

    return {
      totalClients: data.clients.length,
      newClientsThisWeek: data.clients.filter(c => new Date(c.createdAt) >= lastWeek).length,
      totalQuotes: data.quotes.length,
      pendingQuotes: data.quotes.filter(q => q.status === 'pending').length,
      approvedQuotes: data.quotes.filter(q => q.status === 'approved').length,
      totalProjects: data.projects.length,
      activeProjects: data.projects.filter(p => p.status === 'active' || p.status === 'in-progress').length,
      completedProjects: data.projects.filter(p => p.status === 'completed').length,
      totalServices: data.services.length,
      totalQueries: data.contacts.length,
      newQueriesThisMonth: data.contacts.filter(c => new Date(c.createdAt) >= lastMonth).length,
      teamMembers: data.team.length,
    };
  };

  const stats = getStats();

  // Status badge component
  const StatusBadge = ({ status }) => {
    const getStatusColor = (status) => {
      switch (status?.toLowerCase()) {
        case 'active':
        case 'approved':
        case 'completed':
          return 'bg-green-100 text-green-800 border-green-200';
        case 'pending':
        case 'in-progress':
          return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        case 'inactive':
        case 'rejected':
          return 'bg-red-100 text-red-800 border-red-200';
        default:
          return 'bg-gray-100 text-gray-800 border-gray-200';
      }
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(status)}`}>
        {status || 'N/A'}
      </span>
    );
  };

  // Statistics cards
  const StatCard = ({ title, value, subtitle, icon, color, trend }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          {icon}
        </div>
      </div>
      {trend && (
        <div className="mt-4 flex items-center">
          <span className="text-sm text-gray-500">{trend}</span>
        </div>
      )}
    </div>
  );

  // Enhanced data table componentf
  const DataTable = ({ title, items, fields, maxRows = 5, color = "blue" }) => {
    const colorClasses = {
      blue: "border-blue-200 bg-blue-50",
      green: "border-green-200 bg-green-50",
      purple: "border-purple-200 bg-purple-50",
      orange: "border-orange-200 bg-orange-50",
      red: "border-red-200 bg-red-50",
      indigo: "border-indigo-200 bg-indigo-50",
    };

    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className={`${colorClasses[color]} px-6 py-4 border-b border-gray-200`}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
              <p className="text-sm text-gray-600">Total: {items.length} items</p>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-500">
                Last updated: {items.length > 0 && items[0]?.updatedAt ? 
                  new Date(items[0].updatedAt).toLocaleDateString() : 
                  new Date().toLocaleDateString()}
              </span>
              <Link 
                href={`/admin/${title.toLowerCase()}`} 
                className="inline-flex items-center px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors duration-200"
              >
                View All
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                {fields.map((field) => (
                  <th key={field} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {field.replace(/([A-Z])/g, " $1").trim()}
                  </th>
                ))}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {items.slice(0, maxRows).map((item, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                  {fields.map((field) => (
                    <td key={field} className="px-6 py-4 whitespace-nowrap text-sm">
                      {field === 'status' ? (
                        <StatusBadge status={item[field]} />
                      ) : field === 'email' ? (
                        <span className="text-blue-600 hover:text-blue-800">
                          {item[field] || "-"}
                        </span>
                      ) : field === 'link' && item[field] ? (
                        <a href={item[field]} target="_blank" rel="noopener noreferrer" 
                           className="text-blue-600 hover:text-blue-800 underline">
                          View
                        </a>
                      ) : (
                        <span className="text-gray-900 font-medium">
                          {item[field] || "-"}
                        </span>
                      )}
                    </td>
                  ))}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        {items.length > maxRows && (
          <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
            <div className="text-sm text-gray-700">
              Showing {maxRows} of {items.length} items
            </div>
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-300 border-t-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="text-6xl text-red-500 mb-4">⚠️</div>
          <div className="text-2xl font-bold text-red-600 mb-2">Error</div>
          <div className="text-gray-600">{error}</div>
        </div>
      </div>
    );
  }

  const fieldMap = {
    clients: ["name", "status"],
    contacts: ["name", "email"],
    services: ["name", "category"],
    projects: ["name", "clientName", "status"],
    quotes: ["fullName", "status"],
    team: ["name", "email", "position"],
  };

  const session = await auth();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
              <p className="mt-2 text-gray-600">
                Welcome back, {session?.user?.email}. Here's what's happening with your business.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">
                Last updated: {new Date().toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Clients"
            value={stats.totalClients}
            subtitle={`${stats.newClientsThisWeek} new this week`}
            color="bg-blue-100"
            icon={<svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" /></svg>}
          />
          <StatCard
            title="Quote Requests"
            value={stats.totalQuotes}
            subtitle={`${stats.pendingQuotes} pending approval`}
            color="bg-green-100"
            icon={<svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
          />
          <StatCard
            title="Active Projects"
            value={stats.activeProjects}
            subtitle={`${stats.completedProjects} completed`}
            color="bg-purple-100"
            icon={<svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>}
          />
          <StatCard
            title="New Queries"
            value={stats.newQueriesThisMonth}
            subtitle={`${stats.totalQueries} total queries`}
            color="bg-orange-100"
            icon={<svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>}
          />
        </div>

        {/* Data Tables */}
        <div className="space-y-8">
          {/* Recent Queries */}
          <DataTable
            title="Queries"
            items={data.contacts}
            fields={fieldMap.contacts}
            color="green"
          />

          {/* Recent Quote Requests */}
          <DataTable
            title="Quotes"
            items={data.quotes}
            fields={fieldMap.quotes}
            color="blue"
          />

          {/* Projects and Clients Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <DataTable
              title="Projects"
              items={data.projects}
              fields={fieldMap.projects}
              color="purple"
            />
            <DataTable
              title="Clients"
              items={data.clients}
              fields={fieldMap.clients}
              color="indigo"
            />
          </div>

          {/* Services and Team Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <DataTable
              title="Services"
              items={data.services}
              fields={fieldMap.services}
              color="orange"
            />
            <DataTable
              title="Team"
              items={data.team}
              fields={fieldMap.team}
              color="red"
            />
          </div>

          {/* Contact Information */}
          {data.contact && data.contact.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.contact[0] && Object.entries(data.contact[0]).map(([key, value]) => (
                  key !== '_id' && key !== '__v' && key !== 'createdAt' && key !== 'updatedAt' && (
                    <div key={key} className="flex items-center space-x-3">
                      <span className="text-sm font-medium text-gray-500 capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}:
                      </span>
                      <span className="text-sm text-gray-900">{value || "-"}</span>
                    </div>
                  )
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}