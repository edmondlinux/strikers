import { Heart, Eye, Calendar, Gauge } from "lucide-react";
import { useState } from "react";
import { useUserStore } from "../stores/useUserStore";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ProductListItem = ({ product }) => {
	const { user } = useUserStore();
	const [isLiked, setIsLiked] = useState(false);
    const navigate = useNavigate();

	const handleContactDealer = () => {
		if (!user) {
			toast.error("Please login to contact dealer", { id: "login" });
			return;
		}
		toast.success("Dealer contact information sent to your email!");
	};

	const handleToggleLike = () => {
		setIsLiked(!isLiked);
		toast.success(isLiked ? "Removed from favorites" : "Added to favorites");
	};

    const handleViewDetails = () => {
        navigate(`/products/${product.id}`);
    };

	return (
		<div className="bg-gray-800 rounded-lg border border-gray-700 hover:border-red-500 transition-all duration-300 overflow-hidden">
			<div className="flex flex-col md:flex-row">
				{/* Image */}
				<div className="relative md:w-80 h-48 md:h-40 flex-shrink-0">
					<img 
						src={product.image} 
						alt={product.name}
						className="w-full h-full object-cover"
					/>
					<div className="absolute inset-0 bg-black bg-opacity-20" />

					{/* Status badge */}
					<div className="absolute top-3 left-3">
						<span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
							Available
						</span>
					</div>

					{/* Action buttons */}
					<div className="absolute top-3 right-3 flex space-x-2">
						<button
							onClick={handleToggleLike}
							className={`p-2 rounded-full transition-all duration-300 ${
								isLiked ? 'bg-red-500 text-white' : 'bg-white/20 text-white hover:bg-red-500'
							}`}
						>
							<Heart size={16} fill={isLiked ? 'white' : 'none'} />
						</button>
						<button className="p-2 rounded-full bg-white/20 text-white hover:bg-gray-700 transition-all duration-300">
							<Eye size={16} />
						</button>
					</div>
				</div>

				{/* Content */}
				<div className="flex-1 p-6">
					<div className="flex flex-col md:flex-row md:items-center justify-between h-full">
						<div className="flex-1">
							<h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>

							{/* Car details */}
							<div className="flex items-center space-x-4 mb-3 text-gray-300">
								<div className="flex items-center space-x-1">
									<Calendar size={16} />
									<span className="text-sm">2020</span>
								</div>
								<div className="flex items-center space-x-1">
									<Gauge size={16} />
									<span className="text-sm">45K miles</span>
								</div>
								<div className="bg-gray-700 px-2 py-1 rounded text-sm">
									{product.category}
								</div>
							</div>

							<p className="text-gray-400 text-sm mb-4 line-clamp-2">
								{product.description || "Well-maintained vehicle with clean history. Perfect for daily commuting."}
							</p>
						</div>

						{/* Price and Actions */}
						<div className="md:text-right md:ml-6">
							<div className="mb-4">
								<p className="text-3xl font-bold text-red-500">${product.price.toLocaleString()}</p>
								<p className="text-sm text-gray-400">or $299/month</p>
							</div>

							<div className="flex md:flex-col space-x-2 md:space-x-0 md:space-y-2">
								<button
									className="flex-1 md:flex-none px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 
									focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300 text-sm font-medium"
									onClick={handleContactDealer}
								>
									Contact Dealer
								</button>
								<button 
                                    className="flex-1 md:flex-none px-6 py-2 border border-red-600 text-red-600 hover:bg-red-600 
								    hover:text-white rounded-lg transition-all duration-300 text-sm font-medium"
                                    onClick={handleViewDetails}
                                >
									View Details
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductListItem;