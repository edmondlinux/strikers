
import { Link } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
import { motion } from "framer-motion";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import CartItem from "../components/CartItem";
import PeopleAlsoBought from "../components/PeopleAlsoBought";
import OrderSummary from "../components/OrderSummary";
import GiftCouponCard from "../components/GiftCouponCard";

const CartPage = () => {
	const { cart } = useCartStore();

	return (
		<div className='min-h-screen bg-gray-900 py-8 md:py-16'>
			<div className='mx-auto max-w-screen-xl px-4 2xl:px-0'>
				{/* Header Section */}
				<motion.div
					className='mb-8'
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				>
					<Link
						to='/'
						className='inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 mb-4 transition-colors'
					>
						<ArrowLeft size={20} />
						Continue Shopping
					</Link>
					<h1 className='text-3xl md:text-4xl font-bold text-white mb-2'>
						Shopping Cart
					</h1>
					<p className='text-gray-400'>
						{cart.length === 0 
							? "Your cart is currently empty" 
							: `${cart.length} item${cart.length > 1 ? 's' : ''} in your cart`
						}
					</p>
				</motion.div>

				{cart.length === 0 ? (
					<EmptyCartUI />
				) : (
					<div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
						{/* Cart Items Section */}
						<motion.div
							className='lg:col-span-2 space-y-6'
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5, delay: 0.2 }}
						>
							<div className='bg-gray-800 rounded-lg border border-gray-700 p-6'>
								<h2 className='text-xl font-semibold text-white mb-6 border-b border-gray-700 pb-3'>
									Items in Your Cart
								</h2>
								<div className='space-y-4'>
									{cart.map((item, index) => (
										<motion.div
											key={item._id}
											initial={{ opacity: 0, y: 20 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ duration: 0.3, delay: index * 0.1 }}
										>
											<CartItem item={item} />
										</motion.div>
									))}
								</div>
							</div>
							<PeopleAlsoBought />
						</motion.div>

						{/* Order Summary Section */}
						<motion.div
							className='lg:col-span-1 space-y-6'
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5, delay: 0.4 }}
						>
							<div className='sticky top-8 space-y-6'>
								<OrderSummary />
								<GiftCouponCard />
							</div>
						</motion.div>
					</div>
				)}
			</div>
		</div>
	);
};

export default CartPage;

const EmptyCartUI = () => (
	<motion.div
		className='flex flex-col items-center justify-center py-20'
		initial={{ opacity: 0, y: 20 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.5 }}
	>
		<div className='bg-gray-800 rounded-2xl border border-gray-700 p-12 text-center max-w-md mx-auto'>
			<div className='bg-gray-700 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center'>
				<ShoppingCart className='h-12 w-12 text-gray-400' />
			</div>
			<h3 className='text-2xl font-bold text-white mb-3'>Your cart is empty</h3>
			<p className='text-gray-400 mb-8 leading-relaxed'>
				Discover amazing products and start building your perfect collection.
			</p>
			<Link
				className='inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105'
				to='/'
			>
				Start Shopping
				<ArrowLeft className='rotate-180' size={18} />
			</Link>
		</div>
	</motion.div>
);
