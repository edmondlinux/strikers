import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { requireAuth } from '@/lib/auth';
import Product from '@/lib/models/product.model';

export async function GET() {
  const { user, error } = await requireAuth();
  if (error) return error;

  try {
    await connectDB();
    const products = await Product.find({ _id: { $in: user.cartItems } });
    const cartItems = products.map((product) => {
      const item = user.cartItems.find((ci) => ci.product?.toString() === product._id.toString());
      return { ...product.toJSON(), quantity: item?.quantity || 1 };
    });
    return NextResponse.json(cartItems);
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

    const existingItem = dbUser.cartItems.find((item) => item.product?.toString() === productId);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      dbUser.cartItems.push({ product: productId, quantity: 1 });
    }

    await dbUser.save();
    return NextResponse.json(dbUser.cartItems);
  } catch (error) {
    return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  const { user, error } = await requireAuth();
  if (error) return error;

  try {
    const { productId } = await req.json();
    await connectDB();

    const { default: User } = await import('@/lib/models/user.model');
    const dbUser = await User.findById(user._id);

    if (!productId) {
      dbUser.cartItems = [];
    } else {
      dbUser.cartItems = dbUser.cartItems.filter((item) => item.product?.toString() !== productId);
    }

    await dbUser.save();
    return NextResponse.json(dbUser.cartItems);
  } catch (error) {
    return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
  }
}
