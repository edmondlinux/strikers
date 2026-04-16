
import { create } from "zustand";
import axios from "../lib/axios";
import toast from "react-hot-toast";

export const useContactSettingsStore = create((set, get) => ({
	contactSettings: {
		phoneNumber: "+1 (305) 589-6665",
		whatsappLink: "https://wa.me/+1305-589-6665?text=Hello! I'm interested in your services.",
		telegramUsername: "@yourz_bans",
		email: "hfvn637909@gmail.com"
	},
	loading: false,

	fetchContactSettings: async () => {
		set({ loading: true });
		try {
			const response = await axios.get("/contact-settings");
			set({ contactSettings: response.data.data, loading: false });
		} catch (error) {
			console.error("Error fetching contact settings:", error);
			set({ loading: false });
		}
	},

	updateContactSettings: async (settings) => {
		set({ loading: true });
		try {
			const response = await axios.put("/contact-settings", settings);
			set({ contactSettings: response.data.data, loading: false });
			toast.success("Contact settings updated successfully");
		} catch (error) {
			console.error("Error updating contact settings:", error);
			toast.error("Failed to update contact settings");
			set({ loading: false });
		}
	},
}));
