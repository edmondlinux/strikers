import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';
import ContactSettings from '@/lib/models/contactSettings.model';

export async function GET() {
  try {
    await connectDB();
    let settings = await ContactSettings.findOne();
    if (!settings) {
      settings = new ContactSettings({});
      await settings.save();
    }
    return NextResponse.json({ success: true, data: settings });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}

export async function PUT(req) {
  const { user, error } = await requireAdmin();
  if (error) return error;

  try {
    const { phoneNumber, whatsappLink, telegramUsername, email } = await req.json();
    await connectDB();

    let settings = await ContactSettings.findOne();
    if (!settings) {
      settings = new ContactSettings({ phoneNumber, whatsappLink, telegramUsername, email });
    } else {
      if (phoneNumber !== undefined) settings.phoneNumber = phoneNumber;
      if (whatsappLink !== undefined) settings.whatsappLink = whatsappLink;
      if (telegramUsername !== undefined) settings.telegramUsername = telegramUsername;
      if (email !== undefined) settings.email = email;
    }

    await settings.save();
    return NextResponse.json({ success: true, message: 'Settings updated', data: settings });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
