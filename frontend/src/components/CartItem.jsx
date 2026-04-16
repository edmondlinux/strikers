
import { Minus, Plus, Trash, Heart } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";
import { motion } from "framer-motion";

const CartItem = ({ item }) => {
	const { removeFromCart, updateQuantity } = useCartStore();

	return (
		<motion.div
			className='bg-gray-750 rounded-xl border border-gray-600 p-6 hover:border-emerald-500/30 transition-all duration-300'
			whileHover={{ scale: 1.01 }}
			layout
		>
			<div className='flex flex-col md:flex-row md:items-center gap-6'>
				{/* Product Image */}
				<div className='flex-shrink-0'>
					<div className='relative group'>
						<img 
							className='w-24 h-24 md:w-32 md:h-32 rounded-lg object-cover border border-gray-600' 
							src={item.image} 
							alt={item.name}
						/>
						<div className='absolute inset-0 bg-black/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity' />
					</div>
				</div>

				{/* Product Details */}
				<div className='flex-1 min-w-0'>
					<h3 className='text-lg font-semibold text-white mb-2 hover:text-emerald-400 transition-colors line-clamp-2'>
						{item.name}
					</h3>
					<p className='text-sm text-gray-400 mb-4 line-clamp-2'>
						{item.description}
					</p>
					
					{/* Price and Actions Row */}
					<div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
						{/* Quantity Controls */}
						<div className='flex items-center gap-3'>
							<span className='text-sm text-gray-400 font-medium'>Qty:</span>
							<div className='flex items-center gap-2 bg-gray-700 rounded-lg p-1'>
								<button
									className='w-8 h-8 flex items-center justify-center rounded-md bg-gray-600 hover:bg-gray-500 text-gray-300 hover:text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
									onClick={() => updateQuantity(item._id, item.quantity - 1)}
									disabled={item.quantity <= 1}
								>
									<Minus size={16} />
								</button>
								<span className='w-12 text-center font-semibold text-white'>
									{item.quantity}
								</span>
								<button
									className='w-8 h-8 flex items-center justify-center rounded-md bg-gray-600 hover:bg-gray-500 text-gray-300 hover:text-white transition-all duration-200'
									onClick={() => updateQuantity(item._id, item.quantity + 1)}
								>
									<Plus size={16} />
								</button>
							</div>
						</div>

						{/* Price */}
						<div className='flex items-center justify-between sm:justify-end gap-4'>
							<div className='text-right'>
								<p className='text-2xl font-bold text-emerald-400'>
									${(item.price * item.quantity).toFixed(2)}
								</p>
								{item.quantity > 1 && (
									<p className='text-sm text-gray-400'>
										${item.price.toFixed(2)} each
									</p>
								)}
							</div>
						</div>
					</div>
				</div>

				{/* Action Buttons */}
				<div className='flex md:flex-col gap-2 justify-end md:justify-start'>
					<button
						className='flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all duration-200'
						onClick={() => removeFromCart(item._id)}
					>
						<Trash size={16} />
						<span className='hidden sm:inline'>Remove</span>
					</button>
				</div>
			</div>
		</motion.div>
	);
};

export default CartItem;
