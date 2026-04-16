import { useState } from "react";
import { X, Copy, Check, Upload, ArrowLeft, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "../lib/axios";
import toast from "react-hot-toast";

const CRYPTO_WALLETS = [
	{
		id: "usdt_trc20",
		name: "USDT (TRC20)",
		address: "TQdbH954hGM4KQt5CWZqgDNGDYuUTZym9b",
		color: "text-green-400",
		note: "Send on TRC20 network only",
		icon: "$",
		bg: "from-green-500 to-teal-600",
	},
	{
		id: "bitcoin",
		name: "Bitcoin (BTC)",
		address: "147wjRuBmYSSc3zjBfSNB1SLDySmWGXCMD",
		color: "text-orange-400",
		note: "Bitcoin network",
		icon: "₿",
		bg: "from-orange-500 to-yellow-500",
	},
];

const BuyNowModal = ({ product, onClose }) => {
	const navigate = useNavigate();
	const [step, setStep] = useState(1);
	const [formData, setFormData] = useState({ email: "", phone: "", address: "" });
	const [selectedWallet, setSelectedWallet] = useState(null);
	const [screenshot, setScreenshot] = useState(null);
	const [screenshotPreview, setScreenshotPreview] = useState(null);
	const [copiedAddress, setCopiedAddress] = useState(null);
	const [loading, setLoading] = useState(false);
	const [submitted, setSubmitted] = useState(false);

	const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

	const handleCopy = (address) => {
		navigator.clipboard.writeText(address);
		setCopiedAddress(address);
		setTimeout(() => setCopiedAddress(null), 2500);
	};

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setScreenshot(file);
			setScreenshotPreview(URL.createObjectURL(file));
		}
	};

	const handleStep1Submit = (e) => {
		e.preventDefault();
		if (!formData.email) { toast.error("Email is required"); return; }
		setStep(2);
	};

	const handleMethodSelect = (walletId) => {
		if (walletId === "other") {
			onClose();
			navigate(`/contact/${product._id}`);
			return;
		}
		const wallet = CRYPTO_WALLETS.find((w) => w.id === walletId);
		setSelectedWallet(wallet);
		setStep(3);
	};

	const handleSubmit = async () => {
		if (!screenshot) { toast.error("Please upload a payment screenshot"); return; }
		setLoading(true);
		try {
			const data = new FormData();
			data.append("email", formData.email);
			data.append("phone", formData.phone);
			data.append("address", formData.address);
			data.append("productId", product._id);
			data.append("productName", product.name);
			data.append("productPrice", product.price);
			data.append("paymentMethod", selectedWallet.name);
			data.append("walletAddress", selectedWallet.address);
			data.append("screenshot", screenshot);

			await axios.post("/contact/purchase", data, {
				headers: { "Content-Type": "multipart/form-data" },
			});

			setSubmitted(true);
			toast.success("Payment submitted! We'll verify and contact you shortly.");
		} catch (error) {
			toast.error(error.response?.data?.message || "Failed to submit payment. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75">
			<AnimatePresence>
				<motion.div
					initial={{ opacity: 0, scale: 0.95, y: 20 }}
					animate={{ opacity: 1, scale: 1, y: 0 }}
					exit={{ opacity: 0, scale: 0.95, y: 20 }}
					transition={{ duration: 0.2 }}
					className="bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 w-full max-w-lg max-h-[90vh] overflow-y-auto"
				>
					{/* Header */}
					<div className="flex items-center justify-between p-6 border-b border-gray-700 sticky top-0 bg-gray-800 z-10">
						<div>
							<h2 className="text-xl font-bold text-white">Buy Now</h2>
							<p className="text-gray-400 text-sm truncate max-w-xs">{product.name}</p>
						</div>
						<button onClick={onClose} className="text-gray-400 hover:text-white transition-colors p-1">
							<X size={24} />
						</button>
					</div>

					{/* Step progress */}
					<div className="flex items-center px-6 py-4">
						{[1, 2, 3].map((s) => (
							<div key={s} className="flex items-center flex-1 last:flex-none">
								<div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${step >= s ? "bg-red-600 text-white" : "bg-gray-700 text-gray-500"}`}>
									{s}
								</div>
								{s < 3 && (
									<div className={`flex-1 h-1 mx-2 rounded transition-colors ${step > s ? "bg-red-600" : "bg-gray-700"}`} />
								)}
							</div>
						))}
						<div className="ml-4 text-xs text-gray-400">
							{step === 1 && "Your Info"}
							{step === 2 && "Payment"}
							{step === 3 && "Confirm"}
						</div>
					</div>

					<div className="p-6 pt-2">
						{/* Step 1: Buyer Info */}
						{step === 1 && (
							<form onSubmit={handleStep1Submit} className="space-y-4">
								<div className="bg-gray-700 rounded-xl p-4 flex items-center gap-4 mb-2">
									{product.image && (
										<img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-lg flex-shrink-0" />
									)}
									<div>
										<p className="text-white font-bold text-sm">{product.name}</p>
										<p className="text-red-400 font-bold text-lg">${product.price?.toLocaleString()}</p>
									</div>
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-300 mb-1">
										Email Address <span className="text-red-400">*</span>
									</label>
									<input
										type="email"
										name="email"
										value={formData.email}
										onChange={handleChange}
										required
										className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
										placeholder="your@email.com"
									/>
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-300 mb-1">
										Phone Number <span className="text-gray-500 font-normal">(optional)</span>
									</label>
									<input
										type="tel"
										name="phone"
										value={formData.phone}
										onChange={handleChange}
										className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
										placeholder="+1 (000) 000-0000"
									/>
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-300 mb-1">
										Address <span className="text-gray-500 font-normal">(optional)</span>
									</label>
									<input
										type="text"
										name="address"
										value={formData.address}
										onChange={handleChange}
										className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
										placeholder="Your address"
									/>
								</div>

								<button
									type="submit"
									className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl transition-colors mt-2"
								>
									Continue <ArrowRight size={18} />
								</button>
							</form>
						)}

						{/* Step 2: Payment Method */}
						{step === 2 && (
							<div className="space-y-4">
								<button
									onClick={() => setStep(1)}
									className="flex items-center gap-1 text-gray-400 hover:text-white text-sm transition-colors mb-1"
								>
									<ArrowLeft size={16} /> Back
								</button>
								<h3 className="text-lg font-semibold text-white">Choose Payment Method</h3>
								<p className="text-gray-400 text-sm">How would you like to pay?</p>

								<div className="space-y-3 mt-2">
									{CRYPTO_WALLETS.map((wallet) => (
										<button
											key={wallet.id}
											onClick={() => handleMethodSelect(wallet.id)}
											className="w-full flex items-center gap-4 p-4 bg-gray-700 hover:bg-gray-600 border border-gray-600 hover:border-red-500 rounded-xl transition-all text-left group"
										>
											<div className={`w-12 h-12 rounded-full bg-gradient-to-r ${wallet.bg} flex items-center justify-center text-white text-xl font-bold flex-shrink-0`}>
												{wallet.icon}
											</div>
											<div>
												<p className="text-white font-semibold group-hover:text-red-400 transition-colors">{wallet.name}</p>
												<p className="text-gray-400 text-sm">{wallet.note}</p>
											</div>
											<ArrowRight size={16} className="text-gray-500 ml-auto" />
										</button>
									))}

									<button
										onClick={() => handleMethodSelect("other")}
										className="w-full flex items-center gap-4 p-4 bg-gray-700 hover:bg-gray-600 border border-gray-600 hover:border-red-500 rounded-xl transition-all text-left group"
									>
										<div className="w-12 h-12 rounded-full bg-gradient-to-r from-gray-500 to-gray-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
											✉
										</div>
										<div>
											<p className="text-white font-semibold group-hover:text-red-400 transition-colors">Other / Inquire</p>
											<p className="text-gray-400 text-sm">Contact us to arrange an alternative payment</p>
										</div>
										<ArrowRight size={16} className="text-gray-500 ml-auto" />
									</button>
								</div>
							</div>
						)}

						{/* Step 3: Crypto Payment + Screenshot */}
						{step === 3 && !submitted && selectedWallet && (
							<div className="space-y-5">
								<button
									onClick={() => setStep(2)}
									className="flex items-center gap-1 text-gray-400 hover:text-white text-sm transition-colors"
								>
									<ArrowLeft size={16} /> Back
								</button>

								<div>
									<h3 className="text-lg font-semibold text-white">Send Payment</h3>
									<p className="text-gray-400 text-sm mt-1">
										Send <span className="text-red-400 font-bold">${product.price?.toLocaleString()}</span> worth of {selectedWallet.name} to the address below, then upload your screenshot.
									</p>
								</div>

								{/* Wallet address box */}
								<div className="bg-gray-900 rounded-xl p-4 border border-gray-600">
									<div className="flex items-center gap-3 mb-3">
										<div className={`w-10 h-10 rounded-full bg-gradient-to-r ${selectedWallet.bg} flex items-center justify-center text-white font-bold text-lg`}>
											{selectedWallet.icon}
										</div>
										<div>
											<p className="text-white font-semibold text-sm">{selectedWallet.name}</p>
											<p className="text-yellow-400 text-xs">{selectedWallet.note}</p>
										</div>
									</div>
									<p className="text-gray-400 text-xs uppercase tracking-wide mb-2 font-medium">Wallet Address</p>
									<div className="flex items-start gap-3 bg-gray-800 rounded-lg p-3">
										<p className="text-white text-xs font-mono break-all flex-1 leading-relaxed">{selectedWallet.address}</p>
										<button
											onClick={() => handleCopy(selectedWallet.address)}
											className="flex-shrink-0 p-1 text-gray-400 hover:text-white transition-colors"
											title="Copy address"
										>
											{copiedAddress === selectedWallet.address
												? <Check size={18} className="text-green-400" />
												: <Copy size={18} />
											}
										</button>
									</div>
									{copiedAddress === selectedWallet.address && (
										<p className="text-green-400 text-xs mt-2 flex items-center gap-1">
											<Check size={12} /> Copied to clipboard!
										</p>
									)}
								</div>

								{/* Screenshot upload */}
								<div>
									<label className="block text-sm font-medium text-gray-300 mb-2">
										Upload Payment Screenshot <span className="text-red-400">*</span>
									</label>
									<label className={`w-full flex flex-col items-center justify-center p-5 border-2 border-dashed rounded-xl cursor-pointer transition-all ${screenshotPreview ? "border-green-500 bg-green-900/20" : "border-gray-600 hover:border-red-500 bg-gray-700/40 hover:bg-gray-700/60"}`}>
										{screenshotPreview ? (
											<img src={screenshotPreview} alt="Screenshot preview" className="max-h-44 object-contain rounded-lg" />
										) : (
											<>
												<Upload size={30} className="text-gray-400 mb-2" />
												<p className="text-gray-400 text-sm text-center">Click to upload your payment screenshot</p>
												<p className="text-gray-500 text-xs mt-1">PNG, JPG up to 10MB</p>
											</>
										)}
										<input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
									</label>
									{screenshotPreview && (
										<button
											onClick={() => { setScreenshot(null); setScreenshotPreview(null); }}
											className="text-gray-400 hover:text-red-400 text-xs mt-2 transition-colors"
										>
											Remove screenshot
										</button>
									)}
								</div>

								<button
									onClick={handleSubmit}
									disabled={loading || !screenshot}
									className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
								>
									{loading ? "Submitting..." : "Submit Payment"}
								</button>
							</div>
						)}

						{/* Success */}
						{submitted && (
							<div className="text-center py-8">
								<div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
									<Check size={40} className="text-green-400" />
								</div>
								<h3 className="text-xl font-bold text-white mb-2">Payment Submitted!</h3>
								<p className="text-gray-400 mb-2 text-sm">
									We've received your screenshot and details. Our team will verify your payment and reach out to you at:
								</p>
								<p className="text-white font-semibold mb-6">{formData.email}</p>
								<button
									onClick={onClose}
									className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors"
								>
									Close
								</button>
							</div>
						)}
					</div>
				</motion.div>
			</AnimatePresence>
		</div>
	);
};

export default BuyNowModal;
