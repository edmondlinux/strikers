import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Product from '@/lib/models/product.model';

export async function GET() {
  try {
    await connectDB();
    const products = await Product.aggregate([
      { $sample: { size: 4 } },
      { $project: { _id: 1, name: 1, description: 1, image: 1, price: 1 } },
    ]);
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
  }
}
