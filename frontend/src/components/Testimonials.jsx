
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
	{
		name: "TexasRider89",
		location: "Austin, TX",
		rating: 5,
		text: "Strikers helped me get a reliable car when my credit wasn't perfect. The team was understanding and worked with my budget. Highly recommend!",
		vehicle: "2019 Honda Accord",
		image: "https://api.dicebear.com/7.x/avataaars/svg?seed=TexasRider89"
	},
	{
		name: "TruckMaster",
		location: "Dallas, TX",
		rating: 5,
		text: "Fast approval process and transparent pricing. Got my truck the same day I applied. No hidden fees, exactly as promised.",
		vehicle: "2020 Ford F-150",
		image: "https://api.dicebear.com/7.x/avataaars/svg?seed=TruckMaster"
	},
	{
		name: "SafeDriver_TX",
		location: "Houston, TX",
		rating: 5,
		text: "The staff was incredibly helpful and patient. They explained all my options clearly and made sure I understood everything before signing.",
		vehicle: "2018 Toyota Camry",
		image: "https://api.dicebear.com/7.x/avataaars/svg?seed=SafeDriver_TX"
	},
	{
		name: "QualityFirst",
		location: "San Antonio, TX",
		rating: 5,
		text: "Quality vehicles at fair prices. My car has been running perfectly for over a year now. Great experience from start to finish.",
		vehicle: "2019 Nissan Altima",
		image: "https://api.dicebear.com/7.x/avataaars/svg?seed=QualityFirst"
	}
];

const Testimonials = () => {
	return (
		<section className='py-20 px-4 sm:px-6 lg:px-8 bg-gray-800/30'>
			<div className='max-w-7xl mx-auto'>
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
					className='text-center mb-16'
				>
					<h2 className='text-4xl lg:text-5xl font-bold text-white mb-4'>
						What Our <span className='text-red-500'>Customers</span> Say
					</h2>
					<p className='text-xl text-gray-300 max-w-3xl mx-auto'>
						Real stories from real customers who found their perfect vehicle with us.
					</p>
				</motion.div>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
					{testimonials.map((testimonial, index) => (
						<motion.div
							key={testimonial.name}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: index * 0.1 }}
							viewport={{ once: true }}
							className='bg-gray-800 rounded-2xl p-8 border border-gray-700 relative overflow-hidden'
						>
							<div className='absolute top-4 right-4 opacity-20'>
								<Quote size={64} className='text-red-500' />
							</div>
							
							<div className='relative z-10'>
								<div className='flex items-center mb-4'>
									{[...Array(testimonial.rating)].map((_, i) => (
										<Star key={i} className='text-yellow-400 fill-current' size={20} />
									))}
								</div>
								
								<p className='text-gray-300 text-lg leading-relaxed mb-6'>
									"{testimonial.text}"
								</p>
								
								<div className='flex items-center'>
									<img
										src={testimonial.image}
										alt={testimonial.name}
										className='w-12 h-12 rounded-full object-cover mr-4'
									/>
									<div>
										<h4 className='text-white font-semibold'>{testimonial.name}</h4>
										<p className='text-gray-400 text-sm'>{testimonial.location}</p>
										<p className='text-red-400 text-sm font-medium'>{testimonial.vehicle}</p>
									</div>
								</div>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Testimonials;
