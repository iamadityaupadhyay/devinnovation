import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/util";
import Team from "../../model/team";

export async function POST(request: NextRequest) {
  await connectDB();

  try {
    const { member } = await request.json();
    console.log("Received data:", member);

    const {
      name,
      position,
      skills,
      bio,
      image,
      linkedin,
      email,
      department
    } = member;

    // Create a new team member instance
    const newTeamMember = new Team({
      name,
      position,
      skills,
      department,
      bio,
      profileImage:image,
      galleryImages:image,
      linkedin,
      email:email
    });

    // Save the team member to the database
    await newTeamMember.save();
    
   return NextResponse.json({
        message: "Team member added successfully",
        }
        );

  } catch (error) {
    console.error("Error adding team member:", error);
    return NextResponse.json(
      {
        message: "Error connecting to the database",
        error: error instanceof Error ? error.message : "Unknown error"
      }
    );
  }
}


export async function PUT(request:NextRequest) {
  await connectDB();

  try {
    const { editMember } = await request.json();
    console.log("Received data:", editMember);

    const {
      _id,
      name,
      position,
      skills,
      bio,
      image,
      linkedin,
      email,
      department
    } = editMember;
    // convert id into mongodb object id
    
    
var mongoose = require('mongoose');
var objectId =new mongoose.Types.ObjectId(_id);
const team = await Team.findById(_id);
console.log(team);
    // Update the team member in the database
    const updatedMember = await Team.findByIdAndUpdate(
      objectId,
      {
        name,
        position,
        skills,
        department,
        bio,
        profileImage:image,
        galleryImages:image,
        linkedin,
        email:email
      },
      { new: true }
    );

    if (!updatedMember) {
      return NextResponse.json({ message: "Team member not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Team member updated successfully",
      updatedMember
    });

  } catch (error) {
    console.error("Error updating team member:", error);
    return NextResponse.json(
      {
        message: "Error connecting to the database",
        error: error instanceof Error ? error.message : "Unknown error"
      }
    );
  }
  
}