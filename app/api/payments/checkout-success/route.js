import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { requireAuth } from '@/lib/auth';
import { stripe } from '@/lib/stripe';
import Coupon from '@/lib/models/coupon.model';
import Order from '@/lib/models/order.model';

export async function POST(req) {
  const { user, error } = await requireAuth();
  if (error) return error;

  try {
    const { sessionId } = await req.json();
    await connectDB();

    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status === 'paid') {
      if (session.metadata.couponCode) {
        await Coupon.findOneAndUpdate(
          { code: session.metadata.couponCode, userId: session.metadata.userId },
          { isActive: false }
        );
      }

      const products = JSON.parse(session.metadata.products);
      const newOrder = new Order({
        user: session.metadata.userId,
        products: products.map((p) => ({ product: p.id, quantity: p.quantity, price: p.price })),
        totalAmount: session.amount_total / 100,
        stripeSessionId: sessionId,
      });

      await newOrder.save();
      return NextResponse.json({ success: true, message: 'Payment successful', orderId: newOrder._id });
    }

    return NextResponse.json({ success: false, message: 'Payment not completed' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ message: 'Error processing checkout', error: error.message }, { status: 500 });
  }
}
