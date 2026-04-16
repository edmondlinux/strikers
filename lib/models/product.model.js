import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, min: 0, required: true },
    images: [{ type: String }],
    image: { type: String },
    category: { type: String, required: true },
    year: { type: Number },
    mileage: { type: String },
    engine: { type: String },
    seats: { type: Number },
    transmission: { type: String },
    fuelType: { type: String },
    condition: { type: String },
    brand: { type: String },
    model: { type: String },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;
