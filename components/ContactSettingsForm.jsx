'use client';

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Phone, MessageCircle, Mail, Send } from "lucide-react";
import { useContactSettingsStore } from "@/stores/useContactSettingsStore";

const ContactSettingsForm = () => {
	const { contactSettings, loading, fetchContactSettings, updateContactSettings } = useContactSettingsStore();

	const [formData, setFormData] = useState({
		phoneNumber: "",
		whatsappLink: "",
		telegramUsername: "",
		email: ""
	});

	useEffect(() => {
		fetchContactSettings();
	}, []);

	useEffect(() => {
		if (contactSettings) {
			setFormData({
				phoneNumber: contactSettings.phoneNumber || "",
				whatsappLink: contactSettings.whatsappLink || "",
				telegramUsername: contactSettings.telegramUsername || "",
				email: contactSettings.email || ""
			});
		}
	}, [contactSettings]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		await updateContactSettings(formData);
	};

	return (
		<motion.div
			className="bg-gray-800 shadow-lg rounded-lg p-6 border border-gray-700"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8 }}
		>
			<h2 className="text-2xl font-bold text-white mb-6">Contact Settings</h2>

			<form onSubmit={handleSubmit} className="space-y-6">
				<div>
					<label className="block text-sm font-medium text-gray-300 mb-2">
						Phone Number
					</label>
					<div className="relative">
						<Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
						<input
							type="text"
							name="phoneNumber"
							value={formData.phoneNumber}
							onChange={handleChange}
							className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
							placeholder="+1 (305) 589-6665"
						/>
					</div>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-300 mb-2">
						WhatsApp Link
					</label>
					<div className="relative">
						<MessageCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
						<input
							type="url"
							name="whatsappLink"
							value={formData.whatsappLink}
							onChange={handleChange}
							className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
							placeholder="https://wa.me/+1305-589-6665?text=Hello!"
						/>
					</div>
					<p className="text-xs text-gray-400 mt-1">
						Format: https://wa.me/[phone]?text=[message]
					</p>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-300 mb-2">
						Telegram Username
					</label>
					<div className="relative">
						<Send className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
						<input
							type="text"
							name="telegramUsername"
							value={formData.telegramUsername}
							onChange={handleChange}
							className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
							placeholder="@yourz_bans"
						/>
					</div>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-300 mb-2">
						Email Address
					</label>
					<div className="relative">
						<Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
						<input
							type="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
							placeholder="maun5940@gmail.com"
						/>
					</div>
				</div>

				<button
					type="submit"
					disabled={loading}
					className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-md transition-colors disabled:opacity-50"
				>
					{loading ? "Updating..." : "Update Contact Settings"}
				</button>
			</form>
		</motion.div>
	);
};

export default ContactSettingsForm;
