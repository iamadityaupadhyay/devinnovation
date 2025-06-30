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
    
    return NextResponse.json(
      clients
    );
    
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching clients', error: error.message }, { status: 500 });
  }
}

