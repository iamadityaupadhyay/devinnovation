import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/util";
import Contact from "../../model/contact";

export async function PUT(request: NextRequest) {
  await connectDB();

  try {
    const { field, value } = await request.json();

    // Validate input
    if (!field || value === undefined) {
      return NextResponse.json(
        { message: "Field and value are required" },
        { status: 400 }
      );
    }

    const contactData = await Contact.findOne({});

    if (!contactData) {
      // Create new contact if none exists
      const newContact = new Contact({ [field]: value });
      await newContact.save();
      return NextResponse.json(
        {
          message: "Contact created successfully",
          contact: newContact,
        },
        { status: 201 }
      );
    }

    // Update existing contact
    const updateObj = { $set: { [field]: value } };
    await Contact.updateOne({}, updateObj);

    // Fetch the updated document to return
    const updatedContact = await Contact.findOne({});
    return NextResponse.json(
      {
        message: "Contact information updated successfully",
        contact: updatedContact,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing contact:", error);
    return NextResponse.json(
      {
        message: "Error processing contact",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  await connectDB();

  try {
    const {contact} = await request.json();
    
    // Validate that contactData is an object
    if (!contact || typeof contact !== "object") {
      return NextResponse.json(
        { message: "Valid contact data is required" },
        { status: 400 }
      );
    }

    const existingContact = await Contact.findOne({});
    if (existingContact) {
      return NextResponse.json(
        { message: "Contact already exists, use PUT to update" },
        { status: 400 }
      );
    }

    const newContact = new Contact(contact);
    await newContact.save();

    return NextResponse.json(
      {
        message: "Contact created successfully",
        success:true
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating contact:", error);
    return NextResponse.json(
      {
        message: "Error creating contact",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  await connectDB();

  try {
    const contactData = await Contact.findOne({});
    if (!contactData) {
      return NextResponse.json(
        { message: "No contact data found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        success: true,
        contact: contactData,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching contact:", error);
    return NextResponse.json(
      {
        message: "Error fetching contact",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}