import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { requireAuth } from '@/lib/auth';
import Coupon from '@/lib/models/coupon.model';

export async function POST(req) {
  const { user, error } = await requireAuth();
  if (error) return error;

  try {
    const { code } = await req.json();
    await connectDB();

    const coupon = await Coupon.findOne({ code, userId: user._id, isActive: true });
    if (!coupon) return NextResponse.json({ message: 'Coupon not found' }, { status: 404 });

    if (coupon.expirationDate < new Date()) {
      coupon.isActive = false;
      await coupon.save();
      return NextResponse.json({ message: 'Coupon expired' }, { status: 404 });
    }

    return NextResponse.json({
      message: 'Coupon is valid',
      code: coupon.code,
      discountPercentage: coupon.discountPercentage,
    });
  } catch (error) {
    return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
  }
}
