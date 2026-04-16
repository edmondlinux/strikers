import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { requireAuth } from '@/lib/auth';
import Order from '@/lib/models/order.model';

export async function GET() {
  const { user, error } = await requireAuth();
  if (error) return error;

  try {
    await connectDB();
    const orders = await Order.find({ user: user._id }).populate('products.product').sort({ createdAt: -1 });
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
  }
}
