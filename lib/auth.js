import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { connectDB } from './db';
import User from './models/user.model';

export async function getAuthUser() {
  try {
    const cookieStore = cookies();
    const userId = cookieStore.get('userId')?.value;
    if (!userId) return null;

    await connectDB();
    const user = await User.findById(userId).select('-password');
    return user;
  } catch {
    return null;
  }
}

export async function requireAuth() {
  const user = await getAuthUser();
  if (!user) {
    return {
      user: null,
      error: NextResponse.json({ message: 'Unauthorized - No session found' }, { status: 401 }),
    };
  }
  return { user, error: null };
}

export async function requireAdmin() {
  const { user, error } = await requireAuth();
  if (error) return { user: null, error };
  if (user.role !== 'admin') {
    return {
      user: null,
      error: NextResponse.json({ message: 'Access denied - Admin only' }, { status: 403 }),
    };
  }
  return { user, error: null };
}
