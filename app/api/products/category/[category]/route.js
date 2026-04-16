import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Product from '@/lib/models/product.model';

export async function GET(req, { params }) {
  try {
    await connectDB();
    const products = await Product.find({ category: params.category });
    return NextResponse.json({ products });
  } catch (error) {
    return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
  }
}
