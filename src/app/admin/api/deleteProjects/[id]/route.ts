import Project from "../../../model/project";
import { NextRequest,NextResponse } from "next/server";
import connectDB from "@/lib/util";
export async function DELETE(request:NextRequest,{params}:any ){
    await connectDB();
    const {id }= params;
    try{
       await Project.findByIdAndDelete(id);
       return NextResponse.json (
        {
            success:true
        }
       )
    }
    catch(error){
        return NextResponse.json(
            {
                success:false
            }
        )
    }
}