import TestimonialCarousel from "./TestinomialPage"
import connectDB from "@/lib/util"
import Client from "@/app/admin/model/client"
import WhyChooseUs from "../components/Landing/OurFeatures";

async function page() {
  await connectDB();
  const clients = await Client.find({}).sort({ createdAt: -1 }).lean();
  const testimonials: {
    name: string;
    feedback: string;
    projectName: string;
    company: string;
    image: string;
  }[] = [];
  if (clients && clients.length > 0) {
    clients.forEach(client => {
      testimonials.push({
        name: client.name,
        feedback: client.feedback,
        projectName: client.projectName,
        company: client.company,
        image: client.image
      });
    });
  }
  if (!clients || clients.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 font-custom">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">No Testimonials Found</h2>
          <p className="text-gray-600 mt-2">We currently have no testimonials to display.</p>
        </div>
      </div>
    );
  }
  return (
    <div>
        <TestimonialCarousel testimonials={testimonials}/>
        <WhyChooseUs/>
       
    </div>
  )
}

export default page