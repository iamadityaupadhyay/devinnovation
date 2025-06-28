import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/util";
import ContactRequest from "@/app/(portfolio)/model/Contact";
export async function GET(req: NextRequest){
    try {
        await connectDB();
        const contactRequests = await ContactRequest.find().sort({ createdAt: -1 });
        return NextResponse.json (
            contactRequests
        )
    } catch (error) {
        console.error("Error fetching quote requests:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}