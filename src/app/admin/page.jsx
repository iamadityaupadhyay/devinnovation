import connectDB from "@/lib/util";
import Contact from "./model/contact";
import Team from "./model/team";
import Service from "./model/service";
import Project from "./model/project";
import QuoteRequest from "./model/Quote";
import Client from "./model/client";
import ContactRequest from "../(portfolio)/model/Contact";
import Link from "next/link";

export default async function AdminDashboard() {
  await connectDB();
  let data, loading, error;
  try {
    loading = true;
    const contact = await Contact.find();
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

  const getIconForSection = (title) => {
    const icons = {
      clients: "👥",
      queries: "💬",
      services: "⚡",
      projects: "🚀",
      quotes: "💰",
      team: "🏆",
      contact: "📞"
    };
    return icons[title.toLowerCase()] || "📊";
  };

  const getGradientForSection = (title) => {
    const gradients = {
      clients: "from-blue-100 to-purple-100",
      queries: "from-green-100 to-teal-100",
      services: "from-orange-100 to-red-100",
      projects: "from-purple-100 to-pink-100",
      quotes: "from-yellow-100 to-orange-100",
      team: "from-indigo-100 to-blue-100",
      contact: "from-pink-100 to-rose-100"
    };
    return gradients[title.toLowerCase()] || "from-gray-100 to-gray-100";
  };

  const DataCard = ({ title, items, fields }) => (
    <div className="group relative overflow-hidden">
      {/* Header Section */}
      <div className={`bg-gradient-to-r ${getGradientForSection(title)} opacity-75 p-2 border-b-2 border-gray-200`}>
        <div className="flex justify-between items-center">
          <div className="flex items-center justify-center gap-4">
            <div className="text-2xl text-gray-900">
              {getIconForSection(title)}
            </div>
            <h2 className="text-lg font-bold text-gray-900">
              {title}
            </h2>
            <div className="text-gray-900/90 mt-1 ">
              <div className="text-sm font-medium">Total : {items.length}</div>
              
            </div>
          </div>
          <div className="flex items-center space-x-4">
            
            <div className="text-gray-900 text-right text-xs">
              <div className="font-medium">Last Updated</div>
              <div>{items.length > 0 && items[0]?.updatedAt ? new Date(items[0].updatedAt).toLocaleDateString() : new Date().toLocaleDateString()}</div>
            </div>
            <Link 
              href={`/admin/${title.toLowerCase()}`} 
              className="px-4 py-2 bg-white/20 text-gray-900 border border-white/30 text-sm font-semibold transition-all duration-300 hover:bg-white hover:text-gray-800"
            >
              View All
            </Link>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-white border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                {fields.map((field, index) => (
                  <th key={field} className="py-3 px-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wide">
                    {field.replace(/([A-Z])/g, " $1").trim()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {items.slice(0, 2).map((item, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
                  {fields.map((field, fieldIndex) => (
                    <td key={field} className="py-3 px-4 text-sm text-gray-800">
                      <div className="flex items-center space-x-2">
                        {fieldIndex === 0 && (
                          <div className={`w-2 h-2 bg-gradient-to-r ${getGradientForSection(title)}`}></div>
                        )}
                        <span className="font-medium">
                          {item[field] || "-"}
                        </span>
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        {items.length > 3 && (
          <div className="p-4 bg-gray-50 border-t border-gray-200">
            <div className="text-center text-sm text-gray-900">
              <span className="font-medium">+{items.length - 3} more items</span>
              <span className="mx-2">•</span>
              <span>Click "View All" to see complete list</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-300 border-t-blue-100 mx-auto"></div>
          <p className="mt-4 text-gray-100">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-center">
          <div className="text-4xl text-red-100 mb-4">⚠️</div>
          <div className="text-xl font-bold text-red-100 mb-2">Error</div>
          <div className="text-gray-100">{error}</div>
        </div>
      </div>
    );
  }

  const fieldMap = {
    clients: ["name", "status"],
    contacts: ["name", "email"],
    services: ["name", "category"],
    projects: ["name", "clientName", "link"],
    quotes: ["fullName", "status"],
    team: ["name", "email", "position"],
    contact: ["email", "phoneNumber", "address", "whatsapp", "linkedin", "facebook", "instagram"],
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="py-8 px-2">
        {/* Dashboard header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-100">Manage your business operations efficiently</p>
          <div className="mt-4 w-full h-px bg-gray-300"></div>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          <DataCard title="Clients" items={data.clients} fields={fieldMap.clients} />
          <DataCard title="Queries" items={data.contacts} fields={fieldMap.contacts} />
          <DataCard title="Services" items={data.services} fields={fieldMap.services} />
          <DataCard title="Projects" items={data.projects} fields={fieldMap.projects} />
          <DataCard title="Quotes" items={data.quotes} fields={fieldMap.quotes} />
          <DataCard title="Team" items={data.team} fields={fieldMap.team} />
        </div>

        {/* Contact section - full width */}
        <div className="w-full">
          <DataCard title="Contact" items={data.contact} fields={fieldMap.contact} />
        </div>
      </main>
    </div>
  );
}