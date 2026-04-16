import { motion } from "framer-motion";
import { ArrowRight, Calendar, Gauge } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const FeaturedCars = () => {
	const navigate = useNavigate();

	// Static featured cars data for display only
	const featuredCars = [
		{
			_id: "featured-car-honda-civic-2020",
			name: "2020 Honda Civic LX",
			description:
				"Reliable and fuel-efficient sedan perfect for daily commuting. Clean title, well-maintained with complete service history. Features include automatic transmission, power windows, air conditioning, and excellent safety ratings.",
			price: 12000,
			image:
				"https://i.gaw.to/vehicles/photos/40/20/402029-2020-honda-civic.jpg?640x400",
			year: 2020,
			mileage: "45,000",
			category: "sedan",
			engine: "1.5L 4-Cylinder",
			seats: "5",
			transmission: "CVT Automatic",
			fuelType: "Gasoline",
			mpg: "32 City / 42 Highway",
		},
		{
			_id: "featured-car-ford-explorer-2019",
			name: "2019 Ford Explorer XLT",
			description:
				"Spacious SUV with 3-row seating perfect for families. Equipped with advanced safety features, entertainment system, and plenty of cargo space. One owner vehicle with excellent maintenance records.",
			price: 9000,
			image:
				"https://static0.carbuzzimages.com/wordpress/wp-content/uploads/gallery-images/original/472000/100/472189.jpg",
			year: 2019,
			mileage: "52,000",
			category: "suv",
			engine: "3.5L V6",
			seats: "7",
			transmission: "10-Speed Automatic",
			fuelType: "Gasoline",
			mpg: "20 City / 28 Highway",
		},
		{
			_id: "featured-car-toyota-camry-2021",
			name: "2021 Toyota Camry LE",
			description:
				"Low mileage sedan with excellent fuel economy and Toyota's renowned reliability. Pristine interior and exterior condition with advanced safety features and modern infotainment system.",
			price: 12000,
			image:
				"https://hips.hearstapps.com/hmg-prod/images/2021-toyota-camry-hybrid-xle-mmp-1-1603215410.png",
			year: 2021,
			mileage: "28,000",
			category: "sedan",
			engine: "2.5L 4-Cylinder",
			seats: "5",
			transmission: "8-Speed Automatic",
			fuelType: "Gasoline",
			mpg: "28 City / 39 Highway",
		},
	];

	const handleViewInventory = () => {
		navigate("/inventory");
	};

	return (
		<section className="py-20 px-4 sm:px-6 lg:px-8">
			<div className="max-w-7xl mx-auto">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
					className="text-center mb-16"
				>
					<h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
						Hottest <span className="text-red-500">Rides</span> on the Block
					</h2>
					<p className="text-xl text-gray-300 max-w-3xl mx-auto">
						Only the realest, handpicked whips — top-tier value, no BS. Roll through the full lineup to see what else we got cookin’.
					</p>
				</motion.div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{featuredCars.map((car, index) => (
						<motion.div
							key={car._id}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: index * 0.2 }}
							viewport={{ once: true }}
							className="bg-gray-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
							onClick={handleViewInventory}
						>
							<div className="relative h-60 overflow-hidden">
								<img
									className="object-cover w-full h-full"
									src={car.image}
									alt={car.name}
								/>
								<div className="absolute inset-0 bg-black bg-opacity-20" />

								{/* Featured badge */}
								<div className="absolute top-3 left-3">
									<span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
										Featured
									</span>
								</div>

								{/* Hover overlay */}
								<div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
									<span className="text-white text-lg font-semibold">
										Click to View Inventory
									</span>
								</div>
							</div>

							<div className="p-6">
								<h3 className="text-xl font-bold text-white mb-2 hover:text-red-400 transition-colors">
									{car.name}
								</h3>

								{/* Car details */}
								<div className="flex items-center space-x-4 mb-4 text-gray-300">
									<div className="flex items-center space-x-1">
										<Calendar size={16} />
										<span className="text-sm">{car.year}</span>
									</div>
									<div className="flex items-center space-x-1">
										<Gauge size={16} />
										<span className="text-sm">{car.mileage} miles</span>
									</div>
								</div>

								<p className="text-gray-400 text-sm mb-4 line-clamp-3">
									{car.description}
								</p>

								<div className="flex items-center justify-between mb-4">
									<div>
										<p className="text-2xl font-bold text-red-500">
											${car.price.toLocaleString()}
										</p>
										<p className="text-sm text-gray-400">Starting from</p>
									</div>
								</div>

								<button
									onClick={(e) => {
										e.stopPropagation();
										handleViewInventory();
									}}
									className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2"
								>
									<span>View in Inventory</span>
									<ArrowRight size={18} />
								</button>
							</div>
						</motion.div>
					))}
				</div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.8 }}
					viewport={{ once: true }}
					className="text-center mt-12"
				>
					<Link
						to="/inventory"
						className="inline-flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold transition duration-300 transform hover:scale-105"
					>
						<span>Tap in to see the whips</span>
						<ArrowRight size={20} />
					</Link>
				</motion.div>
			</div>
		</section>
	);
};

export default FeaturedCars;
