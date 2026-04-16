
import HeroSection from "../components/HeroSection";
import CarCategories from "../components/CarCategories";
import FeaturedCars from "../components/FeaturedCars";
import Reviews from "../components/Reviews";
import Testimonials from "../components/Testimonials";
import CallToAction from "../components/CallToAction";

const HomePage = () => {
	return (
		<div className='relative min-h-screen text-white overflow-hidden bg-gray-900'>
			{/* Background gradient */}
			<div className='absolute inset-0 overflow-hidden'>
				<div className='absolute inset-0'>
					<div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(239,68,68,0.3)_0%,rgba(153,27,27,0.2)_45%,rgba(0,0,0,0.1)_100%)]' />
				</div>
			</div>

			<div className='relative z-10'>
				<HeroSection />
				<CarCategories />
				<FeaturedCars />
				<Reviews />
				<Testimonials />
				<CallToAction />
			</div>
		</div>
	);
};

export default HomePage;
