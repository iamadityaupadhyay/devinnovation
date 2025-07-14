import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/util";
import QuoteRequest from "@/app/(portfolio)/model/Quote";
export async function GET(req: NextRequest){
    try {
        await connectDB();
        const quoteRequests = await QuoteRequest.find().sort({ createdAt: -1 });
        return NextResponse.json(
            quoteRequests
        )
    } catch (error) {
        console.error("Error fetching quote requests:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}
export async function DELETE(req: NextRequest) {
    const body = await req.json();
    const id = body.id;
    console.log("Deleting quote request with ID:", id);
    if (!id) {
        return new Response("Service ID is required", { status: 400 });
    }
    try {
        await connectDB();
        await QuoteRequest.findByIdAndDelete(id);
        return NextResponse.json({ success: true, message: "Quote request deleted successfully" });
    } catch (error) {
        console.error("Error deleting quote request:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
    
}