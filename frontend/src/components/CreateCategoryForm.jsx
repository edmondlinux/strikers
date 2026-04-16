
import { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Upload, Loader } from "lucide-react";
import { useCategoryStore } from "../stores/useCategoryStore";

const CreateCategoryForm = () => {
	const [newCategory, setNewCategory] = useState({
		name: "",
		description: "",
		href: "",
		image: "",
	});

	const { createCategory, loading } = useCategoryStore();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await createCategory(newCategory);
			setNewCategory({
				name: "",
				description: "",
				href: "",
				image: "",
			});
		} catch {
			console.log("error creating category");
		}
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();

			reader.onloadend = () => {
				setNewCategory({ ...newCategory, image: reader.result });
			};

			reader.readAsDataURL(file);
		}
	};

	return (
		<motion.div
			className='bg-gray-800 shadow-xl rounded-lg p-8 mb-8 max-w-xl mx-auto'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8 }}
		>
			<h2 className='text-2xl font-bold mb-6 text-red-400 flex items-center'>
				<PlusCircle className='mr-2' />
				Create New Category
			</h2>

			<form onSubmit={handleSubmit} className='space-y-4'>
				<div>
					<label htmlFor='name' className='block text-sm font-medium text-gray-300'>
						Category Name
					</label>
					<input
						type='text'
						id='name'
						name='name'
						value={newCategory.name}
						onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
						className='mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white 
						focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500'
						required
					/>
				</div>

				<div>
					<label htmlFor='description' className='block text-sm font-medium text-gray-300'>
						Description
					</label>
					<textarea
						id='description'
						name='description'
						value={newCategory.description}
						onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
						rows={3}
						className='mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white 
						focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500'
						required
					/>
				</div>

				<div>
					<label htmlFor='href' className='block text-sm font-medium text-gray-300'>
						URL Path (e.g., /sedans)
					</label>
					<input
						type='text'
						id='href'
						name='href'
						value={newCategory.href}
						onChange={(e) => setNewCategory({ ...newCategory, href: e.target.value })}
						className='mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white 
						focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500'
						placeholder='/category-name'
						required
					/>
				</div>

				<div className='mt-4'>
					<label htmlFor='image' className='block text-sm font-medium text-gray-300 mb-2'>
						Category Image
					</label>
					<div className='mt-1 flex items-center'>
						<input
							type='file'
							id='image'
							className='sr-only'
							accept='image/*'
							onChange={handleImageChange}
						/>
						<label
							htmlFor='image'
							className='cursor-pointer bg-gray-700 py-2 px-3 border border-gray-600 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
						>
							<Upload className='h-5 w-5 inline-block mr-2' />
							Upload Image
						</label>
					</div>
					{newCategory.image && (
						<div className='mt-4'>
							<img
								src={newCategory.image}
								alt='Category preview'
								className='w-20 h-20 object-cover rounded-lg'
							/>
						</div>
					)}
				</div>

				<button
					type='submit'
					className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50'
					disabled={loading}
				>
					{loading ? (
						<>
							<Loader className='mr-2 h-5 w-5 animate-spin' aria-hidden='true' />
							Loading...
						</>
					) : (
						<>
							<PlusCircle className='mr-2 h-5 w-5' aria-hidden='true' />
							Create Category
						</>
					)}
				</button>
			</form>
		</motion.div>
	);
};

export default CreateCategoryForm;
