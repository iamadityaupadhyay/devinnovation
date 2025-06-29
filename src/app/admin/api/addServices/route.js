import { NextResponse } from 'next/server';
import connectDB from '@/lib/util';
import Service from '../../model/service';

export async function POST(request) {
  try {
    await connectDB();

    const formData = await request.formData();
    const name = formData.get('name');
    const category = formData.get('category');
    const bulletPoints = [];
    for (const [key, value] of formData.entries()) {
      if (key.startsWith('bulletPoints[')) {
        bulletPoints.push(value);
      }
    }
    const image = formData.get('image');
    // Optional fields
    const technologies = formData.get('technologies')?.split(',').map(t => t.trim()) || [];
    const description = formData.get('description') || '';
    const link = formData.get('link') || '';

    // Validate required fields
    if (!name || !category || bulletPoints.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: name, category, or bulletPoints' },
        { status: 400 }
      );
    }

    const newService = new Service({
      name,
      category,
      bulletPoints,
      technologies,
      description,
      image,
      link,
    });

    await newService.save();

    return NextResponse.json(
      { success: true, message: 'Service added successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error adding service:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}