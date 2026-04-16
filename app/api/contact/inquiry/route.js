import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    const { name, email, phone, message, productId, productName, productPrice } = await req.json();

    if (!name || !email || !phone || !productName) {
      return NextResponse.json({ success: false, message: 'Please fill in all required fields' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: process.env.SMTP_EMAIL, pass: process.env.SMTP_APP_PASSWORD },
    });

    await Promise.all([
      transporter.sendMail({
        from: `"${name}" <${email}>`,
        to: process.env.ADMIN_EMAIL,
        subject: `New Vehicle Inquiry - ${productName}`,
        html: `<h2>New Vehicle Inquiry</h2><p><strong>Vehicle:</strong> ${productName}</p><p><strong>Price:</strong> $${productPrice?.toLocaleString()}</p><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Phone:</strong> ${phone}</p>${message ? `<p><strong>Message:</strong> ${message}</p>` : ''}`,
      }),
      transporter.sendMail({
        from: `"${process.env.APP_NAME}" <${process.env.ADMIN_EMAIL}>`,
        to: email,
        subject: `Thank you for your inquiry about ${productName}`,
        html: `<h2>Thank you for your interest!</h2><p>Dear ${name},</p><p>Thank you for your inquiry about <strong>${productName}</strong>.</p><p>Our team will contact you shortly at ${phone}.</p><p>Best regards,<br>${process.env.APP_NAME} Team</p>`,
      }),
    ]);

    return NextResponse.json({ success: true, message: 'Inquiry sent successfully!' });
  } catch (error) {
    console.error('Error sending inquiry:', error);
    return NextResponse.json({ success: false, message: 'Failed to send inquiry.' }, { status: 500 });
  }
}
