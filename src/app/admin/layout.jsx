import "../globals.css";
import toast, { Toaster } from "react-hot-toast";
import AdminNavbar from "./components/Navbar";
import AdminSidebar from "./components/AdminSideBar";
import { SessionProvider } from "next-auth/react";
export const metadata = {
  title: "Admin Panel",
  description: "Manage portfolio content",
};

export default function AdminLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-gray-100">
        <Toaster />
        <SessionProvider/>
        <AdminNavbar />
        <main className=" px-2 overflow-y-auto">
            {children}
          </main>
        <div className="flex flex-1 overflow-hidden">
          {/* Fixed Sidebar */}
          
          {/* Main Content Area */}
          
        </div>
        <script
          src="https://widget.cloudinary.com/v2.0/global/all.js"
          type="text/javascript"
        />
      </body>
    </html>
  );
}