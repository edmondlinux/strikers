import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			min: 0,
			required: true,
		},
		images: [{
			type: String,
			required: false,
		}],
		image: {
			type: String,
			required: false,
		},
		category: {
			type: String,
			required: true,
		},
		year: {
			type: Number,
			required: false,
		},
		mileage: {
			type: String,
			required: false,
		},
		engine: {
			type: String,
			required: false,
		},
		seats: {
			type: Number,
			required: false,
		},
		transmission: {
			type: String,
			required: false,
		},
		fuelType: {
			type: String,
			required: false,
		},
		condition: {
			type: String,
			required: false,
		},
		brand: {
			type: String,
			required: false,
		},
		model: {
			type: String,
			required: false,
		},
		isFeatured: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
