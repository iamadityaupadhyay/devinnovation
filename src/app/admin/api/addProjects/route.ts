import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/util";
import Project from "../../model/project";
export async function POST(request: NextRequest){
await connectDB();


try {
   const {project}= await request.json()
   
    const {
          name,
          category,
          shortDescription,
          bulletPoints,
          technologies,
          description,
          clientName,
          image1,
          image2,
          previewImage,
          link
     } = project;
    
     // Create a new project instance
     const newProject = new Project({
          name,
          category,
          shortDescription,
          bulletPoints,
          technologies,
          description,
          clientName,
          image1,
          image2,
          previewImage,
          link
     });
    
     // Save the project to the database
     await newProject.save();
   return NextResponse.json(
    {   success:true,
        message:"successfull"
    }
   ) 
} 

catch (error) {
    console.error("Error adding project:", error);
    return NextResponse.json (
        {
            message: "Error connecting to the database",
            error: error instanceof Error ? error.message : "Unknown error"
        },
        
        
    )
}
}


