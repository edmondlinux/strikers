import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/lib/models/user.model';

export async function POST(req) {
  try {
    const { email, password, name } = await req.json();
    await connectDB();

    const userExists = await User.findOne({ email });
    if (userExists) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    const user = await User.create({ name, email, password });

    const response = NextResponse.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    }, { status: 201 });

    response.cookies.set('userId', user._id.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
