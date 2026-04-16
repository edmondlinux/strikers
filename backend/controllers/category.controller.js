
import Category from "../models/category.model.js";
import { redis } from "../lib/redis.js";
import cloudinary from "../lib/cloudinary.js";

export const getAllCategories = async (req, res) => {
	try {
		const categories = await Category.find({});
		res.json({ categories });
	} catch (error) {
		console.log("Error in getAllCategories controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const createCategory = async (req, res) => {
	try {
		const { name, description, image, href } = req.body;

		let cloudinaryResponse = null;

		if (image) {
			cloudinaryResponse = await cloudinary.uploader.upload(image, { folder: "categories" });
		}

		const category = await Category.create({
			name,
			description,
			href,
			image: cloudinaryResponse?.secure_url ? cloudinaryResponse.secure_url : image,
		});

		res.status(201).json(category);
	} catch (error) {
		console.log("Error in createCategory controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const deleteCategory = async (req, res) => {
	try {
		const category = await Category.findById(req.params.id);

		if (!category) {
			return res.status(404).json({ message: "Category not found" });
		}

		if (category.image) {
			const publicId = category.image.split("/").pop().split(".")[0];
			try {
				await cloudinary.uploader.destroy(`categories/${publicId}`);
				console.log("deleted image from cloudinary");
			} catch (error) {
				console.log("error deleting image from cloudinary", error);
			}
		}

		await Category.findByIdAndDelete(req.params.id);

		res.json({ message: "Category deleted successfully" });
	} catch (error) {
		console.log("Error in deleteCategory controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const updateCategory = async (req, res) => {
	try {
		const { name, description, image, href } = req.body;
		const category = await Category.findById(req.params.id);

		if (!category) {
			return res.status(404).json({ message: "Category not found" });
		}

		let cloudinaryResponse = null;
		if (image && image !== category.image) {
			// Delete old image if it exists
			if (category.image) {
				const publicId = category.image.split("/").pop().split(".")[0];
				try {
					await cloudinary.uploader.destroy(`categories/${publicId}`);
				} catch (error) {
					console.log("error deleting old image from cloudinary", error);
				}
			}
			
			cloudinaryResponse = await cloudinary.uploader.upload(image, { folder: "categories" });
		}

		const updatedCategory = await Category.findByIdAndUpdate(
			req.params.id,
			{
				name: name || category.name,
				description: description || category.description,
				href: href || category.href,
				image: cloudinaryResponse?.secure_url || image || category.image,
			},
			{ new: true }
		);

		res.json(updatedCategory);
	} catch (error) {
		console.log("Error in updateCategory controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};
