
import { create } from "zustand";
import axios from "../lib/axios";
import toast from "react-hot-toast";

export const useFavoriteStore = create((set, get) => ({
	favorites: [],
	loading: false,

	addToFavorites: async (productId) => {
		const { favorites } = get();
		const optimisticFavorites = [...favorites, productId];
		set({ favorites: optimisticFavorites });

		try {
			await axios.post("/favorites", { productId });
			toast.success("Added to favorites");
		} catch (error) {
			set({ favorites });
			toast.error(error.response?.data?.message || "Error adding to favorites");
		}
	},

	removeFromFavorites: async (productId) => {
		const { favorites } = get();
		const optimisticFavorites = favorites.filter((id) => id !== productId);
		set({ favorites: optimisticFavorites });

		try {
			await axios.delete(`/favorites/${productId}`);
			toast.success("Removed from favorites");
		} catch (error) {
			set({ favorites });
			toast.error(error.response?.data?.message || "Error removing from favorites");
		}
	},

	getFavorites: async () => {
		try {
			const res = await axios.get("/favorites");
			set({ favorites: res.data.map(product => product._id) });
		} catch (error) {
			toast.error(error.response?.data?.message || "Error fetching favorites");
		}
	},

	isFavorite: (productId) => {
		return get().favorites.includes(productId);
	},
}));
