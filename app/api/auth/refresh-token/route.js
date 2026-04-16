import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';

export async function POST() {
  const { user, error } = await requireAuth();
  if (error) return error;
  return NextResponse.json({ message: 'Token refreshed', user });
}
