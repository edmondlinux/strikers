import { motion } from "framer-motion";
import { useCategoryStore } from "../stores/useCategoryStore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CarCategories = () => {
	const { categories, fetchAllCategories } = useCategoryStore();
	const [showAll, setShowAll] = useState(false);
	const [displayedCategories, setDisplayedCategories] = useState([]);

	const INITIAL_DISPLAY_COUNT = 5;

	useEffect(() => {
		fetchAllCategories();
	}, [fetchAllCategories]);

	useEffect(() => {
		if (categories.length > 0) {
			const categoriesToShow = showAll 
				? categories 
				: categories.slice(0, INITIAL_DISPLAY_COUNT);
			setDisplayedCategories(categoriesToShow);
		}
	}, [categories, showAll]);

	const handleToggleView = () => {
		setShowAll(!showAll);
	};

	const shouldShowViewMoreButton = categories.length > INITIAL_DISPLAY_COUNT;

	return (
		<div className='py-16'>
			<div className='container mx-auto px-4'>
				<motion.h2
					className='text-4xl font-bold text-center mb-12 text-white'
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
				>
					Browse by Category
				</motion.h2>
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
					{displayedCategories.map((category, index) => (
						<motion.div
							key={category._id}
							className='relative group cursor-pointer'
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							<Link to={`/category/${category.name}`}>
								<div className='relative overflow-hidden rounded-lg bg-gray-800 shadow-lg'>
									{category.image ? (
										<img
											src={category.image}
											alt={category.name}
											className='w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110'
											crossOrigin="anonymous"
											onError={(e) => {
												console.log('Category image failed to load:', category.image);
												e.target.style.display = 'none';
												const fallback = document.createElement('div');
												fallback.className = 'w-full h-48 bg-gray-700 flex items-center justify-center';
												fallback.innerHTML = '<span class="text-gray-400">No Image Available</span>';
												e.target.parentNode.appendChild(fallback);
											}}
										/>
									) : (
										<div className='w-full h-48 bg-gray-700 flex items-center justify-center'>
											<span className='text-gray-400'>No Image Available</span>
										</div>
									)}
									<div className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
										<div className='text-center'>
											<h3 className='text-xl font-bold text-white mb-2'>{category.name}</h3>
											<p className='text-gray-300 text-sm'>{category.description}</p>
										</div>
									</div>
								</div>
							</Link>
						</motion.div>
					))}
				</div>

				{shouldShowViewMoreButton && (
					<motion.div
						className='text-center mt-12'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5, delay: 0.3 }}
					>
						<button
							onClick={handleToggleView}
							className='px-8 py-3 bg-red-600 hover:bg-red-400 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
						>
							{showAll ? (
								<>
									<span>Show Less</span>
									<svg 
										className='inline-block ml-2 w-4 h-4 transform rotate-180' 
										fill='none' 
										stroke='currentColor' 
										viewBox='0 0 24 24'
									>
										<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
									</svg>
								</>
							) : (
								<>
									<span>View More ({categories.length - INITIAL_DISPLAY_COUNT} more)</span>
									<svg 
										className='inline-block ml-2 w-4 h-4' 
										fill='none' 
										stroke='currentColor' 
										viewBox='0 0 24 24'
									>
										<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
									</svg>
								</>
							)}
						</button>
					</motion.div>
				)}
			</div>
		</div>
	);
};

export default CarCategories;