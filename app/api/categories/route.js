import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';
import Category from '@/lib/models/category.model';
import cloudinary from '@/lib/cloudinary';

export async function GET() {
  try {
    await connectDB();
    const categories = await Category.find({});
    return NextResponse.json({ categories });
  } catch (error) {
    return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  const { user, error } = await requireAdmin();
  if (error) return error;

  try {
    const { name, description, image, href } = await req.json();
    await connectDB();

    let cloudinaryResponse = null;
    if (image) {
      cloudinaryResponse = await cloudinary.uploader.upload(image, { folder: 'categories' });
    }

    const category = await Category.create({
      name,
      description,
      href,
      image: cloudinaryResponse?.secure_url || image,
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
  }
}
