
import { motion } from "framer-motion";

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
	return (
		<motion.div
			initial={{ opacity: 0, x: -20 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ duration: 0.6 }}
			className="bg-gray-800 rounded-lg p-6"
		>
			<h3 className="text-lg font-semibold text-white mb-4">Categories</h3>
			<div className="space-y-2">
				{categories.map((category) => (
					<button
						key={category}
						onClick={() => onCategoryChange(category)}
						className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
							selectedCategory === category
								? "bg-red-600 text-white"
								: "text-gray-300 hover:bg-gray-700 hover:text-white"
						}`}
					>
						{category === "all" ? "All Categories" : category.charAt(0).toUpperCase() + category.slice(1)}
					</button>
				))}
			</div>
		</motion.div>
	);
};

export default CategoryFilter;
