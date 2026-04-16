import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { requireAuth } from '@/lib/auth';
import Coupon from '@/lib/models/coupon.model';

export async function GET() {
  const { user, error } = await requireAuth();
  if (error) return error;

  try {
    await connectDB();
    const coupon = await Coupon.findOne({ userId: user._id, isActive: true });
    return NextResponse.json(coupon || null);
  } catch (error) {
    return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
  }
}
