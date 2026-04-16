import { motion } from "framer-motion";
import {
	CreditCard,
	Shield,
	CheckCircle,
	Bitcoin,
	DollarSign,
} from "lucide-react";

const PaymentMethodsPage = () => {
	const cryptoMethods = [
		{
			name: "Bitcoin (BTC)",
			icon: "₿",
			description: "The most popular cryptocurrency, accepted worldwide",
			fees: "Low network fees",
			processing: "10-60 minutes",
			color: "from-orange-500 to-yellow-500",
		},
		{
			name: "Ethereum (ETH)",
			icon: "Ξ",
			description: "Fast and secure blockchain payments",
			fees: "Variable gas fees",
			processing: "2-15 minutes",
			color: "from-blue-500 to-purple-500",
		},
		{
			name: "Litecoin (LTC)",
			icon: "Ł",
			description: "Faster transactions with lower fees",
			fees: "Very low fees",
			processing: "2-15 minutes",
			color: "from-gray-400 to-gray-600",
		},
		{
			name: "TRC 20",
			icon: "$",
			description: "Stable cryptocurrency pegged to USD",
			fees: "Minimal fees",
			processing: "2-10 minutes",
			color: "from-blue-600 to-blue-700",
		},
		{
			name: "USDT ",
			icon: "$",
			description: "Stable cryptocurrency pegged to USD",
			fees: "Minimal fees",
			processing: "2-10 minutes",
			color: "from-blue-600 to-blue-700",
		},
	];

	return (
		<div className="min-h-screen bg-gray-900 pt-20">
			<div className="container mx-auto px-4 py-12">
				{/* Header */}
				<motion.div
					className="text-center mb-12"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				>
					<h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
						Payment <span className="text-red-500">Methods</span>
					</h1>
					<p className="text-xl text-gray-300 max-w-2xl mx-auto">
						We accept multiple payment methods to make your car purchase
						convenient and secure.
					</p>
				</motion.div>

				{/* Crypto Payments Section */}
				<motion.div
					className="mb-16"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.1 }}
				>
					<div className="text-center mb-8">
						<h2 className="text-3xl font-bold text-white mb-4">
							<Bitcoin
								className="inline-block mr-3 text-orange-500"
								size={36}
							/>
							Cryptocurrency Payments
						</h2>
						<p className="text-gray-300 max-w-3xl mx-auto">
							We're proud to accept various cryptocurrencies for your vehicle
							purchase. Enjoy fast, secure, and borderless transactions with
							competitive rates.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
						{cryptoMethods.map((crypto, index) => (
							<motion.div
								key={crypto.name}
								className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-red-500 transition-colors"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
							>
								<div
									className={`w-16 h-16 rounded-full bg-gradient-to-r ${crypto.color} flex items-center justify-center text-white text-2xl font-bold mb-4 mx-auto`}
								>
									{crypto.icon}
								</div>
								<h3 className="text-xl font-bold text-white text-center mb-2">
									{crypto.name}
								</h3>
								<p className="text-gray-300 text-center text-sm mb-4">
									{crypto.description}
								</p>
								<div className="space-y-2 text-sm">
									<div className="flex justify-between">
										<span className="text-gray-400">Fees:</span>
										<span className="text-green-400">{crypto.fees}</span>
									</div>
									<div className="flex justify-between">
										<span className="text-gray-400">Processing:</span>
										<span className="text-blue-400">{crypto.processing}</span>
									</div>
								</div>
							</motion.div>
						))}
					</div>

					{/* Crypto Benefits */}
					<div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
						<h3 className="text-2xl font-bold text-white mb-6 text-center">
							Why Choose Crypto Payments?
						</h3>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							<div className="text-center">
								<Shield className="text-green-500 mx-auto mb-3" size={32} />
								<h4 className="text-lg font-semibold text-white mb-2">
									Secure & Private
								</h4>
								<p className="text-gray-300">
									Blockchain technology ensures your transactions are secure and
									private
								</p>
							</div>
							<div className="text-center">
								<CheckCircle className="text-blue-500 mx-auto mb-3" size={32} />
								<h4 className="text-lg font-semibold text-white mb-2">
									Fast Processing
								</h4>
								<p className="text-gray-300">
									Complete your purchase faster than traditional banking methods
								</p>
							</div>
							<div className="text-center">
								<DollarSign
									className="text-yellow-500 mx-auto mb-3"
									size={32}
								/>
								<h4 className="text-lg font-semibold text-white mb-2">
									Lower Fees
								</h4>
								<p className="text-gray-300">
									Avoid high credit card processing fees and bank charges
								</p>
							</div>
						</div>
					</div>
				</motion.div>

				{/* Traditional Payment Methods */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.3 }}
				>
					<div className="text-center mb-8">
						<h2 className="text-3xl font-bold text-white mb-4">
							<CreditCard
								className="inline-block mr-3 text-blue-500"
								size={36}
							/>
							Traditional Payment Methods
						</h2>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						{/* PayPal */}
						<div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
							<div className="flex items-center mb-6">
								<div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center text-white text-xl font-bold mr-4">
									PP
								</div>
								<div>
									<h3 className="text-2xl font-bold text-white">PayPal</h3>
									<p className="text-gray-300">
										Trusted worldwide payment platform
									</p>
								</div>
							</div>
							<div className="space-y-4">
								<div className="flex items-center"></div>
								<div className="flex items-center">
									<CheckCircle className="text-green-500 mr-3" size={20} />
									<span className="text-gray-300">
										Instant payment confirmation
									</span>
								</div>
								<div className="flex items-center">
									<CheckCircle className="text-green-500 mr-3" size={20} />
									<span className="text-gray-300">
										Link bank account or card
									</span>
								</div>
								<div className="flex items-center">
									<CheckCircle className="text-green-500 mr-3" size={20} />
									<span className="text-gray-300">PayPal Credit available</span>
								</div>
							</div>
						</div>

						{/* Bank Transfer */}
						<div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
							<div className="flex items-center mb-6">
								<div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-600 to-green-700 flex items-center justify-center text-white text-xl font-bold mr-4">
									BT
								</div>
								<div>
									<h3 className="text-2xl font-bold text-white">
										Bank Transfer
									</h3>
									<p className="text-gray-300">Direct wire transfer or ACH</p>
								</div>
							</div>
							<div className="space-y-4">
								<div className="flex items-center">
									<CheckCircle className="text-green-500 mr-3" size={20} />
									<span className="text-gray-300">
										Secure bank-to-bank transfer
									</span>
								</div>
								<div className="flex items-center">
									<CheckCircle className="text-green-500 mr-3" size={20} />
									<span className="text-gray-300">
										No payment processing fees
									</span>
								</div>
								<div className="flex items-center">
									<CheckCircle className="text-green-500 mr-3" size={20} />
									<span className="text-gray-300">
										1-3 business days processing
									</span>
								</div>
								<div className="flex items-center">
									<CheckCircle className="text-green-500 mr-3" size={20} />
									<span className="text-gray-300">Large purchase friendly</span>
								</div>
							</div>
						</div>
					</div>
				</motion.div>

				{/* Payment Process */}
				<motion.div
					className="mt-16 bg-gradient-to-r from-red-600 to-red-700 rounded-lg p-8"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.4 }}
				>
					<h3 className="text-2xl font-bold text-white mb-6 text-center">
						How Payment Works
					</h3>
					<div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-white">
						<div className="text-center">
							<div className="w-12 h-12 rounded-full bg-white bg-opacity-20 flex items-center justify-center text-xl font-bold mx-auto mb-3">
								1
							</div>
							<h4 className="font-semibold mb-2">Choose Vehicle</h4>
							<p className="text-red-100">
								Select your preferred car from our inventory
							</p>
						</div>
						<div className="text-center">
							<div className="w-12 h-12 rounded-full bg-white bg-opacity-20 flex items-center justify-center text-xl font-bold mx-auto mb-3">
								2
							</div>
							<h4 className="font-semibold mb-2">Select Payment</h4>
							<p className="text-red-100">
								Choose your preferred payment method
							</p>
						</div>
						<div className="text-center">
							<div className="w-12 h-12 rounded-full bg-white bg-opacity-20 flex items-center justify-center text-xl font-bold mx-auto mb-3">
								3
							</div>
							<h4 className="font-semibold mb-2">Complete Transaction</h4>
							<p className="text-red-100">
								Secure payment processing and confirmation
							</p>
						</div>
						<div className="text-center">
							<div className="w-12 h-12 rounded-full bg-white bg-opacity-20 flex items-center justify-center text-xl font-bold mx-auto mb-3">
								4
							</div>
							<h4 className="font-semibold mb-2">Get Your Car</h4>
							<p className="text-red-100">
								Schedule pickup or delivery of your vehicle
							</p>
						</div>
					</div>
				</motion.div>

				{/* Contact for Payment Questions */}
				<motion.div
					className="mt-12 text-center"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.5 }}
				>
					<div className="bg-gray-800 rounded-lg p-8 border border-gray-700 max-w-2xl mx-auto">
						<h3 className="text-2xl font-bold text-white mb-4">
							Payment Questions?
						</h3>
						<p className="text-gray-300 mb-6">
							Our payment specialists are here to help you choose the best
							payment method for your purchase.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<a
								href="https://t.me/yourz_bans"
								className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md transition-colors"
							>
								Telegram
							</a>
							<a
								href="mailto:maun5940@gmail.com"
								className="inline-flex items-center bg-gray-600 hover:bg-gray-500 text-white px-6 py-3 rounded-md transition-colors"
							>
								Email Payment Team
							</a>
						</div>
					</div>
				</motion.div>
			</div>
		</div>
	);
};

export default PaymentMethodsPage;
