import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, Phone, User, MessageSquare, Car , MessageCircle} from "lucide-react";
import { Link } from "react-router-dom"
import toast from "react-hot-toast";
import axios from "../lib/axios";
import { useProductStore } from "../stores/useProductStore";
import LoadingSpinner from "../components/LoadingSpinner";
import { useContactSettingsStore } from "../stores/useContactSettingsStore";

const ContactPage = () => {
        const { productId } = useParams();
        const navigate = useNavigate();
        const { products, fetchAllProducts } = useProductStore();
        const [product, setProduct] = useState(null);
        const [loading, setLoading] = useState(false);
        const [formData, setFormData] = useState({
                name: "",
                email: "",
                phone: "",
                message: "",
        });
        const { contactSettings, fetchContactSettings } = useContactSettingsStore();

        useEffect(() => {
                fetchContactSettings();
        }, []);

        useEffect(() => {
                const loadProduct = async () => {
                        if (productId) {
                                // Try to find product in existing products first
                                const existingProduct = products.find((p) => p._id === productId);
                                if (existingProduct) {
                                        setProduct(existingProduct);
                                } else {
                                        // If not found, fetch all products
                                        await fetchAllProducts();
                                        const foundProduct = products.find((p) => p._id === productId);
                                        setProduct(foundProduct);
                                }
                        }
                };
                loadProduct();
        }, [productId, products, fetchAllProducts]);

        const handleSubmit = async (e) => {
                e.preventDefault();
                setLoading(true);

                const requestData = {
                        ...formData,
                        productId: product._id,
                        productName: product.name,
                        productPrice: product.price,
                };

                console.log("=== CONTACT PAGE DEBUG ===");
                console.log("Request URL:", axios.defaults.baseURL + "/contact/inquiry");
                console.log("Request Data:", requestData);
                console.log("Axios base URL:", axios.defaults.baseURL);

                try {
                        const response = await axios.post("/contact/inquiry", requestData);

                        if (response.data.success) {
                                toast.success("Your inquiry has been sent successfully!");
                                setFormData({ name: "", email: "", phone: "", message: "" });
                                // Navigate back or to a success page
                                setTimeout(() => {
                                        navigate(-1); // Go back to previous page
                                }, 2000);
                        }
                } catch (error) {
                        console.error("=== CONTACT PAGE ERROR ===");
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
                        [e.target.name]: e.target.value,
                });
        };

        if (!product) {
                return <LoadingSpinner />;
        }

        return (
                <div className="min-h-screen bg-gray-900 py-8 md:py-16">
                        <div className="mx-auto max-w-4xl px-4">
                                {/* Header */}
                                <motion.div
                                        className="mb-8"
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5 }}
                                >
                                        <button
                                                onClick={() => navigate(-1)}
                                                className="inline-flex items-center gap-2 text-red-400 hover:text-red-300 mb-4 transition-colors"
                                        >
                                                <ArrowLeft size={20} />
                                                Back
                                        </button>
                                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                                                Contact Dealer
                                        </h1>
                                        <p className="text-gray-400">
                                                Get in touch with us about this vehicle. We'll respond shortly!
                                        </p>
                                </motion.div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                        {/* Vehicle Information */}
                                        <motion.div
                                                className="bg-gray-800 rounded-lg p-6 border border-gray-700"
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.5, delay: 0.1 }}
                                        >
                                                <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                                                        <Car className="mr-2 text-red-500" size={24} />
                                                        Vehicle Details
                                                </h2>

                                                <div className="mb-4">
                                                        <img
                                                                src={product.image}
                                                                alt={product.name}
                                                                className="w-full h-48 object-cover rounded-lg"
                                                        />
                                                </div>

                                                <div className="space-y-3">
                                                        <div>
                                                                <p className="text-gray-400 text-sm">Vehicle Name</p>
                                                                <p className="text-white font-semibold text-lg">
                                                                        {product.name}
                                                                </p>
                                                        </div>
                                                        <div>
                                                                <p className="text-gray-400 text-sm">Price</p>
                                                                <p className="text-red-400 font-bold text-2xl">
                                                                        ${product.price.toLocaleString()}
                                                                </p>
                                                        </div>
                                                        <div>
                                                                <p className="text-gray-400 text-sm">Description</p>
                                                                <p className="text-gray-300 text-sm">
                                                                        {product.description ||
                                                                                "Well-maintained vehicle with clean history."}
                                                                </p>
                                                        </div>
                                                </div>

                                                {/* Contact Information */}
                                                <div className="mt-6 pt-6 border-t border-gray-700">
                                                        <h3 className="text-lg font-semibold text-white mb-4">
                                                                Our Contact Info
                                                        </h3>
                                                        <div className="space-y-3">
                                                                <Link to={`https://t.me/${(contactSettings?.telegramUsername || "@yourz_bans").replace('@', '')}`}> 
                                                                        <div className="flex items-center space-x-3">
                                                                                <MessageCircle className="text-red-500" size={18} />
                                                                                <div>
                                                                                        <p className="text-white font-medium">
                                                                                                {contactSettings?.telegramUsername || "@yourz_bans"}
                                                                                        </p>
                                                                                        <p className="text-gray-400 text-sm">Telegram us</p>
                                                                                </div> 
                                                                        </div> 
                                                                </Link>
                                                                <Link to={`mailto:${contactSettings?.email || "hfvn637909@gmail.com"}`}>
                                                                        <div className="flex items-center space-x-3">
                                                                                <Mail className="text-red-500" size={18} />
                                                                                <div>
                                                                                        <p className="text-white font-medium">
                                                                                                {contactSettings?.email || "hfvn637909@gmail.com"}
                                                                                        </p>
                                                                                        <p className="text-gray-400 text-sm">Email Us</p>
                                                                                </div>
                                                                        </div>
                                                                </Link>
                                                        </div>
                                                </div>
                                        </motion.div>

                                        {/* Contact Form */}
                                        <motion.div
                                                className="bg-gray-800 rounded-lg p-6 border border-gray-700"
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.5, delay: 0.2 }}
                                        >
                                                <h2 className="text-xl font-bold text-white mb-6">
                                                        Send Your Inquiry
                                                </h2>

                                                <form onSubmit={handleSubmit} className="space-y-4">
                                                        <div>
                                                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                                                        Full Name *
                                                                </label>
                                                                <div className="relative">
                                                                        <User
                                                                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                                                                size={18}
                                                                        />
                                                                        <input
                                                                                type="text"
                                                                                name="name"
                                                                                value={formData.name}
                                                                                onChange={handleChange}
                                                                                required
                                                                                className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                                                                                placeholder="Your full name"
                                                                        />
                                                                </div>
                                                        </div>

                                                        <div>
                                                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                                                        Email Address *
                                                                </label>
                                                                <div className="relative">
                                                                        <Mail
                                                                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                                                                size={18}
                                                                        />
                                                                        <input
                                                                                type="email"
                                                                                name="email"
                                                                                value={formData.email}
                                                                                onChange={handleChange}
                                                                                required
                                                                                className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                                                                                placeholder="your@email.com"
                                                                        />
                                                                </div>
                                                        </div>

                                                        <div>
                                                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                                                        Phone Number *
                                                                </label>
                                                                <div className="relative">
                                                                        <Phone
                                                                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                                                                size={18}
                                                                        />
                                                                        <input
                                                                                type="tel"
                                                                                name="phone"
                                                                                value={formData.phone}
                                                                                onChange={handleChange}
                                                                                required
                                                                                className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                                                                                placeholder="281 628-1854"
                                                                        />
                                                                </div>
                                                        </div>

                                                        <div>
                                                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                                                        Message
                                                                </label>
                                                                <div className="relative">
                                                                        <MessageSquare
                                                                                className="absolute left-3 top-3 text-gray-400"
                                                                                size={18}
                                                                        />
                                                                        <textarea
                                                                                name="message"
                                                                                value={formData.message}
                                                                                onChange={handleChange}
                                                                                rows="4"
                                                                                className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                                                                                placeholder="Tell us about your interest in this vehicle..."
                                                                        />
                                                                </div>
                                                        </div>

                                                        <div className="flex space-x-3 mt-6">
                                                                <button
                                                                        type="button"
                                                                        onClick={() => navigate(-1)}
                                                                        className="flex-1 py-3 px-4 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors"
                                                                >
                                                                        Cancel
                                                                </button>
                                                                <button
                                                                        type="submit"
                                                                        disabled={loading}
                                                                        className="flex-1 py-3 px-4 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors disabled:opacity-50"
                                                                >
                                                                        {loading ? "Sending..." : "Send Inquiry"}
                                                                </button>
                                                        </div>
                                                </form>
                                        </motion.div>
                                </div>
                        </div>
                </div>
        );
};

export default ContactPage;