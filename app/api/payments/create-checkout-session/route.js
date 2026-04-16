import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { requireAuth } from '@/lib/auth';
import { stripe } from '@/lib/stripe';
import Coupon from '@/lib/models/coupon.model';

async function createStripeCoupon(discountPercentage) {
  const coupon = await stripe.coupons.create({
    percent_off: discountPercentage,
    duration: 'once',
  });
  return coupon.id;
}

async function createNewCoupon(userId) {
  await Coupon.findOneAndDelete({ userId });
  const newCoupon = new Coupon({
    code: 'GIFT' + Math.random().toString(36).substring(2, 8).toUpperCase(),
    discountPercentage: 10,
    expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    userId,
  });
  await newCoupon.save();
  return newCoupon;
}

export async function POST(req) {
  const { user, error } = await requireAuth();
  if (error) return error;

  try {
    const { products, couponCode } = await req.json();
    if (!Array.isArray(products) || products.length === 0) {
      return NextResponse.json({ error: 'Invalid or empty products array' }, { status: 400 });
    }

    await connectDB();
    let totalAmount = 0;

    const lineItems = products.map((product) => {
      const amount = Math.round(product.price * 100);
      totalAmount += amount * product.quantity;
      return {
        price_data: {
          currency: 'usd',
          product_data: { name: product.name, images: [product.image] },
          unit_amount: amount,
        },
        quantity: product.quantity || 1,
      };
    });

    let coupon = null;
    if (couponCode) {
      coupon = await Coupon.findOne({ code: couponCode, userId: user._id, isActive: true });
      if (coupon) totalAmount -= Math.round((totalAmount * coupon.discountPercentage) / 100);
    }

    const clientUrl = process.env.CLIENT_URL || process.env.NEXTAUTH_URL || '';
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${clientUrl}/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${clientUrl}/purchase-cancel`,
      discounts: coupon ? [{ coupon: await createStripeCoupon(coupon.discountPercentage) }] : [],
      metadata: {
        userId: user._id.toString(),
        couponCode: couponCode || '',
        products: JSON.stringify(products.map((p) => ({ id: p._id, quantity: p.quantity, price: p.price }))),
      },
    });

    if (totalAmount >= 20000) await createNewCoupon(user._id);

    return NextResponse.json({ id: session.id, totalAmount: totalAmount / 100 });
  } catch (error) {
    return NextResponse.json({ message: 'Error processing checkout', error: error.message }, { status: 500 });
  }
}
