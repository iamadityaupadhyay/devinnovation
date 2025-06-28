import "../globals.css"
import Navbar from "@/app/(portfolio)/components/Layout/Navbar"
import Footer from "./components/Layout/Footer"
import SocialSidebar from "./components/Layout/SideBar" 
import toast, { Toaster } from 'react-hot-toast';
import connectDB from "@/lib/util";
import Contact from "../admin/model/contact";
import Service from "../admin/model/service";

export const metadata = {
  title: 'DevTeam Portfolio',
  description: 'Our amazing developer team portfolio',
}

export default async function RootLayout({ children }) {
  await connectDB();
  const contact = (await Contact.findOne({})) || {}; // Fallback to empty object
  const services = (await Service.find({})) || []; // Fallback to empty array
  
  let theme = 'dark';
  theme = 'light'; // This can be dynamically set based on user preference or system settings
  
  return (
    <html lang="en">
      <body>
        <Toaster />
        <Navbar contact={contact} services={services} />
        <div className={`min-h-screen ${theme === 'dark' ? 'bg-[url("/bg.png")]' : 'bg-white'}`}>
          {children}
          <script
            src="https://widget.cloudinary.com/v2.0/global/all.js"
            type="text/javascript"
          ></script>
        </div>
        <Footer contact={contact} />
        <SocialSidebar contact={contact} />
      </body>
    </html>
  );
}