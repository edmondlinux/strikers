import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';
import Order from '@/lib/models/order.model';
import Product from '@/lib/models/product.model';
import User from '@/lib/models/user.model';

export async function GET() {
  const { user, error } = await requireAdmin();
  if (error) return error;

  try {
    await connectDB();

    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();

    const salesData = await Order.aggregate([
      { $group: { _id: null, totalSales: { $sum: 1 }, totalRevenue: { $sum: '$totalAmount' } } },
    ]);

    const { totalSales, totalRevenue } = salesData[0] || { totalSales: 0, totalRevenue: 0 };

    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000);

    const dailySalesData = await Order.aggregate([
      { $match: { createdAt: { $gte: startDate, $lte: endDate } } },
      { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }, sales: { $sum: 1 }, revenue: { $sum: '$totalAmount' } } },
      { $sort: { _id: 1 } },
    ]);

    const dates = [];
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      dates.push(currentDate.toISOString().split('T')[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    const salesDataFormatted = dates.map((date) => {
      const found = dailySalesData.find((d) => d._id === date);
      return { date, sales: found?.sales || 0, revenue: found?.revenue || 0 };
    });

    return NextResponse.json({
      analyticsData: { users: totalUsers, products: totalProducts, totalSales, totalRevenue },
      dailySalesData: salesDataFormatted,
    });
  } catch (error) {
    return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
  }
}
