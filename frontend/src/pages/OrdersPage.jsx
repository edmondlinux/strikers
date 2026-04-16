
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Package, Calendar, DollarSign, Truck } from "lucide-react";
import axios from "../lib/axios";
import toast from "react-hot-toast";

const OrdersPage = () => {
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchOrders();
	}, []);

	const fetchOrders = async () => {
		try {
			const response = await axios.get("/payments/orders");
			setOrders(response.data);
		} catch (error) {
			toast.error("Failed to fetch orders");
		} finally {
			setLoading(false);
		}
	};

	const getStatusColor = (status) => {
		switch (status) {
			case "delivered": return "text-green-500";
			case "shipped": return "text-blue-500";
			case "processing": return "text-yellow-500";
			default: return "text-gray-500";
		}
	};

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center pt-20">
				<div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500"></div>
			</div>
		);
	}

	return (
		<div className='min-h-screen pt-20'>
			<div className='max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
				<motion.div
					className='bg-gray-800 shadow-xl rounded-lg p-6 mb-8 border border-gray-700'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
				>
					<h1 className='text-4xl font-bold mb-2 text-red-400'>My Orders</h1>
					<p className='text-gray-300'>Track and manage your orders</p>
				</motion.div>

				{orders.length === 0 ? (
					<motion.div
						className='text-center py-12'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.2 }}
					>
						<Package size={64} className='mx-auto text-gray-400 mb-4' />
						<h2 className='text-2xl font-semibold text-gray-300 mb-2'>No orders yet</h2>
						<p className='text-gray-400'>Start shopping to see your orders here!</p>
					</motion.div>
				) : (
					<div className='space-y-6'>
						{orders.map((order, index) => (
							<motion.div
								key={order._id}
								className='bg-gray-800 rounded-lg border border-gray-700 overflow-hidden'
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: index * 0.1 }}
							>
								<div className='p-6'>
									<div className='flex justify-between items-start mb-4'>
										<div>
											<h3 className='text-lg font-semibold text-white'>
												Order #{order._id?.slice(-8) || 'N/A'}
											</h3>
											<div className='flex items-center space-x-4 mt-2 text-sm text-gray-400'>
												<div className='flex items-center space-x-1'>
													<Calendar size={16} />
													<span>{new Date(order.createdAt).toLocaleDateString()}</span>
												</div>
												<div className='flex items-center space-x-1'>
													<DollarSign size={16} />
													<span>${(order.totalAmount / 100).toFixed(2)}</span>
												</div>
											</div>
										</div>
										<div className='flex items-center space-x-1'>
											<Truck size={16} className={getStatusColor(order.status)} />
											<span className={`capitalize font-medium ${getStatusColor(order.status)}`}>
												{order.status || 'processing'}
											</span>
										</div>
									</div>

									<div className='border-t border-gray-700 pt-4'>
										<h4 className='text-sm font-medium text-gray-300 mb-3'>Items:</h4>
										<div className='space-y-3'>
											{order.products?.map((item) => (
												<div key={item.product?._id} className='flex items-center space-x-4'>
													<img 
														src={item.product?.image} 
														alt={item.product?.name}
														className='w-12 h-12 object-cover rounded'
													/>
													<div className='flex-1'>
														<p className='text-white font-medium'>{item.product?.name}</p>
														<p className='text-gray-400 text-sm'>
															Quantity: {item.quantity} × ${item.price?.toFixed(2)}
														</p>
													</div>
													<p className='text-red-400 font-semibold'>
														${(item.quantity * item.price).toFixed(2)}
													</p>
												</div>
											))}
										</div>
									</div>
								</div>
							</motion.div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default OrdersPage;
