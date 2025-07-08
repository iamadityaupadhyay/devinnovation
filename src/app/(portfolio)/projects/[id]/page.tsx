
import Project from "@/app/admin/model/project"; // Adjust path to your Project model
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import ServiceForm from "../CommonForm";
import connectDB from "@/lib/util";
import WhyChooseUs from "../../service/Whychooseuss";
import WhyChooseUsSection from "../../components/Landing/Whychooseuss";

interface Project {
  _id: string;
  name: string;
  category: string;
  shortDescription: string;
  bulletPoints: string[];
  technologies: string[];
  clientName: string;
  image: string;
  link?: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}


export default async function ProjectDetails({ params }: any) {
  // Connect to MongoDB
  await connectDB();
  let project: Project | null;
  try {
    project = await Project.findById(params.id).lean() as any as Project;
  } catch (error) {
    console.error("Error fetching project:", error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 font-custom">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">Error Loading Project</h2>
          <p className="text-gray-600 mt-2">An error occurred while fetching the project details.</p>
          <Link href="/projects" className="mt-4 inline-block text-orange-500 hover:text-orange-600">
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  if (!project) {
    notFound();
  }

  return (
    <div className=" text-gray-800">
      {/* Project Content */}
      <main className="grid grid-cols-1 md:grid-cols-3 max-w-full  mx-auto px-8 py-8">
        {/* Project Description */}
        <section className="mb-4  max-w-2xl col-span-2">
          <h1 className="lg:text-2xl text-xl font-bold text-gray-600 mb-5">{project.name} | <span className="text-gray-600"> {project.category}</span></h1>
          
          
          <h2 className="text-xl font-bold mb-2 text-gray-500">About the Project</h2>
          <p className="text-gray-500 mb-4">
            {project.shortDescription}
          </p>
          <section className="mt-4 mb-4">
            <h2 className="text-xl font-semibold mb-4 text-gray-500 ">Key Features</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.bulletPoints.map((feature, index) => (
                <li key={index} className="text-gray-600">
                  <span className="text-orange-800 mr-2">✓</span>{feature}
                </li>
              ))}
            </ul>
          </section>
          <div className="gap-4 my-8">
            <Image
              src={project.image}
              alt={project.name}
              width={400}
              height={300}
              className="h-full w-full rounded-lg"
            />
          </div>
          <h2 className="text-xl font-bold mt-6 mb-2 text-gray-600">Summary</h2>
          <div className="text-gray-500" dangerouslySetInnerHTML={{
              __html: project.description.replace(/\n/g, "<br/>"),
            }}>
            
          </div>
          
          
          
          
          {/* Features */}
          
        </section>

        <ServiceForm />
      </main>

      <WhyChooseUs/>
    </div>
  );
}