import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { redis } from '@/lib/redis';
import Product from '@/lib/models/product.model';

export async function GET() {
  try {
    let featuredProducts;
    const redisClient = redis();

    if (redisClient) {
      try {
        const cached = await redisClient.get('featured_products');
        if (cached) return NextResponse.json(JSON.parse(cached));
      } catch (e) {
        console.log('Redis error:', e.message);
      }
    }

    await connectDB();
    featuredProducts = await Product.find({ isFeatured: true }).lean();
    if (!featuredProducts || featuredProducts.length === 0) {
      featuredProducts = await Product.find({}).limit(3).lean();
    }

    if (redisClient) {
      try {
        await redisClient.set('featured_products', JSON.stringify(featuredProducts));
      } catch (e) {}
    }

    return NextResponse.json(featuredProducts);
  } catch (error) {
    return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
  }
}
