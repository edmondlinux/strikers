import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../lib/axios";

export const useProductStore = create((set) => ({
	products: [],
	loading: false,
	isLoading: false,

	setProducts: (products) => set({ products }),
	createProduct: async (productData) => {
		set({ loading: true });
		try {
			const res = await axios.post("/products", productData);
			set((prevState) => ({
				products: [...prevState.products, res.data],
				loading: false,
			}));
			toast.success("Product created successfully!");
		} catch (error) {
			toast.error(error.response?.data?.message || "Error creating product");
			set({ loading: false });
		}
	},
	fetchAllProducts: async () => {
		set({ loading: true, isLoading: true });
		try {
			const response = await axios.get("/products");
			set({ products: response.data.products, loading: false, isLoading: false });
		} catch (error) {
			set({ products: [], loading: false, isLoading: false });
			console.log("Error fetching products:", error);
			// Only show toast if it's not a network/auth error
			if (error.response?.status !== 401 && error.response?.status !== 500) {
				toast.error(error.response?.data?.error || "Failed to fetch products");
			}
		}
	},
	fetchProductsByCategory: async (category) => {
		set({ loading: true });
		try {
			const response = await axios.get(`/products/category/${category}`);
			set({ products: response.data.products, loading: false });
		} catch (error) {
			set({ error: "Failed to fetch products", loading: false });
			toast.error(error.response.data.error || "Failed to fetch products");
		}
	},

	fetchProductById: async (id) => {
		try {
			const response = await axios.get(`/products/${id}`);
			return response.data;
		} catch (error) {
			console.error("Failed to fetch product by ID:", error);
			return null;
		}
	},
	deleteProduct: async (productId) => {
		set({ loading: true });
		try {
			await axios.delete(`/products/${productId}`);
			set((prevProducts) => ({
				products: prevProducts.products.filter((product) => product._id !== productId),
				loading: false,
			}));
		} catch (error) {
			set({ loading: false });
			toast.error(error.response.data.error || "Failed to delete product");
		}
	},
	
	
}));
