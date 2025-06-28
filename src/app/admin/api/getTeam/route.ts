import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/util";
import Team from "../../model/team";
export async function GET(request: NextRequest) {
  await connectDB();

  try {
    const teamMembers = await Team.find({ isActive: true }).sort({ joinDate: -1 });

    // Convert MongoDB documents to plain objects
    const team = teamMembers.map(member => ({
      _id: member._id.toString(),
      name: member.name,
      position: member.position,
      skills: member.skills,
      bio: member.bio,
      profileImage: member.profileImage,
      galleryImages: member.galleryImages,
      linkedin: member.linkedin,
      email: member.email,
      phone: member.phone,
      department: member.department,
      joinDate: member.joinDate.toISOString(),
    }));

    return NextResponse.json(team);
  } catch (error) {
    console.error("Error fetching team members:", error);
    return NextResponse.json(
      {
        message: "Error connecting to the database",
        error: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}