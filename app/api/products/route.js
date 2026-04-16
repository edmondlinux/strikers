import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';
import Product from '@/lib/models/product.model';
import cloudinary from '@/lib/cloudinary';

export async function GET() {
  try {
    await connectDB();
    const products = await Product.find({});
    return NextResponse.json({ products });
  } catch (error) {
    return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  const { user, error } = await requireAdmin();
  if (error) return error;

  try {
    const { name, description, price, images, category, year, mileage, engine, seats, transmission, fuelType, condition, brand, model } = await req.json();
    await connectDB();

    let uploadedImages = [];
    if (images && images.length > 0) {
      for (const image of images) {
        try {
          const result = await cloudinary.uploader.upload(image, { folder: 'products' });
          uploadedImages.push(result.secure_url);
        } catch (e) {
          console.log('Image upload error:', e.message);
        }
      }
    }

    const product = await Product.create({
      name, description, price, images: uploadedImages,
      image: uploadedImages[0] || '',
      category, year, mileage, engine, seats, transmission, fuelType, condition, brand, model,
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
  }
}
