import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { requireAuth } from '@/lib/auth';

export async function PUT(req, { params }) {
  const { user, error } = await requireAuth();
  if (error) return error;

  try {
    const { quantity } = await req.json();
    await connectDB();

    const { default: User } = await import('@/lib/models/user.model');
    const dbUser = await User.findById(user._id);

    const existingItem = dbUser.cartItems.find((item) => item.product?.toString() === params.id);
    if (!existingItem) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    if (quantity === 0) {
      dbUser.cartItems = dbUser.cartItems.filter((item) => item.product?.toString() !== params.id);
    } else {
      existingItem.quantity = quantity;
    }

    await dbUser.save();
    return NextResponse.json(dbUser.cartItems);
  } catch (error) {
    return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
  }
}
