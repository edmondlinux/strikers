
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Grid, List } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";
import { useCategoryStore } from "../stores/useCategoryStore";
import ProductCard from "../components/ProductCard";
import CategoryFilter from "../components/CategoryFilter";
import ProductGrid from "../components/ProductGrid";

const InventoryPage = () => {
	const { fetchAllProducts, products, loading } = useProductStore();
	const { categories, fetchAllCategories, loading: categoriesLoading } = useCategoryStore();
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("all");
	const [sortBy, setSortBy] = useState("name");
	const [viewMode, setViewMode] = useState("grid");
	const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 });

	useEffect(() => {
		fetchAllProducts();
		fetchAllCategories();
	}, [fetchAllProducts, fetchAllCategories]);

	// Filter and sort products
	const filteredProducts = products
		?.filter((product) => {
			const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
								product.description?.toLowerCase().includes(searchTerm.toLowerCase());
			const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
			const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max;
			return matchesSearch && matchesCategory && matchesPrice;
		})
		?.sort((a, b) => {
			switch (sortBy) {
				case "price-low":
					return a.price - b.price;
				case "price-high":
					return b.price - a.price;
				case "name":
					return a.name.localeCompare(b.name);
				default:
					return 0;
			}
		});

	// Get categories from database
	const categoryOptions = ["all", ...categories.map(category => category.name)];

	if (loading || categoriesLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500"></div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-900 pt-20">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{/* Header */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="text-center mb-12"
				>
					<h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
						Our <span className="text-red-500">Inventory</span>
					</h1>
					<p className="text-xl text-gray-300 max-w-3xl mx-auto">
						Browse our complete collection of quality vehicles. Find your perfect match today.
					</p>
				</motion.div>

				{/* Search and Filters */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.2 }}
					className="bg-gray-800 rounded-lg p-6 mb-8"
				>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
						{/* Search */}
						<div className="relative">
							<Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
							<input
								type="text"
								placeholder="Search vehicles..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
							/>
						</div>

						{/* Category Filter */}
						<select
							value={selectedCategory}
							onChange={(e) => setSelectedCategory(e.target.value)}
							className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
						>
							{categoryOptions.map((category) => (
								<option key={category} value={category}>
									{category === "all" ? "All Categories" : category.charAt(0).toUpperCase() + category.slice(1)}
								</option>
							))}
						</select>

						{/* Sort */}
						<select
							value={sortBy}
							onChange={(e) => setSortBy(e.target.value)}
							className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
						>
							<option value="name">Sort by Name</option>
							<option value="price-low">Price: Low to High</option>
							<option value="price-high">Price: High to Low</option>
						</select>

						{/* View Mode */}
						<div className="flex items-center space-x-2">
							<button
								onClick={() => setViewMode("grid")}
								className={`p-2 rounded-lg transition-colors ${
									viewMode === "grid" ? "bg-red-600 text-white" : "bg-gray-700 text-gray-400 hover:text-white"
								}`}
							>
								<Grid size={20} />
							</button>
							<button
								onClick={() => setViewMode("list")}
								className={`p-2 rounded-lg transition-colors ${
									viewMode === "list" ? "bg-red-600 text-white" : "bg-gray-700 text-gray-400 hover:text-white"
								}`}
							>
								<List size={20} />
							</button>
						</div>
					</div>

					{/* Price Range */}
					<div className="flex items-center space-x-4">
						<span className="text-gray-300 text-sm">Price Range:</span>
						<input
							type="number"
							placeholder="Min"
							value={priceRange.min}
							onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
							className="w-24 px-3 py-1 bg-gray-700 border border-gray-600 rounded text-white text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
						/>
						<span className="text-gray-400">to</span>
						<input
							type="number"
							placeholder="Max"
							value={priceRange.max}
							onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
							className="w-24 px-3 py-1 bg-gray-700 border border-gray-600 rounded text-white text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
						/>
						<span className="text-gray-300 text-sm ml-4">
							Showing {filteredProducts?.length || 0} of {products?.length || 0} vehicles
						</span>
					</div>
				</motion.div>

				{/* Products Grid/List */}
				<ProductGrid products={filteredProducts} viewMode={viewMode} />
			</div>
		</div>
	);
};

export default InventoryPage;
