import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/util";
import Project from "../../model/project";
export async function GET(request: NextRequest) {
    await connectDB();

    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        return NextResponse.json(
            {
                projects,
                message: "Projects fetched successfully",
                success: true,
            }
        )
    } catch (error) {
        console.error("Error fetching projects:", error);
        return NextResponse.json(
            {
                
                message: "Projects not fetched successfully",
                success: false,
            }
        )
    }
}