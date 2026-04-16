
import { motion } from "framer-motion";
import { Shield, DollarSign, Clock, Award, Users, Wrench } from "lucide-react";

const features = [
	{
		icon: Shield,
		title: "No Title Required",
		description: "We specialize in helping customers with credit challenges get the vehicle they need."
	},
	{
		icon: DollarSign,
		title: "Best Prices",
		description: "Competitive pricing on all vehicles with transparent, no-hidden-fee policies."
	},
	{
		icon: Clock,
		title: "Quick Approval",
		description: "Get approved in minutes with our streamlined financing process."
	},
	{
		icon: Award,
		title: "Quality Assured",
		description: "Every vehicle undergoes thorough inspection before hitting our lot."
	},
	{
		icon: Users,
		title: "Expert Team",
		description: "Knowledgeable staff ready to help you find your perfect vehicle."
	},
	{
		icon: Wrench,
		title: "Service Support",
		description: "Extended warranty options and trusted service partnerships available."
	}
];

const WhyChooseUs = () => {
	return (
		<section className='py-20 px-4 sm:px-6 lg:px-8'>
			<div className='max-w-7xl mx-auto'>
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
					className='text-center mb-16'
				>
					<h2 className='text-4xl lg:text-5xl font-bold text-white mb-4'>
						Why Choose <span className='text-red-500'>Strikers</span>?
					</h2>
					<p className='text-xl text-gray-300 max-w-3xl mx-auto'>
						We're not just another car lot. We're your partners in getting you back on the road.
					</p>
				</motion.div>

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
					{features.map((feature, index) => (
						<motion.div
							key={feature.title}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: index * 0.1 }}
							viewport={{ once: true }}
							className='bg-gray-800 rounded-2xl p-8 border border-gray-700 hover:border-red-500 transition-all duration-300 group'
						>
							<div className='mb-6'>
								<div className='w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center group-hover:bg-red-500 transition-colors duration-300'>
									<feature.icon className='text-white' size={32} />
								</div>
							</div>
							<h3 className='text-2xl font-bold text-white mb-4'>{feature.title}</h3>
							<p className='text-gray-300 leading-relaxed'>{feature.description}</p>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};

export default WhyChooseUs;
