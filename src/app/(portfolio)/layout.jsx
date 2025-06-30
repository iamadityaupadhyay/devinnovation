import "../globals.css";
import Navbar from "@/app/(portfolio)/components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import SocialSidebar from "./components/Layout/SideBar";
import { Toaster } from "react-hot-toast";
import connectDB from "@/lib/util";
import Contact from "../admin/model/contact";
import Service from "../admin/model/service";
import { Roboto } from "next/font/google";
import Head from "next/head";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin-ext"],
});

export const metadata = {
  title: "DevTeam Portfolio",
  description: "Our amazing developer team portfolio",
};

export default async function RootLayout({ children }) {
  await connectDB();

  // Fetch contact and services with error handling
  let contact = {};
  let services = [];
  try {
    const contactDoc = await Contact.findOne({}).lean();
    const servicesDocs = await Service.find({}).lean();

    // Convert contact fields to plain objects
    if (contactDoc) {
      contact = {
        ...contactDoc,
        _id: contactDoc._id?.toString(),
        createdAt: contactDoc.createdAt?.toString(),
        updatedAt: contactDoc.updatedAt?.toString(),
      };
    }

    // Convert services fields to plain objects
    services = servicesDocs.map((item) => ({
      ...item,
      _id: item._id?.toString(),
      createdAt: item.createdAt?.toString(),
      updatedAt: item.updatedAt?.toString(),
    }));
  } catch (error) {
    console.error("Error fetching data:", error);
    // Optionally set fallback values or handle the error in UI
  }

  // Ensure plain objects by deep cloning (optional, for extra safety)
  contact = JSON.parse(JSON.stringify(contact));
  services = JSON.parse(JSON.stringify(services));

  const theme = "light"; // Replace with dynamic logic if needed

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
        <div className={`min-h-screen ${theme === "dark" ? 'bg-[url("/bg.png")]' : "bg-white"}`}>
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