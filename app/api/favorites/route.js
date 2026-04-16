import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { requireAuth } from '@/lib/auth';

export async function GET() {
  const { user, error } = await requireAuth();
  if (error) return error;

  try {
    await connectDB();
    const { default: User } = await import('@/lib/models/user.model');
    const dbUser = await User.findById(user._id).populate('favorites');
    return NextResponse.json(dbUser.favorites);
  } catch (error) {
    return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  const { user, error } = await requireAuth();
  if (error) return error;

  try {
    const { productId } = await req.json();
    await connectDB();

    const { default: User } = await import('@/lib/models/user.model');
    const dbUser = await User.findById(user._id);

    const existing = dbUser.favorites.find((id) => id.toString() === productId);
    if (existing) {
      return NextResponse.json({ message: 'Product already in favorites' }, { status: 400 });
    }

    dbUser.favorites.push(productId);
    await dbUser.save();
    return NextResponse.json(dbUser.favorites);
  } catch (error) {
    return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
  }
}
