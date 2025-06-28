import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/util";
import QuoteRequest from "@/app/(portfolio)/model/Quote";
export async function GET(req: NextRequest){
    try {
        await connectDB();
        const quoteRequests = await QuoteRequest.find().sort({ createdAt: -1 });
        return NextResponse.json (
            quoteRequests
        )
    } catch (error) {
        console.error("Error fetching quote requests:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}