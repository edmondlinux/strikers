
import { motion } from "framer-motion";
import { Phone, MessageCircle, MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";


const CallToAction = () => {
	return (
		<section className='py-20 px-4 sm:px-6 lg:px-8'>
			<div className='max-w-7xl mx-auto'>
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
					className='bg-gradient-to-r from-red-600 to-red-800 rounded-3xl p-12 text-center relative overflow-hidden'
				>
					<div className='absolute inset-0 bg-black/20'></div>
					<div className='relative z-10'>
						<h2 className='text-4xl lg:text-5xl font-bold text-white mb-6'>
							Ready to Drive Home Today?
						</h2>
						<p className='text-xl text-red-100 mb-8 max-w-3xl mx-auto'>
							Don't wait! Our inventory moves fast. Contact us now to secure your vehicle 
							with flexible financing options that work for your budget.
						</p>

						<div className='flex flex-col sm:flex-row gap-4 justify-center mb-12'>
							<Link
								to="/inventory"
								className='bg-white text-red-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold
								flex items-center justify-center space-x-2 transition duration-300 transform hover:scale-105'
							>
								<span>Here's what we've got</span>
								<ArrowRight size={20} />
							</Link>
							
						</div>

						<div className='grid grid-cols-1 md:grid-cols-3 gap-8 text-white'>
							<Link to="https://t.me/yourz_bans"> <div className='flex flex-col items-center'>
							<MessageCircle className='mb-4' size={32} />
								
								<h3 className='font-semibold mb-2'>Telegram</h3>
							
								<p className='text-red-100'>@yourz_bans</p> 
							</div>
							</Link>
							<div className='flex flex-col items-center'>
							
							</div>
							<div className='flex flex-col items-center'>
								<MapPin className='mb-4' size={32} />
								<h3 className='font-semibold mb-2'>Visit Our Lot</h3>
								<p className='text-red-100'>Florida</p>
							</div>
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	);
};

export default CallToAction;
