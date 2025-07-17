import Project from "@/app/admin/model/project"; // Adjust path to your Project model
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import ServiceForm from "../CommonForm";
import connectDB from "@/lib/util";
import WhyChooseUs from "../../components/Landing/OurFeatures";
import WhyChooseUsSection from "../../components/Landing/Whychooseuss";

interface Project {
  _id: string;
  name: string;
  category: string;
  shortDescription: string;
  bulletPoints: string[];
  technologies: string[];
  clientName: string;
  image1: string;
  image2?: string; // Second image field
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
    <div className="text-gray-800 bg-gray-50 min-h-screen">
      {/* Project Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Project Description - Takes up 3 columns */}
          <section className="md:col-span-2 space-y-6">
            
            {/* Project Header */}
            <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-200">
              <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                {project.name}
              </h1>
              <p className="text-lg text-orange-600 font-medium mb-4">
                {project.category}
              </p>
              <p className="text-gray-600 leading-relaxed">
                {project.shortDescription}
              </p>
            </div>

            {/* Images Section - Phone Mockups */}
            <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-200">
              <h2 className="text-xl font-semibold mb-6 text-gray-700">Mobile Preview</h2>
              <div className="flex flex-row items-center justify-center gap-8">
                
                {/* Large Phone Mockup */}
                <div className="relative group">
                  <div className="relative bg-gray-900 rounded-2xl p-1.5 shadow-xl">
                  <div className="relative bg-black rounded-xl p-0.5">
                    <div
                    className="relative bg-white rounded-lg overflow-hidden"
                    style={{ width: "160px", height: "320px" }}
                    >
                    {/* Phone Screen Content */}
                    <div className="absolute inset-0">
                      <Image
                      src={project.image1}
                      alt={`${project.name} - Main mobile view`}
                      width={160}
                      height={320}
                      className="w-full h-full object-center transition-transform duration-300"
                      />
                    </div>
                    {/* Phone UI Elements */}
                    <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-black/10 to-transparent"></div>
                    <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-10 h-0.5 bg-black/20 rounded-full"></div>
                    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-20 h-0.5 bg-black/20 rounded-full"></div>
                    </div>
                  </div>
                  {/* Phone Frame Details */}
                  <div className="absolute top-6 left-0.5 w-0.5 h-6 bg-gray-700 rounded-r"></div>
                  <div className="absolute top-12 left-0.5 w-0.5 h-8 bg-gray-700 rounded-r"></div>
                  <div className="absolute top-20 left-0.5 w-0.5 h-8 bg-gray-700 rounded-r"></div>
                  <div className="absolute top-14 right-0.5 w-0.5 h-10 bg-gray-700 rounded-l"></div>
                  </div>
                </div>

                {/* Small Phone Mockup */}
                {project.image2 && (
                  <div className="relative group">
                  <div className="relative bg-gray-900 rounded-xl p-1 mt-20 shadow-lg">
                    <div className="relative bg-black rounded-lg p-0.5">
                    <div
                      className="relative bg-white rounded-md overflow-hidden"
                      style={{ width: "120px", height: "240px" }}
                    >
                      {/* Phone Screen Content */}
                      <div className="absolute inset-0">
                      <Image
                        src={project.image2}
                        alt={`${project.name} - Secondary mobile view`}
                        width={120}
                        height={240}
                        className="w-full h-full object-center transition-transform duration-300"
                      />
                      </div>
                      {/* Phone UI Elements */}
                      <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-black/10 to-transparent"></div>
                      <div className="absolute top-0.5 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-black/20 rounded-full"></div>
                      <div className="absolute bottom-0.5 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-black/20 rounded-full"></div>
                    </div>
                    </div>
                    {/* Phone Frame Details */}
                    <div className="absolute top-4 left-0.5 w-0.5 h-4 bg-gray-700 rounded-r"></div>
                    <div className="absolute top-8 left-0.5 w-0.5 h-6 bg-gray-700 rounded-r"></div>
                    <div className="absolute top-14 left-0.5 w-0.5 h-6 bg-gray-700 rounded-r"></div>
                    <div className="absolute top-10 right-0.5 w-0.5 h-8 bg-gray-700 rounded-l"></div>
                  </div>
                  </div>
                )}
              </div>
              
              
            </div>

            {/* Key Features */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">Key Features</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.bulletPoints.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <span className="text-orange-600 text-xl font-bold mt-0.5">✓</span>
                    <span className="text-gray-600 leading-relaxed">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technologies Used */}
            {project.technologies && project.technologies.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Technologies Used</h2>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Project Summary */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">Project Summary</h2>
              <div 
                className="text-gray-600 leading-relaxed prose prose-gray max-w-none"
                dangerouslySetInnerHTML={{
                  __html: project.description.replace(/\n/g, "<br/>"),
                }}
              />
            </div>

            

            {/* Project Link */}
            {project.link && (
              <Link
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors duration-200"
                >
                  View Live Project
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </Link>
            )}
          </section>

          {/* Contact Form Sidebar - Takes up 1 column */}
          <aside className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-orange-600 text-white p-4">
                  <h3 className="text-lg font-semibold">Interested in Similar Work?</h3>
                  <p className="text-orange-100 text-sm mt-1">Let's discuss your project requirements</p>
                </div>
                <div className="p-4">
                  <ServiceForm />
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Why Choose Us Section */}
      <section className="bg-white border-t border-gray-200">
        <WhyChooseUs />
      </section>
    </div>
  );
}