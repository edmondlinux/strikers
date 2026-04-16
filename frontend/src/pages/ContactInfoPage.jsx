import { motion } from "framer-motion";
import { Phone, MessageCircle, Mail, MapPin, Clock, Car } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useContactSettingsStore } from "../stores/useContactSettingsStore";

const ContactInfoPage = () => {
	const { contactSettings, fetchContactSettings } = useContactSettingsStore();

	useEffect(() => {
		fetchContactSettings();
	}, []);

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
						Contact <span className="text-red-500">Information</span>
					</h1>
					<p className="text-xl text-gray-300 max-w-2xl mx-auto">
						Hit up  STRIKERS NO TITLE CARS we got what you need to roll out clean.
					</p>
				</motion.div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
					{/* Business Information */}
					<motion.div
						className="bg-gray-800 rounded-lg p-8 border border-gray-700"
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5, delay: 0.1 }}
					>
						<div className="flex items-center mb-6">
							<Car className="text-red-500 mr-3" size={32} />
							<h2 className="text-2xl font-bold text-white">Business Info</h2>
						</div>

						<div className="space-y-6">
							{/* Phone */}
							{/* Phone */}
							<div className="flex items-start space-x-4">
								<Phone className="text-red-500 mt-1" size={24} />
								<div>
									<a href={`tel:${contactSettings?.phoneNumber || "+1 (305) 589-6665"}`}>
										<h3 className="text-lg font-semibold text-white mb-1">
											Phone
										</h3>
										<p className="text-gray-300 text-lg">{contactSettings?.phoneNumber || "+1 (305) 589-6665"}</p>
									</a>
									<p className="text-gray-400 text-sm">Call or Text</p>
								</div>
							</div>

							{/* Telegram */}
							<div className="flex items-start space-x-4">
								<MessageCircle className="text-red-500 mt-1" size={24} />
								<div>
									<Link to={`https://t.me/${(contactSettings?.telegramUsername || "@yourz_bans").replace('@', '')}`}>
										<h3 className="text-lg font-semibold text-white mb-1">
										Telegram
									</h3>
									<p className="text-gray-300 text-lg">{contactSettings?.telegramUsername || "@yourz_bans"}</p>
									</Link>
									<p className="text-gray-400 text-sm">Sales & Support</p>
								</div>
							</div>

							{/* Email */}
							<div className="flex items-start space-x-4">
								<Mail className="text-red-500 mt-1" size={24} />
								<div>
									<Link to={`mailto:${contactSettings?.email || "maun5940@gmail.com"}`}> <h3 className="text-lg font-semibold text-white mb-1">
										Email
									</h3>
									<p className="text-gray-300 text-lg">
										{contactSettings?.email || "maun5940@gmail.com"}
									</p> </Link>
									<p className="text-gray-400 text-sm">
										We respond within 24 hours
									</p>
								</div>
							</div>

							{/* Address */}
							<div className="flex items-start space-x-4">
								<MapPin className="text-red-500 mt-1" size={24} />
								<div>
									<h3 className="text-lg font-semibold text-white mb-1">
										Location
									</h3>
									<p className="text-gray-300 text-lg"></p>
									<p className="text-gray-300 text-lg">Florida</p>
									<p className="text-gray-400 text-sm">United States</p>
								</div>
							</div>

							{/* Hours */}
							<div className="flex items-start space-x-4">

							<div>
									
									<div className="text-gray-300 space-y-1">
										
									</div>
									
								</div>
							</div>
						</div>
					</motion.div>

					{/* Quick Contact Form */}
					<motion.div
						className="bg-gray-800 rounded-lg p-8 border border-gray-700"
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
					>
						<h2 className="text-2xl font-bold text-white mb-6">
							Quick Contact
						</h2>

						<div className="space-y-6">
							<div className="bg-gray-700 p-6 rounded-lg">
								<h3 className="text-lg font-semibold text-white mb-3">
									Need Something ASAP ?
								</h3>
								<p className="text-gray-300 mb-4">
									Hit us up on Telegram and we'll get back to you ASAP
								</p>
								<a
									href={`https://t.me/${(contactSettings?.telegramUsername || "@yourz_bans").replace('@', '')}`}
									className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md transition-colors"
								>
									<Phone className="mr-2" size={18} />
									Chat on Telegram
								</a>
							</div>

							<div className="bg-gray-700 p-6 rounded-lg">
								<h3 className="text-lg font-semibold text-white mb-3">
									Hit us up on email
								</h3>
								<p className="text-gray-300 mb-4">
									Got questions or wanna lock in a viewing? Drop us a line  we’ll get back quick.
	
								</p>
								<a
									href="mailto:maun5940@gmail.com"
									className="inline-flex items-center bg-gray-600 hover:bg-gray-500 text-white px-6 py-3 rounded-md transition-colors"
								>
									<Mail className="mr-2" size={18} />
									Send Email
								</a>
							</div>

							<div className="bg-gradient-to-r from-red-600 to-red-700 p-6 rounded-lg">
								<h3 className="text-lg font-semibold text-white mb-3">
									Special Services
								</h3>
								<ul className="text-gray-100 space-y-2">
									<li>• Registration in System</li>
									<li>• Financing Available</li>
									
								</ul>
							</div>
						</div>
					</motion.div>
				</div>

				{/* Additional Info */}
				<motion.div
					className="mt-12 text-center"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.3 }}
				>
							<div className="bg-gray-800 rounded-lg p-8 border border-gray-700 max-w-4xl mx-auto">
								<h3 className="text-2xl font-bold text-white mb-4">
									Why Roll with <span className="text-red-500">STRIKERS?</span>
								</h3>
								<div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-300">
									<div>
										<h4 className="font-semibold text-red-400 mb-2">
											Real Deal Service
										</h4>
										<p>
											10+ years deep in the game — we know whips like the back of our hand.
										</p>
									</div>
									<div>
										<h4 className="font-semibold text-red-400 mb-2">
											Straight-Up Quality
										</h4>
										<p>
											Every ride gets checked, tested, and blessed — no lemons, no stress.
										</p>
									</div>
									<div>
										<h4 className="font-semibold text-red-400 mb-2">
											You Come First
										</h4>
										<p>
											We treat every customer like fam — real talk, no runaround, just solid service.
										</p>
									</div>
						</div>
					</div>
				</motion.div>
			</div>
		</div>
	);
};

export default ContactInfoPage;
