import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/util";

import ContactRequest from "@/app/(portfolio)/model/Contact";

export async function GET(req: NextRequest) {
    try {
        await connectDB();
        const contactRequests = await ContactRequest.find().sort({ createdAt: -1 });
        return NextResponse.json(contactRequests);
    } catch (error) {
        console.error("Error fetching contact requests:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}
export async function PUT(request: NextRequest) {
    try {
        await connectDB();
        const { id, data } = await request.json();
        
        // Find the contact request by ID and update its status
        const updatedRequest = await ContactRequest.findByIdAndUpdate(
            id,
            { status: data.status }, // Assuming 'status' is the field you want to update
            { new: true }
        );

        if (!updatedRequest) {
            return NextResponse.json({ message: "Contact request not found" }, { status: 404 });
        }

        return NextResponse.json(updatedRequest);
    } catch (error) {
        console.error("Error updating contact request:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}
export async function DELETE(request: NextRequest) {
    try {
        await connectDB();
        const { id } = await request.json();

        // Find the contact request by ID and delete it
        const deletedRequest = await ContactRequest.findByIdAndDelete(id);

        if (!deletedRequest) {
            return NextResponse.json({ message: "Contact request not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Contact request deleted successfully" });
    } catch (error) {
        console.error("Error deleting contact request:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}