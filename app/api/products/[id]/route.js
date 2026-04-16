import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';
import { redis } from '@/lib/redis';
import Product from '@/lib/models/product.model';
import cloudinary from '@/lib/cloudinary';

export async function GET(req, { params }) {
  try {
    await connectDB();
    const product = await Product.findById(params.id);
    if (!product) return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const { user, error } = await requireAdmin();
  if (error) return error;

  try {
    await connectDB();
    const product = await Product.findById(params.id);
    if (!product) return NextResponse.json({ message: 'Product not found' }, { status: 404 });

    if (product.image) {
      const publicId = product.image.split('/').pop().split('.')[0];
      try {
        await cloudinary.uploader.destroy(`products/${publicId}`);
      } catch (e) {}
    }

    await Product.findByIdAndDelete(params.id);
    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error) {
    return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  const { user, error } = await requireAdmin();
  if (error) return error;

  try {
    await connectDB();
    const product = await Product.findById(params.id);
    if (!product) return NextResponse.json({ message: 'Product not found' }, { status: 404 });

    product.isFeatured = !product.isFeatured;
    const updated = await product.save();

    const redisClient = redis();
    if (redisClient) {
      try {
        const featuredProducts = await Product.find({ isFeatured: true }).lean();
        await redisClient.set('featured_products', JSON.stringify(featuredProducts));
      } catch (e) {}
    }

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
  }
}
