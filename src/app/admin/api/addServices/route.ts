import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/util";
import Service from "../../model/service";
export async function POST(request: NextRequest){
await connectDB();


try {
   const {service}= await request.json()
   console.log("Received data:", service);
   console.log("Received data:", service);
    const {
          name,
          category,
          bulletPoints,
          technologies,
          description,
         
          image,
          link
     } = service;
    
     // Create a new project instance
     const newService = new Service({
          name,
          category,
          
          bulletPoints,
          technologies,
          description,
         
          image,
         
          link
     });
    
     // Save the project to the database
     await newService.save();
   return NextResponse.json(
    {
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