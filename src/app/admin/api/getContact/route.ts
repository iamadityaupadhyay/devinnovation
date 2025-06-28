import { NextRequest } from "next/server";
import connectDB from "@/lib/util";
import Contact from "../../model/contact";


export async function GET(request: NextRequest) {
    await connectDB();
    console.log("Fetching contact information...");
    try {
        // Fetch the contact information from the database
        const contact = await Contact.findOne({});
        console.log("Fetched contact data:", contact);
        if (!contact) {
        return new Response(JSON.stringify({ message: "No contact information found" }), {
            status: 404,
            headers: { "Content-Type": "application/json" },
        });
        }
    
        return new Response(JSON.stringify(contact), {
        status: 200,
        headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error fetching contact information:", error);
        return new Response(
        JSON.stringify({
            message: "Error connecting to the database",
            error: error instanceof Error ? error.message : "Unknown error",
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
    }