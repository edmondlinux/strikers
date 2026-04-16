import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';
import Category from '@/lib/models/category.model';
import cloudinary from '@/lib/cloudinary';

export async function DELETE(req, { params }) {
  const { user, error } = await requireAdmin();
  if (error) return error;

  try {
    await connectDB();
    const category = await Category.findById(params.id);
    if (!category) return NextResponse.json({ message: 'Category not found' }, { status: 404 });

    if (category.image) {
      const publicId = category.image.split('/').pop().split('.')[0];
      try {
        await cloudinary.uploader.destroy(`categories/${publicId}`);
      } catch (e) {}
    }

    await Category.findByIdAndDelete(params.id);
    return NextResponse.json({ message: 'Category deleted successfully' });
  } catch (error) {
    return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  const { user, error } = await requireAdmin();
  if (error) return error;

  try {
    const { name, description, image, href } = await req.json();
    await connectDB();
    const category = await Category.findById(params.id);
    if (!category) return NextResponse.json({ message: 'Category not found' }, { status: 404 });

    let cloudinaryResponse = null;
    if (image && image !== category.image) {
      if (category.image) {
        const publicId = category.image.split('/').pop().split('.')[0];
        try {
          await cloudinary.uploader.destroy(`categories/${publicId}`);
        } catch (e) {}
      }
      cloudinaryResponse = await cloudinary.uploader.upload(image, { folder: 'categories' });
    }

    const updated = await Category.findByIdAndUpdate(
      params.id,
      {
        name: name || category.name,
        description: description || category.description,
        href: href || category.href,
        image: cloudinaryResponse?.secure_url || image || category.image,
      },
      { new: true }
    );

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
  }
}
