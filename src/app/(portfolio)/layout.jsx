import "../globals.css"
import Navbar from "@/app/(portfolio)/components/Layout/Navbar"
import Footer from "./components/Layout/Footer"
import SocialSidebar from "./components/Layout/SideBar" 
import toast, { Toaster } from 'react-hot-toast';
import connectDB from "@/lib/util";
import Contact from "../admin/model/contact";
import Service from "../admin/model/service";
import { Roboto } from 'next/font/google'
import Head from "next/head";
 
const roboto = Roboto({
  weight: '400',
  subsets: ["latin-ext"],
})
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
    <html lang="en" className={roboto.className}>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap"
          rel="stylesheet"
        />
      </Head>
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