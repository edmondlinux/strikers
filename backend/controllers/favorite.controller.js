
import User from "../models/user.model.js";

export const addToFavorites = async (req, res) => {
	try {
		const { productId } = req.body;
		const user = await User.findById(req.user._id);

		const existingItem = user.favorites.find((id) => id.toString() === productId);
		if (existingItem) {
			return res.status(400).json({ message: "Product already in favorites" });
		}

		user.favorites.push(productId);
		await user.save();
		res.json(user.favorites);
	} catch (error) {
		console.log("Error in addToFavorites controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const removeFromFavorites = async (req, res) => {
	try {
		const { productId } = req.params;
		const user = await User.findById(req.user._id);
		
		user.favorites = user.favorites.filter((id) => id.toString() !== productId);
		await user.save();
		res.json(user.favorites);
	} catch (error) {
		console.log("Error in removeFromFavorites controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const getFavorites = async (req, res) => {
	try {
		const user = await User.findById(req.user._id).populate("favorites");
		res.json(user.favorites);
	} catch (error) {
		console.log("Error in getFavorites controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};
