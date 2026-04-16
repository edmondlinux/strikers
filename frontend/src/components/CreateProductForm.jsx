
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Upload, Loader, X } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";
import { useCategoryStore } from "../stores/useCategoryStore";

const CreateProductForm = () => {
	const [newProduct, setNewProduct] = useState({
		name: "",
		description: "",
		price: "",
		category: "",
		images: [],
		year: "",
		mileage: "",
		engine: "",
		seats: "",
		transmission: "",
		fuelType: "",
		condition: "",
		brand: "",
		model: "",
	});

	const { createProduct, loading } = useProductStore();
	const { categories, fetchAllCategories } = useCategoryStore();

	useEffect(() => {
		fetchAllCategories();
	}, [fetchAllCategories]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await createProduct(newProduct);
			setNewProduct({ 
				name: "", 
				description: "", 
				price: "", 
				category: "", 
				images: [],
				year: "",
				mileage: "",
				engine: "",
				seats: "",
				transmission: "",
				fuelType: "",
				condition: "",
				brand: "",
				model: "",
			});
		} catch {
			console.log("error creating a product");
		}
	};

	const handleImageChange = (e) => {
		const files = Array.from(e.target.files);
		if (files.length > 0) {
			files.forEach(file => {
				const reader = new FileReader();
				reader.onloadend = () => {
					setNewProduct(prev => ({ 
						...prev, 
						images: [...prev.images, reader.result] 
					}));
				};
				reader.readAsDataURL(file);
			});
		}
	};

	const removeImage = (index) => {
		setNewProduct(prev => ({
			...prev,
			images: prev.images.filter((_, i) => i !== index)
		}));
	};

	// Check if the selected category is vehicle-related (cars, motorcycles, SUV, sedans, etc.)
	const isVehicleCategory = newProduct.category && (
		newProduct.category.toLowerCase().includes("car") ||
		newProduct.category.toLowerCase().includes("motorcycle") ||
		newProduct.category.toLowerCase().includes("suv") ||
		newProduct.category.toLowerCase().includes("sedan") ||
		newProduct.category.toLowerCase().includes("truck") ||
		newProduct.category.toLowerCase().includes("vehicle") ||
		categories.some(cat => 
			cat.name.toLowerCase() === newProduct.category.toLowerCase() && 
			(cat.name.toLowerCase().includes("car") || 
			 cat.name.toLowerCase().includes("motorcycle") ||
			 cat.name.toLowerCase().includes("suv") ||
			 cat.name.toLowerCase().includes("sedan") ||
			 cat.name.toLowerCase().includes("truck") ||
			 cat.name.toLowerCase().includes("vehicle"))
		)
	);

	return (
		<motion.div
			className='bg-gray-800 shadow-lg rounded-lg p-8 mb-8 max-w-4xl mx-auto'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8 }}
		>
			<h2 className='text-2xl font-semibold mb-6 text-emerald-300'>Create New Product</h2>

			<form onSubmit={handleSubmit} className='space-y-6'>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div>
						<label htmlFor='name' className='block text-sm font-medium text-gray-300'>
							Product Name
						</label>
						<input
							type='text'
							id='name'
							name='name'
							value={newProduct.name}
							onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
							className='mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2
							 px-3 text-white focus:outline-none focus:ring-2
							focus:ring-emerald-500 focus:border-emerald-500'
							required
						/>
					</div>

					<div>
						<label htmlFor='category' className='block text-sm font-medium text-gray-300'>
							Category
						</label>
						<select
							id='category'
							name='category'
							value={newProduct.category}
							onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
							className='mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md
							 shadow-sm py-2 px-3 text-white focus:outline-none 
							 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
							required
						>
							<option value=''>Select a category</option>
							{categories.map((category) => (
								<option key={category._id} value={category.name}>
									{category.name}
								</option>
							))}
						</select>
					</div>
				</div>

				<div>
					<label htmlFor='description' className='block text-sm font-medium text-gray-300'>
						Description
					</label>
					<textarea
						id='description'
						name='description'
						value={newProduct.description}
						onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
						rows='3'
						className='mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm
						 py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 
						 focus:border-emerald-500'
						required
					/>
				</div>

				<div>
					<label htmlFor='price' className='block text-sm font-medium text-gray-300'>
						Price
					</label>
					<input
						type='number'
						id='price'
						name='price'
						value={newProduct.price}
						onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
						step='0.01'
						className='mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm 
						py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500
						 focus:border-emerald-500'
						required
					/>
				</div>

				{isVehicleCategory && (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						<div>
							<label htmlFor='brand' className='block text-sm font-medium text-gray-300'>
								Brand
							</label>
							<input
								type='text'
								id='brand'
								value={newProduct.brand}
								onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
								className='mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
							/>
						</div>

						<div>
							<label htmlFor='model' className='block text-sm font-medium text-gray-300'>
								Model
							</label>
							<input
								type='text'
								id='model'
								value={newProduct.model}
								onChange={(e) => setNewProduct({ ...newProduct, model: e.target.value })}
								className='mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
							/>
						</div>

						<div>
							<label htmlFor='year' className='block text-sm font-medium text-gray-300'>
								Year
							</label>
							<input
								type='number'
								id='year'
								value={newProduct.year}
								onChange={(e) => setNewProduct({ ...newProduct, year: e.target.value })}
								className='mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
							/>
						</div>

						<div>
							<label htmlFor='mileage' className='block text-sm font-medium text-gray-300'>
								Mileage
							</label>
							<input
								type='text'
								id='mileage'
								placeholder="e.g., 15,000 miles"
								value={newProduct.mileage}
								onChange={(e) => setNewProduct({ ...newProduct, mileage: e.target.value })}
								className='mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
							/>
						</div>

						<div>
							<label htmlFor='engine' className='block text-sm font-medium text-gray-300'>
								Engine
							</label>
							<input
								type='text'
								id='engine'
								placeholder="e.g., V6, V8, 4-cylinder"
								value={newProduct.engine}
								onChange={(e) => setNewProduct({ ...newProduct, engine: e.target.value })}
								className='mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
							/>
						</div>

						<div>
							<label htmlFor='seats' className='block text-sm font-medium text-gray-300'>
								Seats
							</label>
							<input
								type='number'
								id='seats'
								value={newProduct.seats}
								onChange={(e) => setNewProduct({ ...newProduct, seats: e.target.value })}
								className='mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
							/>
						</div>

						<div>
							<label htmlFor='transmission' className='block text-sm font-medium text-gray-300'>
								Transmission
							</label>
							<select
								id='transmission'
								value={newProduct.transmission}
								onChange={(e) => setNewProduct({ ...newProduct, transmission: e.target.value })}
								className='mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
							>
								<option value=''>Select transmission</option>
								<option value='Automatic'>Automatic</option>
								<option value='Manual'>Manual</option>
								<option value='CVT'>CVT</option>
							</select>
						</div>

						<div>
							<label htmlFor='fuelType' className='block text-sm font-medium text-gray-300'>
								Fuel Type
							</label>
							<select
								id='fuelType'
								value={newProduct.fuelType}
								onChange={(e) => setNewProduct({ ...newProduct, fuelType: e.target.value })}
								className='mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
							>
								<option value=''>Select fuel type</option>
								<option value='Gasoline'>Gasoline</option>
								<option value='Diesel'>Diesel</option>
								<option value='Electric'>Electric</option>
								<option value='Hybrid'>Hybrid</option>
							</select>
						</div>

						<div>
							<label htmlFor='condition' className='block text-sm font-medium text-gray-300'>
								Condition
							</label>
							<select
								id='condition'
								value={newProduct.condition}
								onChange={(e) => setNewProduct({ ...newProduct, condition: e.target.value })}
								className='mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
							>
								<option value=''>Select condition</option>
								<option value='New'>New</option>
								<option value='Like New'>Like New</option>
								<option value='Excellent'>Excellent</option>
								<option value='Good'>Good</option>
								<option value='Fair'>Fair</option>
							</select>
						</div>
					</div>
				)}

				<div className='mt-1 flex flex-col space-y-3'>
					<input 
						type='file' 
						id='images' 
						className='sr-only' 
						accept='image/*' 
						multiple
						onChange={handleImageChange} 
					/>
					<label
						htmlFor='images'
						className='cursor-pointer bg-gray-700 py-2 px-3 border border-gray-600 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500'
					>
						<Upload className='h-5 w-5 inline-block mr-2' />
						Upload Images (Multiple)
					</label>
					
					{newProduct.images.length > 0 && (
						<div className='space-y-4'>
							<div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
								{newProduct.images.map((image, index) => (
									<div key={index} className='relative'>
										<img 
											src={image} 
											alt={`Preview ${index + 1}`} 
											className='w-full h-24 object-cover rounded-md border-2 border-gray-600' 
										/>
										<button
											type="button"
											onClick={() => removeImage(index)}
											className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 shadow-lg'
										>
											<X className='h-4 w-4' />
										</button>
										{index === 0 && (
											<div className='absolute bottom-1 left-1 bg-red-500 text-white text-xs px-2 py-1 rounded'>
												Main
											</div>
										)}
									</div>
								))}
							</div>
							<div className='text-sm text-gray-400'>
								{newProduct.images.length} image(s) selected. First image will be the main display image.
							</div>
						</div>
					)}
				</div>

				<button
					type='submit'
					className='w-full flex justify-center py-3 px-4 border border-transparent rounded-md 
					shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 
					focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50'
					disabled={loading}
				>
					{loading ? (
						<>
							<Loader className='mr-2 h-5 w-5 animate-spin' aria-hidden='true' />
							Loading...
						</>
					) : (
						<>
							<PlusCircle className='mr-2 h-5 w-5' />
							Create Product
						</>
					)}
				</button>
			</form>
		</motion.div>
	);
};
export default CreateProductForm;
