
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const FloatingTelegramButton = () => {
	const [showTooltip, setShowTooltip] = useState(false);
	const [hasInteracted, setHasInteracted] = useState(false);

	const handleMouseEnter = () => {
		setShowTooltip(true);
		if (!hasInteracted) {
			setHasInteracted(true);
		}
	};

	const handleMouseLeave = () => {
		setShowTooltip(false);
	};

	const handleClick = () => {
		// Add a small feedback animation
		setShowTooltip(false);
	};

	return (
		<div className="fixed bottom-6 right-6 z-50">
			{/* Pulse animation for new users */}
			{!hasInteracted && (
				<motion.div
					className="absolute inset-0 bg-blue-500 rounded-full"
					animate={{
						scale: [1, 1.2, 1],
						opacity: [0.7, 0.3, 0.7],
					}}
					transition={{
						duration: 2,
						repeat: Infinity,
						ease: "easeInOut",
					}}
				/>
			)}

			{/* Tooltip */}
			<AnimatePresence>
				{showTooltip && (
					<motion.div
						initial={{ opacity: 0, x: 20, scale: 0.8 }}
						animate={{ opacity: 1, x: 0, scale: 1 }}
						exit={{ opacity: 0, x: 20, scale: 0.8 }}
						transition={{ duration: 0.2 }}
						className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg whitespace-nowrap border border-gray-600"
					>
						<div className="text-sm font-medium">Chat with us on Telegram!</div>
						<div className="text-xs text-gray-300 mt-1">Get instant support</div>
						{/* Arrow pointing to button */}
						<div className="absolute right-0 top-1/2 transform translate-x-1 -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-l-4 border-transparent border-l-gray-800"></div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Main button */}
			<motion.a
				href="https://t.me/yourz_bans"
				target="_blank"
				rel="noopener noreferrer"
				className="relative bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center group"
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.95 }}
				initial={{ opacity: 0, y: 100 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 1 }}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				onClick={handleClick}
			>
				<img
					src="/telegram-logo.png"
					alt="Telegram"
					className="w-8 h-8 transition-transform duration-200 group-hover:scale-110"
				/>
				
				{/* Notification dot for new users */}
				{!hasInteracted && (
					<motion.div
						className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
						animate={{
							scale: [1, 1.2, 1],
						}}
						transition={{
							duration: 1.5,
							repeat: Infinity,
							ease: "easeInOut",
						}}
					/>
				)}
			</motion.a>
		</div>
	);
};

export default FloatingTelegramButton;
