import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, Mail, Phone, User, MessageSquare } from "lucide-react";
import toast from "react-hot-toast";
import axios from "../lib/axios";

const ContactForm = ({ product, isOpen, onClose, onEmailSent, contactSettings }) => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		message: ""
	});
	const [loading, setLoading] = useState(false);

	// Prevent background scrolling and interactions when modal is open
	useEffect(() => {
		if (isOpen) {
			document.body.classList.add('modal-open');
		} else {
			document.body.classList.remove('modal-open');
		}

		// Cleanup function to restore normal behavior when component unmounts
		return () => {
			document.body.classList.remove('modal-open');
		};
	}, [isOpen]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		const requestData = {
			...formData,
			productId: product._id,
			productName: product.name,
			productPrice: product.price
		};

		console.log("=== CONTACT FORM DEBUG ===");
		console.log("Request URL:", axios.defaults.baseURL + "/contact/inquiry");
		console.log("Request Data:", requestData);
		console.log("Axios base URL:", axios.defaults.baseURL);

		try {
			const response = await axios.post("/contact/inquiry", requestData);

			console.log("Response received:", response);
			console.log("Response data:", response.data);

			if (response.data.success) {
				toast.success("Your inquiry has been sent successfully!");
				onEmailSent();
				onClose();
				setFormData({ name: "", email: "", phone: "", message: "" });
			}
		} catch (error) {
			console.error("=== CONTACT FORM ERROR ===");
			console.error("Error object:", error);
			console.error("Error message:", error.message);
			console.error("Error response:", error.response);
			console.error("Error response data:", error.response?.data);
			console.error("Error response status:", error.response?.status);
			console.error("Error config:", error.config);

			toast.error(error.response?.data?.message || "Failed to send inquiry");
		} finally {
			setLoading(false);
		}
	};

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		});
	};

	if (!isOpen) return null;

	return (
		<div 
			className="modal-overlay flex items-center justify-center p-4"
			onClick={(e) => e.stopPropagation()}
		>
			<div 
				className="fixed inset-0" 
				onClick={onClose}
			></div>
			<motion.div
				className="bg-gray-800 rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto relative z-10 shadow-2xl border border-gray-700"
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0.9 }}
				onClick={(e) => e.stopPropagation()}
			>
				<div className="flex justify-between items-center mb-6">
					<h2 className="text-2xl font-bold text-white">Contact Dealer</h2>
					<button
						onClick={onClose}
						className="text-gray-400 hover:text-white transition-colors"
					>
						<X size={24} />
					</button>
				</div>

				<div className="mb-4 p-4 bg-gray-700 rounded-lg">
					<h3 className="text-white font-semibold">{product.name}</h3>
					<p className="text-red-400 font-bold">${product.price.toLocaleString()}</p>
				</div>

				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label className="block text-sm font-medium text-gray-300 mb-2">
							Full Name *
						</label>
						<div className="relative">
							<User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
							<input
								type="text"
								name="name"
								value={formData.name}
								onChange={handleChange}
								required
								className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
								placeholder="Your full name"
							/>
						</div>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-300 mb-2">
							Email Address *
						</label>
						<div className="relative">
							<Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
							<input
								type="email"
								name="email"
								value={formData.email}
								onChange={handleChange}
								required
								className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
								placeholder="your@email.com"
							/>
						</div>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-300 mb-2">
							Phone Number *
						</label>
						<div className="relative">
							<Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
							<input
								type="tel"
								name="phone"
								value={formData.phone}
								onChange={handleChange}
								required
								className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
								placeholder={contactSettings?.phoneNumber || "(281) 628-1854"}
							/>
						</div>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-300 mb-2">
							Message
						</label>
						<div className="relative">
							<MessageSquare className="absolute left-3 top-3 text-gray-400" size={18} />
							<textarea
								name="message"
								value={formData.message}
								onChange={handleChange}
								rows="4"
								className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
								placeholder="Tell us about your interest in this vehicle..."
							/>
						</div>
					</div>

					<div className="flex space-x-3 mt-6">
						<button
							type="button"
							onClick={onClose}
							className="flex-1 py-2 px-4 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors"
						>
							Cancel
						</button>
						<button
							type="submit"
							disabled={loading}
							className="flex-1 py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors disabled:opacity-50"
						>
							{loading ? "Sending..." : "Send Inquiry"}
						</button>
					</div>
				</form>
			</motion.div>
		</div>
	);
};

export default ContactForm;