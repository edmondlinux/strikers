
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const reviews = [
	{
		name: "StreetKing92",
		location: "Brooklyn, NY",
		rating: 5,
		text: "Yo, these cats at STRIKERS hooked me up PROPER. Credit was more busted than my old whip, but they made it happen. Got my ride same day, no cap!",
		vehicle: "2020 Dodge Charger",
		image: "https://api.dicebear.com/7.x/avataaars/svg?seed=StreetKing92"
	},
	{
		name: "RideOrDie23",
		location: "Chicago, IL",
		rating: 5,
		text: "Real talk, I was skeptical at first but these dudes came through CLUTCH. No BS, no games, just straight business. My whip is clean as hell!",
		vehicle: "2019 BMW 3 Series",
		image: "https://api.dicebear.com/7.x/avataaars/svg?seed=RideOrDie23"
	},
	{
		name: "MamaWheels",
		location: "Miami, FL",
		rating: 5,
		text: "Listen mijo, I needed a car FAST and these boys delivered. No paperwork headaches, just results. My familia is rolling in style now!",
		vehicle: "2021 Honda Accord",
		image: "https://api.dicebear.com/7.x/avataaars/svg?seed=MamaWheels"
	},
	{
		name: "CruiseControl88",
		location: "Detroit, MI",
		rating: 5,
		text: "Bruh, I was down BAD with my credit score but STRIKERS didn't even trip. Got approved in like 20 minutes, now I'm cruising like a BOSS!",
		vehicle: "2018 Mustang GT",
		image: "https://api.dicebear.com/7.x/avataaars/svg?seed=CruiseControl88"
	},
	{
		name: "LuxuryLady",
		location: "Atlanta, GA",
		rating: 5,
		text: "Honey, these men know how to HANDLE business! I walked in broke, walked out with KEYS. Now I'm pulling up looking like money!",
		vehicle: "2020 Lexus ES",
		image: "https://api.dicebear.com/7.x/avataaars/svg?seed=LuxuryLady"
	},
	{
		name: "BigWheels101",
		location: "Las Vegas, NV",
		rating: 5,
		text: "These cats are LEGIT. I've dealt with a lot of dealers and most are straight clowns. But STRIKERS? They're about that ACTION, baby!",
		vehicle: "2019 Cadillac Escalade",
		image: "https://api.dicebear.com/7.x/avataaars/svg?seed=BigWheels101"
	},
	{
		name: "RollingDeep",
		location: "New Orleans, LA",
		rating: 5,
		text: "Listen up, I been in the game a LONG time and these boys know how to move. No title? No problem! They got the JUICE to make it happen!",
		vehicle: "2021 Mercedes C-Class",
		image: "https://api.dicebear.com/7.x/avataaars/svg?seed=RollingDeep"
	},
	{
		name: "WheelzNDeals",
		location: "Philadelphia, PA",
		rating: 5,
		text: "Yo, I don't write reviews but these dudes EARNED it. Professional, fast, and they don't judge. Got my whole crew riding clean now!",
		vehicle: "2020 Audi A4",
		image: "https://api.dicebear.com/7.x/avataaars/svg?seed=WheelzNDeals"
	}
];

const Reviews = () => {
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
						Real <span className='text-red-500'>Street</span> Reviews
					</h2>
					<p className='text-xl text-gray-300 max-w-3xl mx-auto'>
						Straight from the streets — our customers keep it 💯 about their experience with STRIKERS.
					</p>
				</motion.div>

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
					{reviews.map((review, index) => (
						<motion.div
							key={review.name}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: index * 0.1 }}
							viewport={{ once: true }}
							className='bg-gray-800 rounded-2xl p-6 border border-gray-700 relative overflow-hidden hover:border-red-500/50 transition-all duration-300'
						>
							<div className='absolute top-4 right-4 opacity-20'>
								<Quote size={48} className='text-red-500' />
							</div>
							
							<div className='relative z-10'>
								<div className='flex items-center mb-4'>
									{[...Array(review.rating)].map((_, i) => (
										<Star key={i} className='text-yellow-400 fill-current' size={18} />
									))}
								</div>
								
								<p className='text-gray-300 text-base leading-relaxed mb-6'>
									"{review.text}"
								</p>
								
								<div className='flex items-center'>
									<img
										src={review.image}
										alt={review.name}
										className='w-12 h-12 rounded-full object-cover mr-4 border-2 border-red-500/30'
									/>
									<div>
										<h4 className='text-white font-semibold'>{review.name}</h4>
										<p className='text-gray-400 text-sm'>{review.location}</p>
										<p className='text-red-400 text-sm font-medium'>{review.vehicle}</p>
									</div>
								</div>
							</div>
						</motion.div>
					))}
				</div>

				{/* Street Credibility Badge */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.5 }}
					viewport={{ once: true }}
					className='mt-16 text-center'
				>
					<div className='bg-gradient-to-r from-red-600 to-red-800 rounded-xl p-8 inline-block'>
						<div className='flex items-center justify-center space-x-4'>
							<div className='text-center'>
								<p className='text-3xl font-bold text-white'>4.9/5</p>
								<p className='text-red-100 text-sm'>Street Rating</p>
							</div>
							<div className='w-px h-12 bg-red-300/50'></div>
							<div className='text-center'>
								<p className='text-3xl font-bold text-white'>1000+</p>
								<p className='text-red-100 text-sm'>Happy Customers</p>
							</div>
							<div className='w-px h-12 bg-red-300/50'></div>
							<div className='text-center'>
								<p className='text-3xl font-bold text-white'>💯</p>
								<p className='text-red-100 text-sm'>Real Reviews</p>
							</div>
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	);
};

export default Reviews;
