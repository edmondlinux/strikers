import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { requireAuth } from '@/lib/auth';

export async function DELETE(req, { params }) {
  const { user, error } = await requireAuth();
  if (error) return error;

  try {
    await connectDB();
    const { default: User } = await import('@/lib/models/user.model');
    const dbUser = await User.findById(user._id);
    dbUser.favorites = dbUser.favorites.filter((id) => id.toString() !== params.id);
    await dbUser.save();
    return NextResponse.json(dbUser.favorites);
  } catch (error) {
    return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
  }
}
