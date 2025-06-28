import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/util";
import Service from "../../model/service";
export async function GET(request: NextRequest) {
    await connectDB();

    try {
        const services = await Service.find().sort({ createdAt: -1 });
        return NextResponse.json(
            {
                services,
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