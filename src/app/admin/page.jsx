import connectDB from "@/lib/util";
import Contact from "./model/contact";
import Team from "./model/team";
import Service from "./model/service";
import Project from "./model/project";
import QuoteRequest from "./model/Quote";
import Client from "./model/client";
import ContactRequest from "../(portfolio)/model/Contact";
import Link from "next/link";
// import Contact from "./model/contact";
export default async function AdminDashboard() {
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

  const DataCard = ({ title, items, fields }) => (
    <div className="bg-white rounded-sm shadow-lg p-4 hover:shadow-xl transition-shadow duration-300 ">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-base font-bold text-gray-800">{title}</h2>
        <Link href={`/admin/${title.toLowerCase()}`} className="px-3 py-1.5 text-sm bg-white text-orange rounded-md hover:bg-orange-600 hover:text-white border-2 border-orange-400 transition-colors">
          View Details
        </Link>
      </div>
      <div className="mb-4">
        <p className="text-gray-600">Total items: {items.length}</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-200">
              {fields.map((field) => (
                <th key={field} className="py-2 px-4 text-gray-600 font-semibold capitalize">
                  {field.replace(/([A-Z])/g, " $1").trim()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.slice(0, 2).map((item, index) => (
              <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                {fields.map((field) => (
                  <td key={field} className="py-2 px-4 text-gray-700">
                    {item[field] || "-"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {items.length > 2 && <p className="text-gray-500 mt-2">+{items.length - 2} more items...</p>}
    </div>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-orange-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-600 text-xl">{error}</div>
      </div>
    );
  }

  const fieldMap = {
    clients: ["name", "status"],
    contacts: ["name", "email"],
    services: ["name", "category"],
    projects: ["name", "clientName", "link"],
    quotes: ["fullName", "status"],
    team: ["name", "email",'position' ],
    contact: ["email", "phoneNumber", "address","whatsapp","linkedin", "facebook", "instagram"],
  };

  return (
    <div className="flex flex-col min-h-screen ">
      <main className="flex-1 py-8 px-0">
        <div className="grid grid-cols-1 text-sm  lg:grid-cols-2 mb-8 xl:grid-cols-4 gap-8">
          <DataCard title="Clients" items={data.clients} fields={fieldMap.clients} />
          <DataCard title="Queries" items={data.contacts} fields={fieldMap.contacts} />
          <DataCard title="Services" items={data.services} fields={fieldMap.services} />
          <DataCard title="Projects" items={data.projects} fields={fieldMap.projects} />
          <DataCard title="Quotes" items={data.quotes} fields={fieldMap.quotes} />
          <DataCard title="Team" items={data.team} fields={fieldMap.team} />
         
        </div>
         <DataCard title="Contact" items={data.contact} fields={fieldMap.contact} />
      </main>
    </div>
  );
}