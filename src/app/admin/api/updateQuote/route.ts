import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/util";
import QuoteRequest from "@/app/(portfolio)/model/Quote";
export async function PUT(req:NextRequest){
    await connectDB();
    try{
        const { id, adminNotes, priority, status } = await req.json();
       
        // 
        const updatedQuote = await QuoteRequest.findByIdAndUpdate(
            id,
            { status,
              adminNotes,
                priority,
             },
            { new: true }
        );

        if (!updatedQuote) {
            return new Response("Quote not found", { status: 404 });
        }

        return NextResponse
            .json({
                message: "Quote updated successfully",
                quote: updatedQuote,
            }, { status: 200 });
    }
    catch (error) {
        console.error("Error updating quote:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}