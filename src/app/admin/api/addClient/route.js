import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Client from '../../model/client';
import connectDB from '@/lib/util';
// Connect to MongoDB (ensure this is configured in your Next.js app)


// GET: Fetch all clients
export async function GET() {

  try {
    await connectDB();
    const clients = await Client.find().sort({ createdAt: -1 });
    return NextResponse.json(clients, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching clients', error: error.message }, { status: 500 });
  }
}

// POST: Create a new client
export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const client = new Client(body);
    await client.save();
    return NextResponse.json(
      {
        success: true,
        message: 'Client created successfully',
      }
    );
  } catch (error) {
    return NextResponse.json({ message: 'Error creating client', error: error.message }, { status: 400 });
  }
}

// PUT: Update an existing client
export async function PUT(request) {
  try {
    await connectDB();
    const body = await request.json();
    const { id, ...updateData } = body; // Expect client ID in the body
    if (!id) {
      return NextResponse.json({ message: 'Client ID is required' }, { status: 400 });
    }
    const client = await Client.findByIdAndUpdate(
      id,
      { ...updateData, updatedAt: Date.now() },
      { new: true }
    );
    if (!client) {
      return NextResponse.json({ message: 'Client not found' }, { status: 404 });
    }
    return NextResponse.json(client, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error updating client', error: error.message }, { status: 400 });
  }
}